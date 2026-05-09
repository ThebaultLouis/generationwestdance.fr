---
name: tdd-e2e-patterns
description: E2E testing patterns for ASP.NET Core with HTTP-boundary black-box testing
---

# Skill: TDD E2E Patterns

## Purpose

Defines End-to-End testing patterns for ASP.NET Core applications, emphasizing **HTTP-boundary testing** and **black-box validation**. E2E tests verify the full architecture traversal from HTTP request to response, without directly accessing domain internals.

**Key Insight:** E2E tests validate the **complete stack through HTTP**, not individual components.

## Core Principle: HTTP Boundary Only

### Golden Rule

```
Tests interact ONLY via HTTP requests/responses.
NO direct import of domain entities, value objects, or aggregates in tests.
Importing port interfaces and fake adapters for test wiring IS allowed.
Repository access in tests only for assertions when using fakes.
```

### Architecture Traversal

```
┌─────────────┐     HTTP      ┌─────────────┐     Call     ┌─────────────┐
│   Test      │ ──────────▶   │  Controller │ ──────────▶  │  Use Case   │
│ (HttpClient)│               │ (ASP.NET)   │              │             │
└─────────────┘               └─────────────┘              └─────────────┘
                                                                  │
                                                                  ▼
                                                           ┌─────────────┐
                                                           │   Domain    │
                                                           │   Models    │
                                                           └─────────────┘
                                                                  │
                                                                  ▼
                                                           ┌─────────────┐
                                                           │  Secondary  │
                                                           │  Adapters   │
                                                           └─────────────┘
                                                           (Fake or Real)
```

### What This Means

| Allowed | Forbidden |
|---------|-----------|
| `await client.PostAsync("/sessions/123/participants", content)` | `using CinemaTech.BusinessLogic.Models` |
| `response.StatusCode.Should().Be(HttpStatusCode.Created)` | `new Trainee(...)` |
| `response JSON field "participationId"` | `_addIndividualParticipant.Handle(command)` |
| `using ...Ports.ITrainingRepository` (for wiring) | `using ...Models.TrainingId` |
| `using ...Fakes.FakeTrainingRepository` (for test setup) | Direct domain entity construction |

## Test Modes

### Mode: `fake` (Default)

Fast, isolated, deterministic testing with in-memory adapters.

```csharp
// CinemaTech.ApiTest/AddIndividualParticipantE2ETest.cs

public class AddIndividualParticipantE2ETest : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly FakeTrainingRepository _trainingRepository;
    private readonly FakeTrainingSessionRepository _trainingSessionRepository;
    private readonly FakePersonRepository _personRepository;
    private readonly FakeParticipationRepository _participationRepository;

    public AddIndividualParticipantE2ETest(WebApplicationFactory<Program> factory)
    {
        var customFactory = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                // Replace real adapters with fakes
                services.AddSingleton<ITrainingRepository>(_trainingRepository = new FakeTrainingRepository());
                services.AddSingleton<ITrainingSessionRepository>(_trainingSessionRepository = new FakeTrainingSessionRepository());
                services.AddSingleton<IPersonRepository>(_personRepository = new FakePersonRepository());
                services.AddSingleton<IParticipationRepository>(_participationRepository = new FakeParticipationRepository());
            });
        });

        _client = customFactory.CreateClient();

        // Setup existing data
        _trainingRepository.AddTraining(existingTraining);
        _trainingSessionRepository.AddSession(existingSession);
    }

    // tests...
}
```

**Characteristics:**
- In-memory adapters for all secondary ports
- < 100ms per test
- Ideal for rapid TDD cycles
- Deterministic behavior

### Mode: `database`

Realistic testing with real infrastructure via testcontainers.

```csharp
public class TrainingCreationDatabaseE2ETest : IAsyncLifetime
{
    private readonly PostgreSqlContainer _postgres = new PostgreSqlBuilder()
        .WithImage("postgres:16")
        .WithDatabase("test_db")
        .WithUsername("test")
        .WithPassword("test")
        .Build();

    private HttpClient _client = null!;

    public async Task InitializeAsync()
    {
        await _postgres.StartAsync();

        var factory = new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                // Override connection string with testcontainer
                services.Configure<DatabaseOptions>(opts =>
                    opts.ConnectionString = _postgres.GetConnectionString());
            });
        });

        _client = factory.CreateClient();
    }

    public async Task DisposeAsync()
    {
        await _postgres.DisposeAsync();
    }

    // tests...
}
```

