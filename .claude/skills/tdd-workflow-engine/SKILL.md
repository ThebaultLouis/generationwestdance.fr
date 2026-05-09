---
name: tdd-workflow-engine
description: Core TDD state machine and enforcement rules shared by tdd and tdd-auto agents
---

# Skill: TDD Workflow Engine

**Shared foundation** for the `tdd` and `tdd-auto` agents. Contains the TDD Sequence, TPP, Violation Handling, Test Type Detection, and Over-Implementation Prevention rules. Each agent defines its own state machine and gate behavior on top of this engine.

## The TDD Sequence

This is the single authoritative reference for test-first discipline. All enforcement
rules, violation handlers, and per-test-type phases reference this section.

**ABSOLUTE RULE A (Test Completeness): The ENTIRE test — all setup (Given), action (When),
and assertions (Then) — must be written in a SINGLE Write or Edit call before ANY production
file is created or modified. No partial-test-then-scaffold-then-more-test. The test is written
ONCE, COMPLETELY, and then left untouched until behavioral failure is achieved.**

**ABSOLUTE RULE B (Test First): The test file is the FIRST file you Write or Edit.
No production file may be created or modified before the test file is saved.
This is non-negotiable — even if you know what classes you will need.**

1. WRITE THE COMPLETE TEST using wishful thinking — call classes/methods that do not exist.
   The test defines the API.
   - Write the COMPLETE test in one pass — all Given-When-Then in a single Write/Edit call.
   - Use the Write or Edit tool to save the test file NOW.
   - Do NOT pre-create any production class, interface, or file "to avoid compilation errors."
   - Compilation errors are expected — they are step 2.
   - Test MUST NOT be modified again until scaffolding is done and behavioral failure achieved.
   - If the test needs changes during scaffolding → abort ALL scaffolding, fix the test, restart from step 2.

2. RUN THE TEST. It will fail with compilation/import errors. This is expected.

3. SCAFFOLD — create the minimum stubs to fix compilation errors IN ONE BATCH:
   - Analyze ALL compilation errors from step 2, then create ALL stubs in one pass.
   - Empty classes, methods returning null/default, bare interfaces.
   - No business logic. No constructor parameters beyond what the compiler demands.
   - This step exists ONLY to move from compilation errors to assertion failure.
   - Test file MUST NOT be edited during scaffolding.

4. RUN THE TEST AGAIN. It must now fail on an assertion (behavioral failure).
   This is valid RED.

One test per RED phase. Each test drives one transformation step (see TPP below).

## Transformation Priority Premise (GREEN Phase)

Apply Uncle Bob's TPP: as tests get more specific, code gets more generic — but only when forced by a failing test.

| Priority | Transformation | Description |
|----------|---------------|-------------|
| 1 | {} → nil | No code → return nothing |
| 2 | nil → constant | Return a hard-coded value |
| 3 | constant → variable | Replace constant with variable/parameter |
| 4 | unconditional → conditional | Add if/else branching |
| 5 | scalar → collection | Single value → array/list |
| 6 | statement → recursion | Simple statement → recursive call |
| 7 | selection → iteration | Conditional → loop |
| 8 | value → mutated value | Transform existing value |

**Rules:**
- Always prefer higher-priority transformations
- Do NOT jump to loops, recursion, or collections until a test forces you there
- First test → return a constant. Second test → add a conditional. Third test reveals a pattern → use iteration.
- If you write a loop on the first test, you are violating TPP — step back.

## Over-Implementation Prevention (GREEN Phase)

**The golden question before every line of code:** "Does this make the failing test pass?"

- Only implement what makes the failing test pass — stop immediately when it passes
- If design mentions X but test doesn't assert X, DON'T implement X
- NEVER add defensive code, getters/setters/properties, or enums unless driven by a failing test

**Enum TDD Discipline Example:**
```csharp
// WRONG - Over-implementing enum values
[Fact]
public void Should_default_to_individual_status_when_no_explicit_status_and_training_is_not_apprenticeship()
{
    // Test only asserts Individual status
    trainee.Status.Should().Be(TraineeStatus.Individual);
}

// WRONG enum - too many values
public enum TraineeStatus
{
    Individual,      // Test demands this
    Apprentice,      // No test demands this yet
    JobSeeker,       // No test demands this yet
    PrivateEmployee  // No test demands this yet
}

// CORRECT - Only test-demanded enum value
public enum TraineeStatus
{
    Individual   // Only this - test asserts it
}

// Evolution: Add enum values only when new tests demand them
// Next test: Should_default_to_apprentice_when_training_is_apprenticeship
// THEN add: Apprentice
```

**Domain Event Over-Implementation Example:**

```csharp
// WRONG - Implementing events not tested
[Fact]
public void Should_create_participation_when_valid_participant_data()
{
    var result = _addIndividualParticipant.Handle(command);
    result.IsSuccess.Should().BeTrue();
    // Test doesn't assert events!
}

// Don't implement domain events machinery if test doesn't demand it:
// - List<IDomainEvent> _domainEvents
// - DomainEvents property
// - Event creation in factory
// - Event base interfaces

// CORRECT - Only what test demands
var participation = Participation.Create(
    participationId,
    command.TenantId,
    command.SessionId
    // ... only fields the test asserts
);
```

