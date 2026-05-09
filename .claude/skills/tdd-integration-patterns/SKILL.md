---
name: tdd-integration-patterns
description: Integration testing patterns for secondary adapters with testcontainers and real infrastructure
---

# Skill: TDD Integration Patterns

## Purpose

Defines patterns for integration tests that validate **secondary adapter implementations** against real infrastructure. Integration tests verify that adapters correctly implement their interfaces (ports) using actual databases, message queues, and external services.

**Key Insight:** Integration tests validate the **adapter layer**, not business logic. Business logic is tested through unit tests in the hexagon.

## Project Infrastructure Override

**This project uses SQLite, not PostgreSQL.** No Docker, no Testcontainers.

```csharp
// Integration test base for this project — SQLite in-memory
public abstract class SqliteTestBase : IDisposable
{
    protected PomodoroDbContext DbContext { get; }

    protected SqliteTestBase()
    {
        var options = new DbContextOptionsBuilder<PomodoroDbContext>()
            .UseSqlite("DataSource=:memory:")
            .Options;
        DbContext = new PomodoroDbContext(options);
        DbContext.Database.EnsureCreated();
    }

    public void Dispose() => DbContext.Dispose();
}
```

- DB path in production: `Path.Combine(Environment.GetFolderPath(SpecialFolder.ApplicationData), "Letstream", "{bc}.db")`
- Integration tests: `DataSource=:memory:` — no file, no cleanup needed
- Assertions: Shouldly (never FluentAssertions)

---

## When to Use Integration Tests

### Primary Targets

| Adapter Type | Examples | Test Focus |
|--------------|----------|------------|
| Repository Adapters | `EfTrainingRepository`, `EfParticipationRepository` | CRUD operations, queries, transactions |
| External Service Adapters | `S3FileStorageService`, `PdfGenerationService` | API integration, error handling |
| File Storage Adapters | `S3FileStorageService` | Upload, download, signed URLs |

### NOT for Integration Tests

- Business logic (use unit tests with fakes)
- Domain invariants (use unit tests through use cases)
- API contracts (use E2E tests)
- Cross-aggregate business rules (use unit tests)

## Testcontainers Setup

### PostgreSQL Container

```csharp
// CinemaTech.IntegrationTest/DatabaseTestBase.cs

public abstract class DatabaseTestBase : IAsyncLifetime
{
    private readonly PostgreSqlContainer _postgres = new PostgreSqlBuilder()
        .WithImage("postgres:16")
        .WithDatabase("test_db")
        .WithUsername("test")
        .WithPassword("test")
        .Build();

    protected AppDbContext DbContext { get; private set; } = null!;

    public async Task InitializeAsync()
    {
        await _postgres.StartAsync();

        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql(_postgres.GetConnectionString())
            .Options;

        DbContext = new AppDbContext(options);
        await DbContext.Database.EnsureCreatedAsync();
    }

    public async Task DisposeAsync()
    {
        await DbContext.DisposeAsync();
        await _postgres.DisposeAsync();
    }
}
```

### Container Lifecycle Strategy

| Scope | When to Use | Example |
|-------|-------------|---------|
| `IAsyncLifetime` | Container startup (expensive) | PostgreSQL containers |
| Constructor / fresh DbContext | Test isolation | Clean state between tests |
| Transaction rollback | Data isolation | Auto-rollback per test |

## [Fact] Structure — Mandatory Given*/When*/Then* Helpers

**Every `[Fact]` body must consist of calls to private helper methods only.** No inline assertions or inline setup in the test body — this applies to all test layers including integration tests.

```csharp
[Fact]
public async Task Should_save_and_retrieve_training_when_valid()
{
    GivenSavedTraining("training-123", "tenant-456", "React Advanced Patterns");
    var retrieved = await WhenFindingById("training-123");
    ThenTrainingMatchesSnapshot(retrieved, new TrainingSnapshot("training-123", "tenant-456", "React Advanced Patterns"));
}
```

