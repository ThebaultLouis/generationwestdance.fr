---
name: tdd-core-patterns
description: Strategic testing philosophy for application core (hexagon) - sociable tests, outside-in TDD, and core testing decisions
---

# Skill: TDD Core Patterns

## Purpose

Strategic testing philosophy for implementing the application core (hexagon) using TDD with Martin Fowler's **sociable tests** approach. This skill defines **what to test** and **how to approach** unit testing through Application Services (Use Cases) using real domain collaborators and fake external dependencies.

**For implementation details** (test doubles, fixtures, assertions, snapshot rules, Result patterns), see `tdd-testing-patterns`.

## Testing Philosophy: Outside-In with Sociable Tests and Wishful Thinking

We combine **Outside-In TDD** with Martin Fowler's **sociable tests** approach and **Programming by Wishful Thinking**:

**Programming by Wishful Thinking:** See the `tdd-workflow-engine` skill for the canonical TEST FIRST sequence.

**Outside-In TDD (Our Process):**
- Start from the primary port (use case) with business scenarios
- Let domain models emerge from use case behavior needs
- Begin with simple types, evolve to rich domain objects
- Test business behavior first, implementation structure second

**Sociable Tests (Our Implementation Style):**
- System Under Test works with real collaborators within the same layer
- Use real domain objects (aggregates, entities, value objects) together
- Fake only external dependencies (repositories, external services)
- Test business scenarios through natural object interactions
- Higher confidence, easier maintenance, realistic behavior validation

**What We Avoid:**
- **Inside-out approach**: Starting with domain objects before understanding behavior
- **Solitary tests**: Mocking domain objects and value objects
- **Implementation-first**: Designing aggregates before testing use cases
- **Creating before testing**: Writing production code before test

**Decision Rule:** Wishful thinking first, outside-in process, sociable within the core hexagon, isolated from infrastructure.

## Core Principles

**Unit Tests for Core (< 10ms per test):**
- Test domain logic and use case orchestration
- Use real domain objects (aggregates, entities, value objects)
- Custom fake implementations for secondary ports
- No mocking frameworks — hand-written test doubles only
- Focus on business behavior, not implementation details
- Prefer explicit `Given...`, `When...`, and `Then...` helper methods; when a test has more than a couple of assertions, move the assertions into a dedicated `Then...` helper instead of leaving a long inline assertion block
- **NEVER add defensive code (null checks, parameter validations) unless driven by failing test**
- **NEVER generate setters/getters/properties unless absolutely required by failing test**

## Test Categories for Core

### Primary Target: Application Services (Use Cases)
**Location:** `CinemaTech.BusinessLogicTest/`
**Target:** Application Services (Use Cases) that orchestrate business scenarios
**Strategy:** Test through business use cases using real domain collaborators
**Why:** Validates complete business scenarios, maintains behavioral focus, reduces test maintenance

### Secondary Target: Domain Services (When Justified)
**Location:** `CinemaTech.BusinessLogicTest/`
**Target:** Domain Services with complex isolated logic
**When to Test Directly:**
- Complex calculations or algorithms
- Cross-aggregate business rules
- Logic that benefits from isolated specification
**Strategy:** Test with real value objects and domain primitives

### What We Don't Test Directly: Aggregates/Entities/Value Objects
**Validation Strategy:** Their behavior is validated through Use Case tests
**Rationale:**
- Aggregates are tested through business scenarios, not in isolation
- Value object behavior emerges through use case execution
- Entity invariants are verified through realistic business flows
- Reduces over-specification and brittle tests

## Primary Testing Through Use Cases — Full Example