## Violation Handling

### V0: Creating Code Before Test (ZERO TOLERANCE)

Before every Write or Edit call during RED phase, verify:
"Is the file I'm about to write/edit a test file?"
If NO and no test file has been written yet in this RED phase → STOP. Write the test first.

### V0b: Multiple Tests in a Single RED Phase

**Detection:** More than one `[Fact]` method written during a single RED_PHASE.

**Action:** STOP → keep only the first test (next in TPP progression) → DELETE all others → continue RED_PHASE.

### V0c: Interleaved Test Writing and Scaffolding (ZERO TOLERANCE)

**Detection:** The test file is edited (Write or Edit) AFTER any production file has been created or modified in the same RED phase.

**Action:** STOP → abort ALL scaffolding created so far → fix the test file → restart from step 2 (re-run the test). The test must be COMPLETE before scaffolding begins. No interleaving.

### V1: Class/Method Not Found During RED

**Precondition:** Test has already been written (otherwise this is V0).

**Action:** Create minimal scaffold (empty class/method returning null/default) → re-run test → continue until behavioral failure.

### V2: Premature Implementation

**Detection:** Production logic written before RED_PHASE achieves behavioral failure.

**Action:** Remove production code → restore scaffold state → re-run to achieve RED.

### V3: Stopping During RED_PHASE

**Detection:** Asking "Should I continue?" or waiting mid-RED.

**Action:** Continue execution without waiting. Complete the full RED phase.

### V4: Test Passes in RED Phase (BLOCKING)

**Detection:** Test passes without implementation — the assertion is likely too weak.

**Action:**
1. Present a **BLOCKING** warning: show the exact assertion that passed and suggest a stronger alternative
2. **STOP & WAIT** for user decision (both `tdd` and `tdd-auto` agents pause here)
3. If user says "continue anyway" / "go green anyway" → proceed (skip implementation since test passes)
4. If user provides a refinement → update the test, re-run, attempt behavioral failure
5. Default: stay in RED_PHASE and wait for user decision

### V5: Over-Implementation — Enum Values (GREEN Phase)

**Detection:** Adding enum values not demanded by the current failing test.

**Action:** Remove untested enum values, keep only what the test asserts.

### V6: Over-Implementation — Domain Events (GREEN Phase)

**Detection:** Implementing domain events machinery (event list, DomainEvents property, event classes) without test assertions requiring them.

**Action:** Remove event machinery not demanded by the test.

### V7: Over-Implementation — Methods/Classes (GREEN Phase)

**Detection:** Creating methods or classes not called by the current failing test.

**Action:** Remove methods/classes not required by the test.

## Test Type Detection

### Detection Algorithm (Priority Order)

**1. Explicit Prefix (Highest Priority)**

| Prefix | Test Type |
|--------|-----------|
| `unit:` | Unit Test |
| `e2e:` | E2E Test |
| `integration:` | Integration Test |

**2. E2E Indicators:** api, endpoint, http, rest, route, via api, through api, expose, status code, return 200/201/400/404, request, response, json, controller

**3. Integration Indicators:** postgresql, postgres, database, sql, persist, testcontainers, adapter implementation, repository implementation, ef core, external service, redis, real database

**4. Default:** Unit test (hexagon/core logic)

**Override:** If user responds with "actually use [unit/e2e/integration]", switch immediately.

### Phase Execution by Test Type

For RED and GREEN phase details specific to each test type, apply the corresponding skill:
- Unit tests → `tdd-core-patterns`
- E2E tests → `tdd-e2e-patterns`
- Integration tests → `tdd-integration-patterns`

All types follow The TDD Sequence. Skills provide type-specific scaffolding and implementation patterns.

## Enforcement Rules

| Rule | Description |
|------|-------------|
| **RULE 0** | The TDD Sequence (above) must be followed — test before production code |
| **RULE 4** | Test must fail behaviorally (assertion failure) — if it passes, V4 applies |
| **RULE 5** | Test type patterns must be followed (E2E = HTTP only, etc.) |
| **RULE 6** | Scaffold creation happens only after the COMPLETE test is written. No returning to edit the test during scaffolding. |

Agent-specific rules (gate behavior, pausing) are defined in each agent's own file.

## Agent Memory

After each CYCLE_COMPLETE, record concise key-value entries for:

- **Naming conventions** observed (file names, class names, test names)
- **Fake adapters** discovered (class name + file path)
- **Object Mothers / fixtures** found (class name + file path)
- **Bounded context structure** insights (which context owns what)
- **TDD violations** encountered and how they were resolved

Keep entries terse. Prioritize information that accelerates future TDD cycles.

## Error Recovery

If a test run fails due to infrastructure issues (`dotnet` CLI crash, out-of-memory, Docker/testcontainers timeout):

1. Do NOT treat the failure as behavioral failure (RED). Infrastructure errors are not assertion failures.
2. Diagnose: check error output for stack traces, OOM messages, or timeout indicators.
3. If transient (Docker restart, file lock): retry the test run once.
4. If persistent: report the infrastructure error to the user and STOP. Do not attempt to fix infrastructure configuration autonomously.
5. The TDD state does not change — remain in whichever phase you were in before the failure.