- `Given*(…)` — seeds the database state; returns void
- `When*(…)` — calls the adapter method under test; returns the result
- `Then*(result, …)` — contains all Shouldly assertions; returns void
- Constructor / `InitializeAsync` wires infrastructure only — no seeding

When no state needs seeding, the `Given*` call may be omitted. When multiple entities need seeding, prefer a single `GivenMultiple*(…)` helper to keep the body concise.

## Repository Adapter Testing

### Pattern: Interface Compliance Testing

Test that the EF Core adapter correctly implements the repository interface.

```csharp
// CinemaTech.IntegrationTest/EfTrainingRepositoryIntegrationTest.cs

public class EfTrainingRepositoryIntegrationTest : DatabaseTestBase
{
    private ITrainingRepository _repository = null!;

    public new async Task InitializeAsync()
    {
        await base.InitializeAsync();
        _repository = new EfTrainingRepository(DbContext);
    }

    [Fact]
    public async Task Should_save_and_retrieve_training_when_valid()
    {
        GivenSavedTraining("training-123", "tenant-456", "React Advanced Patterns");

        var retrieved = await WhenFindingById("training-123");

        ThenTrainingMatchesSnapshot(retrieved, new TrainingSnapshot("training-123", "tenant-456", "React Advanced Patterns"));
    }

    [Fact]
    public async Task Should_return_null_when_training_not_found()
    {
        var result = await WhenFindingById("non-existent-id");

        ThenNoTrainingWasFound(result);
    }

    [Fact]
    public async Task Should_update_existing_training_when_saved_again()
    {
        GivenSavedTraining("training-123", "tenant-456", "React Advanced Patterns");

        await WhenUpdatingTitle("training-123", "Updated Title");

        ThenTrainingTitleIs("training-123", "Updated Title");
    }

    [Fact]
    public async Task Should_find_training_by_title_and_tenant()
    {
        GivenSavedTraining("training-123", "tenant-456", "TDD Workshop");

        var found = await WhenFindingByTitleAndTenant("TDD Workshop", "tenant-456");

        ThenTrainingMatchesSnapshot(found, new TrainingSnapshot("training-123", "tenant-456", "TDD Workshop"));
    }

    [Fact]
    public async Task Should_not_find_deleted_training()
    {
        GivenSavedDeletedTraining("training-123", "tenant-456", "TDD Workshop");

        var found = await WhenFindingById("training-123");

        ThenNoTrainingWasFound(found);
    }

    private async Task GivenSavedTraining(string id, string tenantId, string title)
    {
        var training = Training.Create(new TrainingId(id), new TenantId(tenantId), title, DateTime.UtcNow, DateTime.UtcNow);
        await _repository.SaveAsync(training);
    }

    private async Task GivenSavedDeletedTraining(string id, string tenantId, string title)
    {
        var training = Training.Create(new TrainingId(id), new TenantId(tenantId), title, true, DateTime.UtcNow, DateTime.UtcNow);
        await _repository.SaveAsync(training);
    }

    private async Task<Training?> WhenFindingById(string id) =>
        await _repository.FindByIdAsync(new TrainingId(id));

    private async Task<Training?> WhenFindingByTitleAndTenant(string title, string tenantId) =>
        await _repository.FindByTitleAndTenantIdAsync(title, new TenantId(tenantId));

    private async Task WhenUpdatingTitle(string id, string newTitle)
    {
        var training = await _repository.FindByIdAsync(new TrainingId(id));
        training!.UpdateTitle(newTitle);
        await _repository.SaveAsync(training);
    }

    private void ThenNoTrainingWasFound(Training? training) =>
        training.ShouldBeNull();

    private void ThenTrainingMatchesSnapshot(Training? training, TrainingSnapshot expected)
    {
        training.ShouldNotBeNull();
        training!.ToSnapshot().ShouldBe(expected);
    }

    private async Task ThenTrainingTitleIs(string id, string expectedTitle)
    {
        var training = await _repository.FindByIdAsync(new TrainingId(id));
        training.ShouldNotBeNull();
        training!.ToSnapshot().Title.ShouldBe(expectedTitle);
    }
}
```