## ASP.NET Core Testing Patterns

### Basic Test Structure

```csharp
public class TrainingCreationE2ETest : IClassFixture<WebApplicationFactory<Program>>
{
    // ... setup above ...

    [Fact]
    public async Task Should_create_training_when_valid_data_is_provided()
    {
        // Given
        var requestBody = new StringContent("""
            {
                "trainingId": "98765432-4321-4321-8321-210987654321",
                "title": "React Advanced Patterns",
                "goal": "Learn advanced React patterns for building scalable applications",
                "description": "Covers render props, hooks patterns, and performance optimization."
            }
            """, Encoding.UTF8, "application/json");

        // When
        var response = await _client.PostAsync("/trainings", requestBody);

        // Then
        response.StatusCode.Should().Be(HttpStatusCode.Created);

        // Verify via GET
        var getResponse = await _client.GetAsync("/trainings/98765432-4321-4321-8321-210987654321");
        getResponse.StatusCode.Should().Be(HttpStatusCode.OK);

        var body = await getResponse.Content.ReadFromJsonAsync<JsonElement>();
        body.GetProperty("title").GetString().Should().Be("React Advanced Patterns");
    }

    [Fact]
    public async Task Should_return_400_when_missing_required_training_title()
    {
        // Given
        var requestBody = new StringContent("""
            {
                "trainingId": "98765432-4321-4321-8321-210987654321"
            }
            """, Encoding.UTF8, "application/json");

        // When
        var response = await _client.PostAsync("/trainings", requestBody);

        // Then
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }
}
```

### Request Patterns

```csharp
// POST with JSON body and auth
var content = new StringContent(
    $$"""{"personId": "{{personId}}", "unitPrice": 120000, "discount": 10, "tva": 20}""",
    Encoding.UTF8, "application/json");
_client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
var response = await _client.PostAsync($"/sessions/{sessionId}/participants", content);
response.StatusCode.Should().Be(HttpStatusCode.Created);

// GET with path parameter
var response = await _client.GetAsync($"/trainings/{trainingId}");
response.StatusCode.Should().Be(HttpStatusCode.OK);

// GET with query parameters
var response = await _client.GetAsync($"/trainings?tenantId={tenantId}");
response.StatusCode.Should().Be(HttpStatusCode.OK);
```

## Verification Patterns

### State Verification via API (Preferred)

```csharp
[Fact]
public async Task Should_persist_training_and_retrieve_it()
{
    // Given
    var requestBody = new StringContent("""
        {
            "trainingId": "98765432-4321-4321-8321-210987654321",
            "title": "TDD Workshop"
        }
        """, Encoding.UTF8, "application/json");

    // When - Create
    var response = await _client.PostAsync("/trainings", requestBody);
    response.StatusCode.Should().Be(HttpStatusCode.Created);

    // Then - Verify via API (not direct DB access)
    var getResponse = await _client.GetAsync("/trainings/98765432-4321-4321-8321-210987654321");
    getResponse.StatusCode.Should().Be(HttpStatusCode.OK);

    var body = await getResponse.Content.ReadFromJsonAsync<JsonElement>();
    body.GetProperty("title").GetString().Should().Be("TDD Workshop");
}
```

### Database Verification (When Necessary)

```csharp
[Fact]
public async Task Should_add_individual_participant_with_complete_information()
{
    // Given
    var requestBody = new StringContent(
        $$"""{"personId": "{{personId}}", "unitPrice": 120000, "discount": 10, "tva": 20}""",
        Encoding.UTF8, "application/json");

    // When
    var response = await _client.PostAsync($"/sessions/{sessionId}/participants", requestBody);
    response.StatusCode.Should().Be(HttpStatusCode.Created);

    var responseBody = await response.Content.ReadFromJsonAsync<JsonElement>();
    var participationId = responseBody.GetProperty("participationId").GetString();

    // Then - Verify database state via DbContext
    using var scope = _factory.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var participation = await dbContext.Participations.FindAsync(Guid.Parse(participationId!));

    participation.Should().NotBeNull();
    participation!.TenantId.Should().Be(tenantId);
    participation.TrainingSessionId.Should().Be(sessionId);
    participation.UnitPrice.Should().Be(120000);
    participation.Discount.Should().Be(10);
    participation.Tva.Should().Be(20);
}
```