```csharp
// CinemaTech.BusinessLogicTest/AddIndividualParticipantTest.cs

public class AddIndividualParticipantTest
{
    private readonly FakeTrainingSessionRepository _trainingSessionRepository;
    private readonly FakeTrainingRepository _trainingRepository;
    private readonly FakePersonRepository _personRepository;
    private readonly FakeParticipationRepository _participationRepository;
    private readonly FakeTraineeRepository _traineeRepository;
    private readonly StubEntityIdGenerator _entityIdGenerator;
    private readonly AddIndividualParticipant _addIndividualParticipant;

    public AddIndividualParticipantTest()
    {
        _trainingSessionRepository = new FakeTrainingSessionRepository();
        _trainingRepository = new FakeTrainingRepository();
        _personRepository = new FakePersonRepository();
        _participationRepository = new FakeParticipationRepository();
        _traineeRepository = new FakeTraineeRepository();
        _entityIdGenerator = new StubEntityIdGenerator();

        _addIndividualParticipant = new AddIndividualParticipant(
            _trainingSessionRepository,
            _trainingRepository,
            _personRepository,
            _participationRepository,
            _traineeRepository,
            _entityIdGenerator
        );

        // Setup existing data
        _trainingRepository.AddTraining(existingTraining);
        _trainingSessionRepository.AddSession(existingSession);
    }

    [Fact]
    public void Should_create_participation_and_trainee_when_valid_participant_data()
    {
        // Given
        _personRepository.AddPerson(existingPerson);

        var command = new AddIndividualParticipantCommand(
            sessionId,
            tenantId,
            personId,
            120000,  // unitPrice
            10,      // discount
            20       // tva
        );

        // When
        var result = _addIndividualParticipant.Handle(command);

        // Then
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(
            new AddIndividualParticipantResult(
                "generated-id-1",
                "generated-id-2",
                "test-person-id"
            )
        );

        // Verify participation snapshot
        var participations = _participationRepository.GetAll();
        participations.Should().HaveCount(1);
        participations[0].ToSnapshot().Should().Be(
            new ParticipationSnapshot(
                "generated-id-1",
                "tenant-1",
                null,           // companyId
                "session-123",
                120000,
                10,
                20,
                null,           // comment
                null,           // fundingMode
                null,           // fundingOrganizationId
                null,           // fundingCoverageAmount
                null,           // fileNumber
                false           // deleted
            )
        );

        // Verify trainee snapshot
        var trainees = _traineeRepository.GetAll();
        trainees.Should().HaveCount(1);
        trainees[0].ToSnapshot().Should().Be(
            new TraineeSnapshot(
                "generated-id-2",
                "tenant-1",
                "generated-id-1",
                "test-person-id",
                TraineeStatus.Individual
            )
        );
    }

    [Fact]
    public void Should_prevent_participant_addition_for_non_existent_session()
    {
        // Given
        _personRepository.AddPerson(existingPerson);

        var command = new AddIndividualParticipantCommand(
            new TrainingSessionId("non-existent-session"),
            tenantId,
            personId
        );

        // When
        var result = _addIndividualParticipant.Handle(command);

        // Then
        result.IsFailure.Should().BeTrue();
        result.Error.Should().BeOfType<TrainingSessionNotFound>();

        // No side effects
        _participationRepository.GetAll().Should().BeEmpty();
        _traineeRepository.GetAll().Should().BeEmpty();
    }
}
```

## Secondary Testing — Domain Services (When Justified)

```csharp
// CinemaTech.BusinessLogicTest/TraineeStatusResolverTest.cs

public class TraineeStatusResolverTest
{
    private readonly TraineeStatusResolver _resolver = new();

    [Fact]
    public void Should_resolve_to_individual_when_training_is_standard_formation_and_no_explicit_status()
    {
        // Given - Complex business rule that benefits from isolated specification
        var training = Training.Create(
            defaultTrainingProps with { ActionType = ActionType.ActionFormation }
        );

        // When
        var status = _resolver.ResolveDefault(training, null);

        // Then
        status.Should().Be(TraineeStatus.Individual);
    }

    [Fact]
    public void Should_resolve_to_apprentice_when_training_is_apprenticeship_and_no_explicit_status()
    {
        // Given
        var training = Training.Create(
            defaultTrainingProps with { ActionType = ActionType.Apprentissage }
        );

        // When
        var status = _resolver.ResolveDefault(training, null);

        // Then
        status.Should().Be(TraineeStatus.Apprentice);
    }
}
```

## What We Don't Test Directly

```csharp
// BAD - Over-testing domain objects in isolation
public class ParticipationTest { /* tests all validation rules */ }
public class TraineeTest { /* tests all state transitions */ }
public class PersonIdTest { /* tests all validation */ }

// GOOD - Test domain behavior through business scenarios
public class AddIndividualParticipantTest
{
    [Fact]
    public void Should_prevent_participant_addition_when_person_does_not_belong_to_tenant()
    {
        // Tenant isolation emerges through use case
        // Entity invariants validated through business flow
    }
}
```

## Event Testing Patterns

### Event Accumulation Through Use Cases

```csharp
[Fact]
public void Should_publish_training_session_created_event_when_session_is_scheduled()
{
    // Given
    var command = ValidScheduleSessionCommand();

    // When
    _scheduleTrainingSession.Handle(command);

    // Then - Domain event validated through repository fake
    var events = _trainingSessionRepository.GetPersistedEvents();
    events.Should().HaveCount(1);

    var @event = events[0];
    @event.EventType.Should().Be("TrainingSessionCreated");
    @event.SessionId.Should().Be(command.SessionId);
    @event.TrainingId.Should().Be(command.TrainingId);
    @event.TenantId.Should().Be(command.TenantId);
}
```

## Sociable Testing Strategy for Core