### Key Testing Principles

1. **`[Fact]` body = helper calls only** — no inline logic, no inline assertions
2. **Test interface compliance** — verify all interface methods work correctly
3. **Use real domain objects** — sociable within domain, real infrastructure
4. **Verify snapshot roundtrip** — `Save()` → `FindById()` → compare via `ToSnapshot().ShouldBe(...)`
5. **Test edge cases** — not found, soft delete, tenant isolation
6. **Isolate per test** — clean database between tests (via transaction rollback or manual cleanup)

### Snapshot Roundtrip Pattern

```csharp
[Fact]
public async Task Should_preserve_all_participation_fields_through_persistence()
{
    GivenSavedParticipationWithAllFields("participation-1");

    var retrieved = await WhenFindingById("participation-1");

    ThenAllFieldsArePreserved(retrieved, ExpectedFullParticipationSnapshot());
}

private async Task GivenSavedParticipationWithAllFields(string id)
{
    var participation = Participation.Create(
        new ParticipationId(id),
        new TenantId("tenant-1"),
        new TrainingSessionId("session-1"),
        null, 120000, 10, 20,
        "Senior developer track",
        FundingMode.Company,
        new FundingOrganizationId("org-1"),
        80000, "FILE-001",
        DateTime.UtcNow, DateTime.UtcNow
    );
    await _repository.SaveAsync(participation);
}

private async Task<Participation?> WhenFindingById(string id) =>
    await _repository.FindByIdAsync(new ParticipationId(id));

private void ThenAllFieldsArePreserved(Participation? participation, ParticipationSnapshot expected)
{
    participation.ShouldNotBeNull();
    participation!.ToSnapshot().ShouldBe(expected);
}
```

## File Storage Adapter Testing

### Pattern: S3 with LocalStack

```csharp
// CinemaTech.IntegrationTest/S3FileStorageServiceIntegrationTest.cs

public class S3FileStorageServiceIntegrationTest : IAsyncLifetime
{
    private readonly LocalStackContainer _localstack = new LocalStackBuilder()
        .WithImage("localstack/localstack:latest")
        .Build();

    private IAmazonS3 _s3Client = null!;
    private S3FileStorageService _service = null!;

    public async Task InitializeAsync()
    {
        await _localstack.StartAsync();

        _s3Client = new AmazonS3Client(
            new BasicAWSCredentials("test", "test"),
            new AmazonS3Config
            {
                ServiceURL = _localstack.GetConnectionString(),
                ForcePathStyle = true
            });

        await _s3Client.PutBucketAsync("test-bucket");
        _service = new S3FileStorageService(_s3Client, "test-bucket");
    }

    public async Task DisposeAsync()
    {
        _s3Client.Dispose();
        await _localstack.DisposeAsync();
    }

    [Fact]
    public async Task Should_upload_and_retrieve_file()
    {
        GivenUploadedFile("organizations/org-123/logo.png", "logo-content");

        var retrieved = await WhenDownloading("organizations/org-123/logo.png");

        ThenFileContentIs(retrieved, "logo-content");
    }

    private async Task GivenUploadedFile(string key, string content)
    {
        var fileContent = Encoding.UTF8.GetBytes(content);
        await _service.UploadAsync(key, fileContent, "image/png");
    }

    private async Task<byte[]?> WhenDownloading(string key) =>
        await _service.DownloadAsync(key);

    private void ThenFileContentIs(byte[]? content, string expected)
    {
        content.ShouldNotBeNull();
        Encoding.UTF8.GetString(content!).ShouldBe(expected);
    }
}
```

