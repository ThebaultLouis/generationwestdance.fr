---
name: tdd-testing-patterns
description: Test patterns, doubles, fixtures, and assertions for Clean Architecture
---

# Skill: TDD Testing Patterns

**Focus:** HOW to write tests — patterns, doubles, fixtures, assertions.

## Canonical Reference

**For the mandatory TEST FIRST sequence, state machine, and wishful thinking workflow, see:** the `tdd-workflow-engine` skill.

This skill focuses on implementation patterns for test code.

## Assertion Library

**Use Shouldly. Never use FluentAssertions** (commercial license — Xceed).

```csharp
// Shouldly — correct
result.IsSuccess.ShouldBeTrue();
result.Value.ShouldBe(expected);
result.Error.ShouldBeOfType<SessionDejaActive>();
snapshot.ShouldBe(expectedSnapshot);
list.ShouldBeEmpty();
list.Count.ShouldBe(3);
value.ShouldNotBeNull();

// FluentAssertions — NEVER use
result.IsSuccess.Should().BeTrue();   // ❌
result.Value.Should().Be(expected);   // ❌
```

## Test Structure: Given / When / Then (Mandatory)

Every `[Fact]` body must consist **only** of calls to private `Given*` / `When*` / `Then*` helper methods. No inline assertions or inline setup.

```csharp
[Fact]
public void should_transition_plugin_to_active_state_when_plugin_is_currently_inactive()
{
    GivenInactivePlugin(TimerSlug);
    var result = WhenActivating(TimerSlug);
    ThenPluginIsActive(result, TimerSlug);
}
```

- `Given*(…)` — seeds state (repository, fakes, clock); returns void
- `When*(…)` — calls the SUT (use case, repository method, HTTP endpoint); returns the result
- `Then*(result, …)` — contains all assertions; returns void
- Constructor / `InitializeAsync` wires collaborators only — no seeding

When no state needs seeding, the `Given*` call may be omitted.

**Applies to all test layers:** unit (`BusinessLogicTest`), integration (`SecondaryAdaptersTest`), E2E (`ApiTest`).

## Test Naming

**Pattern:** `should_[outcome]_when_[condition]` (snake_case)

```csharp
// GOOD
[Fact]
public void should_return_default_configuration_when_no_configuration_has_been_saved() { }

[Fact]
public void should_reject_start_when_a_session_is_already_active() { }

// BAD
[Fact]
public void TestConfiguration() { }   // What behavior?
```

## Test Doubles (No Mocking Frameworks)

**Decision tree:**
```
What dependency?
├── Repository → Fake (in-memory)
├── External service → Spy or Fake
├── Domain object → Real object
├── Value object → Real object
└── Unit of Work → Fake transaction
```

**Types:**
- **Fake:** Working implementation with shortcuts
- **Spy:** Records calls for verification
- **Stub:** Returns canned responses

**NEVER mock domain objects. Use real objects.**

## Snapshot Pattern (Mandatory for Repository Fakes)

```csharp
internal class FakePomodoroSessionRepository : IPomodoroSessionRepository
{
    private PomodoroSession? _active;

    public PomodoroSession? FindActive() =>
        _active is null ? null : PomodoroSession.Reconstitute(_active.ToSnapshot());

    public void Save(PomodoroSession session) =>
        _active = PomodoroSession.Reconstitute(session.ToSnapshot());

    // Test helper — not part of the port
    internal void Add(PomodoroSession session) => _active = session;
}
```

**Why snapshots?**
- Enforces explicit `Save()` in use cases
- Returns copies, not references — prevents accidental mutation

## Assertions on Snapshots (Canonical Reference)

**MANDATORY: Assert on snapshots, not domain objects**

```csharp
// WRONG - Entity equality compares only ID
result.Value.ShouldBe(expectedSession);                              // ❌

// CORRECT - full state comparison via snapshot
result.Value.ToSnapshot().ShouldBe(expectedSnapshot);               // ✅

// Field-level assertions
var snapshot = result.Value.ToSnapshot();
snapshot.Phase.ShouldBe(PomodoroPhase.Travail);
snapshot.EstActive.ShouldBeTrue();
snapshot.CycleActuel.ShouldBe(1);
```

## Result Type Assertions

```csharp
// Success
result.IsSuccess.ShouldBeTrue();
result.Value.ToSnapshot().ShouldBe(expectedSnapshot);

// Failure
result.IsFailure.ShouldBeTrue();
result.Error.ShouldBeOfType<SessionDejaActive>();

// No side effects on failure
_sessionRepository.FindActive().ShouldBeNull();
```

## Spy Pattern

```csharp
internal class SpySessionEventChannel : ISessionEventChannel
{
    private readonly List<PomodoroSessionSnapshot> _published = [];

    public void Publish(PomodoroSessionSnapshot snapshot) =>
        _published.Add(snapshot);

    internal IReadOnlyList<PomodoroSessionSnapshot> PublishedSnapshots =>
        _published.AsReadOnly();
}

// Assertions
_spy.PublishedSnapshots.Count.ShouldBe(1);
_spy.PublishedSnapshots[0].EstActive.ShouldBeTrue();
_spy.PublishedSnapshots.ShouldBeEmpty();
```

## Stub Pattern (Predictable IDs)

```csharp
internal class StubEntityIdGenerator : IEntityIdGenerator
{
    private int _counter;

    public string Generate() => $"generated-id-{++_counter}";
}
```

## Anti-Patterns

### Inline logic in [Fact] body
```csharp
// WRONG
[Fact]
public void should_start_session()
{
    var repo = new FakePomodoroSessionRepository();
    var handler = new DemarrerSessionPomodoroCommandHandler(repo, new FakeSystemClock());
    var result = handler.Handle(new DemarrerSessionPomodoroCommand());
    result.IsSuccess.ShouldBeTrue();                                 // ❌ inline assertion
}

// CORRECT
[Fact]
public void should_start_session()
{
    GivenNoActiveSession();
    var result = WhenStartingSession();
    ThenSessionIsActive(result);
}
```

### Mocking domain objects
```csharp
// WRONG
var session = Substitute.For<IPomodoroSession>();                    // ❌

// RIGHT
var session = PomodoroSession.Reconstitute(snapshot);               // ✅
```

### Direct entity comparison
```csharp
// WRONG
result.Value.ShouldBe(expectedSession);                             // ❌ compares only ID

// RIGHT
result.Value.ToSnapshot().ShouldBe(expectedSnapshot);              // ✅
```

## Quick Checklist

- [ ] Test name: `should_[outcome]_when_[condition]`
- [ ] `[Fact]` body: only `Given*` / `When*` / `Then*` calls — no inline logic
- [ ] Assertions: Shouldly only (`.ShouldBe()`, `.ShouldBeTrue()`, etc.)
- [ ] Assert on snapshots, not domain objects
- [ ] Assert Result with `.IsSuccess` / `.IsFailure`
- [ ] Repository fakes use snapshot pattern
- [ ] No mocking frameworks for domain objects
- [ ] < 10ms per unit test

## Related Skills

- **`tdd-workflow-engine`** — TDD Sequence, TPP, violations, test type detection
- `tdd-core-patterns` — What to test (sociable testing)