## Test File Organization

```
CinemaTech.ApiTest/
└── E2E/
    ├── Config/
    │   └── E2ETestFixture.cs                          # WebApplicationFactory setup with fakes
    ├── TrainingCreationE2ETest.cs                     # Training CRUD endpoints
    ├── AddIndividualParticipantE2ETest.cs              # Participant addition endpoints
    └── GenerateCertificateE2ETest.cs                   # Certificate generation endpoints
```

### File Naming Convention

- `{Action}{Resource}E2ETest.cs`
- Examples: `TrainingCreationE2ETest.cs`, `AddIndividualParticipantE2ETest.cs`

## Anti-Patterns

### NO Direct Domain Access

```csharp
// WRONG - Importing domain entities/value objects in E2E test
using CinemaTech.BusinessLogic.Models;
using CinemaTech.BusinessLogic.UseCases;

[Fact]
public void TestParticipation()
{
    var result = _addIndividualParticipant.Handle(command);  // Direct use case access!
    var training = Training.Create(...);                      // Domain entity import!
}

// CORRECT - HTTP only
[Fact]
public async Task Should_add_participant_when_valid_data()
{
    var response = await _client.PostAsync(
        $"/sessions/{sessionId}/participants", requestBody);
    response.StatusCode.Should().Be(HttpStatusCode.Created);
}
```

### NO Shared Mutable State

```csharp
// WRONG - Tests share state
public class TrainingApiE2ETest
{
    private static readonly FakeTrainingRepository _trainingRepository =
        new();  // Shared!
}

// CORRECT - Fresh state per test via IClassFixture or constructor
public class TrainingApiE2ETest : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly FakeTrainingRepository _trainingRepository;

    public TrainingApiE2ETest(WebApplicationFactory<Program> factory)
    {
        _trainingRepository = new FakeTrainingRepository();  // Fresh per test class
    }
}
```

## RED Phase for E2E Tests

### Example

```csharp
[Fact]
public async Task Should_return_201_when_adding_individual_participant()
{
    // Write test as if endpoint exists
    var requestBody = new StringContent("""
        {
            "personId": "f47ac10b-58cc-4372-a567-0e02b2c3d481",
            "unitPrice": 120000,
            "discount": 10,
            "tva": 20
        }
        """, Encoding.UTF8, "application/json");

    var response = await _client.PostAsync(
        $"/sessions/{sessionId}/participants", requestBody);  // Endpoint doesn't exist yet

    response.StatusCode.Should().Be(HttpStatusCode.Created);

    var body = await response.Content.ReadFromJsonAsync<JsonElement>();
    body.GetProperty("participationId").GetString().Should().NotBeNullOrEmpty();
    body.GetProperty("traineeId").GetString().Should().NotBeNullOrEmpty();
}
```

### Scaffold Example

```csharp
// Controllers/ParticipantController.cs

[ApiController]
[Route("sessions/{sessionId}/participants")]
public class ParticipantController : ControllerBase
{
    [HttpPost]
    public IActionResult AddIndividualParticipant(
        string sessionId,
        [FromBody] AddIndividualParticipantRequest request)
    {
        // Scaffold - returns empty for behavioral failure
        return Created("", new { participationId = "", traineeId = "" });
    }
}
```

## Performance Guidelines

| Mode | Target | Notes |
|------|--------|-------|
| fake | < 100ms per test | In-memory adapters |
| database | < 5s per test | Testcontainers overhead |
| Total suite | < 60s | Minimize E2E count |

## Related Skills

- **`tdd-workflow-engine`** — TDD Sequence, enforcement rules
- `tdd-testing-patterns` — Test doubles, fixtures, assertions
- `tdd-core-patterns` — Unit testing for hexagon
- `tdd-integration-patterns` — Integration testing for adapters