## Test Organization

```
CinemaTech.IntegrationTest/
├── EfTrainingRepositoryIntegrationTest.cs
├── EfParticipationRepositoryIntegrationTest.cs
├── EfTraineeRepositoryIntegrationTest.cs
└── S3FileStorageServiceIntegrationTest.cs
```

## Performance Guidelines

| Metric | Target | Strategy |
|--------|--------|----------|
| Per-test time | < 100ms | Transaction rollback, no data cleanup |
| Container startup | ~5s once | Shared container via IAsyncLifetime |
| Total suite | < 30s | Parallel with xUnit collections |

### Optimization Techniques

1. **Shared containers** — Start expensive containers once per test class with `IAsyncLifetime`
2. **Transaction rollback** — Automatic cleanup via transaction scope rollback
3. **Parallel execution** — xUnit parallel test execution (default behavior per collection)
4. **Lazy test data** — Create only necessary data per test

## Anti-Patterns

### NO Business Logic in Integration Tests

```csharp
// WRONG - Testing business rules in integration test
[Fact]
public async Task Should_prevent_adding_duplicate_participant_to_session()
{
    // This tests business logic - belongs in unit tests!
}

// RIGHT - Testing adapter persistence behavior
[Fact]
public async Task Should_persist_participation_with_all_pricing_fields()
{
    // Tests that numeric fields correctly map to database columns
    var participation = Participation.Create(
        defaultProps with { UnitPrice = 120000, Discount = 10, Tva = 20 }
    );
    await _repository.SaveAsync(participation);
    var retrieved = await _repository.FindByIdAsync(participation.Id);
    retrieved!.ToSnapshot().UnitPrice.ShouldBe(120000);
}
```

### NO Fake Infrastructure in Integration Tests

```csharp
// WRONG - Using fakes defeats the purpose
[Fact]
public void TestRepository()
{
    var repository = new FakeTrainingRepository();  // Not an integration test!
}

// RIGHT - Real infrastructure
[Fact]
public async Task TestRepository()
{
    // _repository is EfTrainingRepository backed by real PostgreSQL
    await _repository.SaveAsync(training);
}
```

### NO Shared Mutable State

```csharp
// WRONG - Tests affect each other
public class TrainingRepositoryIntegrationTest
{
    private static readonly EfTrainingRepository _repository = ...;  // Shared!
}

// CORRECT - Fresh state per test (via IAsyncLifetime or constructor)
public class TrainingRepositoryIntegrationTest : DatabaseTestBase
{
    private ITrainingRepository _repository = null!;
    // Each test gets a fresh DbContext
}
```

## RED Phase for Integration Tests

### Example

```csharp
[Fact]
public async Task Should_save_and_retrieve_training()
{
    GivenSavedTraining("training-123", "tenant-456", "TDD Workshop");  // Methods don't exist yet
    var retrieved = await WhenFindingById("training-123");
    ThenTrainingMatchesSnapshot(retrieved, new TrainingSnapshot("training-123", "tenant-456", "TDD Workshop"));
}
```

### Scaffold Example

```csharp
// Infrastructure/Persistence/EfTrainingRepository.cs

internal class EfTrainingRepository : ITrainingRepository
{
    private readonly AppDbContext _dbContext;

    public EfTrainingRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task SaveAsync(Training training)
    {
        // Scaffold - behavioral failure
    }

    public async Task<Training?> FindByIdAsync(TrainingId id)
    {
        return null;  // Scaffold - behavioral failure
    }

    // ... other interface methods
}
```

## Related Skills

- **`tdd-workflow-engine`** — TDD Sequence, enforcement rules
- `tdd-testing-patterns` — Test doubles, fixtures, assertions
- `tdd-core-patterns` — Unit testing for hexagon (use fakes there)
- `tdd-e2e-patterns` — E2E testing through HTTP boundary