### Real Collaborators Within Core
- **Use Real Objects:** Aggregates, entities, value objects work together naturally
- **Natural Interactions:** Domain objects collaborate as they would in production
- **Business Scenario Focus:** Tests validate complete business flows
- **Authentic Behavior:** Real domain logic execution provides higher confidence

### Test Double Strategy: Isolated from Infrastructure

**Core-Specific Approach:**
- **Use Real Domain Objects:** Training, Trainee, Participation, Person work together naturally
- **Fake External Dependencies:** Repositories, external services, transaction management
- **Focus on Business Scenarios:** Test complete business flows through use cases

**For comprehensive test doubles guide, see `tdd-testing-patterns`.**

## Enforcement: No Direct Aggregate/Entity/Value Object Testing

**MANDATORY RULE**: Core tests MUST target Use Cases (Application Services), NEVER aggregates, entities, or value objects directly.

**Detection:**
```
IF (test_class_SUT is Aggregate OR Entity OR ValueObject) {
    VIOLATION: "Direct domain object testing"
    ACTION: Rewrite test to go through a Use Case
}
```

**Indicators of violation:**
- Test instantiates an aggregate and calls its methods directly as SUT
- Test class has no Use Case / Application Service dependency
- No fake repository or secondary port in test setup
- SUT is a domain object instead of an Application Service

**Only exception:** Domain Services with complex isolated logic (see "Secondary Target" above).

## Anti-Patterns

### Don't Use Solitary Tests for Domain Objects

```csharp
// BAD - Isolating domain objects with mocks
var training = Substitute.For<ITraining>();
var session = Substitute.For<ITrainingSession>();

[Fact]
public void Should_create_trainee()
{
    _addIndividualParticipant.Handle(command);  // Too isolated
}

// GOOD - Sociable tests with real domain collaborators
[Fact]
public void Should_create_participation_and_trainee_when_valid_participant_data()
{
    _personRepository.AddPerson(existingPerson);
    _trainingRepository.AddTraining(existingTraining);
    _trainingSessionRepository.AddSession(existingSession);

    var result = _addIndividualParticipant.Handle(command);  // Real collaboration
    result.IsSuccess.Should().BeTrue();
}
```

### Don't Mock What You Own (Domain Layer)

```csharp
// BAD - Mocking domain objects you control
var training = Substitute.For<ITraining>();
var resolver = Substitute.For<ITraineeStatusResolver>();

// GOOD - Use real domain objects, fake only external dependencies
var trainingRepository = new FakeTrainingRepository();
var resolver = new TraineeStatusResolver();  // Real domain service
```

### Don't Use Real Infrastructure in Unit Tests

```csharp
// BAD - Real database/network in unit tests
var dbContext = new AppDbContext(options);  // Too slow, not unit test

// GOOD - Fake external dependencies
var trainingRepository = new FakeTrainingRepository();
var traineeRepository = new FakeTraineeRepository();
```

## Performance Guidelines

### Speed Requirements
- **Target**: < 10ms per test
- **Total suite**: < 1 second for all core tests
- **No I/O**: No database, network, file system access
- **Memory only**: Use in-memory collections for fakes

### Test Organization
```
CinemaTech.BusinessLogicTest/
├── AddIndividualParticipantTest.cs       # PRIMARY: Use case tests
├── ScheduleTrainingSessionTest.cs        # PRIMARY: Use case tests
└── TraineeStatusResolverTest.cs          # SECONDARY: Domain service tests
```

## Quick Checklist

Before writing core test:
- [ ] **Primary Target**: Testing through Use Cases (Application Services)
- [ ] Test name describes business scenario (`Should_[businessOutcome]_when_[businessCondition]`)
- [ ] Uses **real domain objects** working together (sociable approach)
- [ ] Uses **fake implementations** only for secondary ports (repositories, external services)
- [ ] Tests complete **business scenarios**, not isolated object behavior
- [ ] Runs in < 10ms (unit test speed with in-memory fakes)
- [ ] **No mocking of domain objects** (aggregates, entities, value objects)
- [ ] Follows Given-When-Then structure with business context
- [ ] **Domain behavior emerges** through use case execution, not direct testing
- [ ] Only test Domain Services directly when complex isolated logic justified
- [ ] **NEVER add defensive code unless required by failing test**
- [ ] **NEVER generate setters/getters/properties unless absolutely required by failing test**
- [ ] **For snapshot and Result assertion rules, see `tdd-testing-patterns`**

## Related Skills

- **`tdd-workflow-engine`** — TDD Sequence, TPP, violations, test type detection
- **`tdd-testing-patterns`** — Test doubles, fixtures, snapshot assertions, Result assertions
