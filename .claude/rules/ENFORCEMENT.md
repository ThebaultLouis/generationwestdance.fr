# Global Enforcement Rules

## 🎯 Core Mandatory Principles

For the complete TDD Sequence (test completeness, test first, batch scaffolding, no interleaving), see the `tdd-workflow-engine` skill — it is the single authoritative reference.

### No Defensive Programming (MANDATORY)
**NEVER add unless driven by failing test:**
- ❌ No null checks without test requiring them
- ❌ No parameter validation without test
- ❌ No getters/setters unless absolutely required
- ✅ Add ONLY when test fails without them

## 📊 State Machine Enforcement

### Mandatory User Gates
**These gates CANNOT be bypassed:**
1. **EXPECTATIONS_GATE** - User must type "go red" to proceed to RED_PHASE
2. **WAIT_FOR_GREEN** - User must type "go green" to proceed to GREEN_PHASE

**Enforcement:**
```
IF (proceeding_without_user_selection) {
    VIOLATION: "❌ User selection required"
    ACTION: Stop, present choices, wait
}
```

### Autonomous Phases
**These phases MUST complete without interruption:**
1. **RED_PHASE_EXECUTION** - Write test → Run → Scaffold → Run → Verify

**Enforcement:**
```
IF (stopping_during_red_phase) {
    VIOLATION: "❌ RED phase must complete autonomously"
    ACTION: Continue execution without stopping
}
```

## 🎨 Technical Expectations Override

### Technical Expectations Processing
**User technical expectations OVERRIDE default patterns while preserving core discipline:**
- ✅ User specifies assertion library (FluentAssertions, Shouldly) → Apply during test writing
- ✅ User requests design pattern (visitor, strategy, factory) → Implement in GREEN phase
- ✅ User defines architectural style (CQRS, event sourcing) → Structure code accordingly
- ✅ User chooses implementation approach → Use throughout development

**Enforcement Boundaries:**
- **PRESERVED:** Programming by wishful thinking, no defensive code, DIP compliance
- **OVERRIDDEN:** Default assertion styles, standard domain patterns, typical code organization
- **PRIORITIZED:** User expectations take precedence over default TDD patterns

**Technical Expectations Storage:**
```
IF (userProvidesExpectations) {
    STORE: Expectations in workflow context
    APPLY: During both RED and GREEN phases
    OVERRIDE: Default patterns with user preferences
    MAINTAIN: Core TDD and architectural discipline
}
```

## 🚨 Violation Detection Patterns

For TDD-specific violations (V0–V0c for RED phase, V1–V4 for scaffolding/compilation, V5–V7 for GREEN phase over-implementation), see the authoritative definitions in the `tdd-workflow-engine` skill.

The violations below cover **non-TDD-sequence concerns** enforced globally:

### Skipped User Gate
**Detection:** Proceeding without user selection/confirmation
**Response:** "❌ VIOLATION: User input required. Waiting..."
**Action:** Stop and wait for user input

### Defensive Programming
**Detection:** Adding validation/checks without failing test
**Response:** "❌ VIOLATION: No defensive code without test. Removing..."
**Action:** Remove defensive code

### Direct Domain Object Usage in Tests
**Detection:** Tests using domain objects directly instead of snapshots — both in Given (setup/arrange) and Then (assertions)
**Indicators:**
- Given: building domain objects by calling constructors or factory methods directly instead of hydrating from snapshots
- Then: asserting on domain objects directly instead of converting to snapshots
**Response:** "❌ VIOLATION: Direct domain object usage. Use snapshots for both test setup and assertions..."
**Action:** Replace direct domain object construction with snapshot-based hydration in Given, and direct domain object assertions with snapshot-based assertions in Then

### Value Object Constructor Nullity Checks
**Detection:** Adding null checks in value object constructors without failing test
**Response:** "❌ VIOLATION: Value object nullity check without test. Removing defensive code..."
**Action:** Remove ArgumentNullException.ThrowIfNull() and validation from value object constructors not demanded by test

### Direct Domain Object Testing
**Detection:** Test class targets an aggregate, entity, or value object directly instead of going through a Use Case (Application Service)
**Indicators:**
- Test instantiates an aggregate and calls its methods as SUT
- No Use Case / Application Service in the test
- No fake repository or secondary port in test setup
**Only exception:** Domain Services with complex isolated logic
**Response:** "❌ VIOLATION: Direct domain object testing. Core tests must go through a Use Case (Application Service)..."
**Action:** Rewrite the test to target a Use Case, using fake repositories for secondary ports, letting aggregate behavior emerge through the use case

### Dependency Inversion Principle (DIP) Violations
**Detection:** Domain layer depending on concrete implementations or infrastructure concerns
**Critical patterns:**
- Domain models importing adapters/infrastructure packages
- Domain models depending on concrete repository implementations
- Domain models importing framework attributes ([Table], [Column], [ApiController], etc.)
- Use cases importing adapter or infrastructure classes
- Domain ports extending framework interfaces

**Response:** "❌ VIOLATION: DIP broken - Domain depends on infrastructure. Fixing dependency direction..."
**Action:**
- Move concrete implementations to adapters layer
- Create abstractions in domain ports
- Remove framework dependencies from domain
- Reverse dependency direction using interfaces

### Ignoring Technical Expectations
**Detection:** Using default patterns when user provided specific technical expectations
**Response:** "❌ VIOLATION: Technical expectations ignored. Applying user-specified [expectation]..."
**Action:**
- Review stored technical expectations
- Apply user-specified patterns/approaches
- Override default implementation with user preferences
- Maintain core TDD discipline while accommodating preferences

## 🔧 User Override Commands

### Global Commands
- `ENFORCE` - Force restart command with proper protocol
- `STATE` - Show current state machine position
- `PROTOCOL` - Reset to beginning with full workflow
- `WISHFUL` - Force wishful thinking approach
- `VIOLATION` - Show last violation and correction
- `EXPECTATIONS` - Show stored technical expectations
- `APPLY` - Force application of specific technical expectation

### Command-Specific
- `/tdd-core`:
  - `SCENARIOS` - Re-show scenario list
  - `RED` - Force proper RED phase

- `/tdd-adapters`:
  - `PORTS` - Re-show port list
  - `RED` - Force proper RED with wishful thinking

## 📝 Enforcement Response Templates

For TDD-sequence violation response templates (premature implementation, interleaved test/scaffold, compilation RED), see the `tdd-workflow-engine` skill.

### User Gate Violation
```
❌ VIOLATION DETECTED: Skipped User Selection
You proceeded without user choosing [scenario/port].

CORRECTIVE ACTION:
1. Stopping execution...
2. Presenting choices...
3. WAITING for user selection...

I cannot proceed without your explicit choice.
```

### Defensive Code Violation
```
❌ VIOLATION DETECTED: Defensive Programming
You added [null check/validation] without failing test.

CORRECTIVE ACTION:
1. Removing defensive code...
2. Running test to verify it still passes...
3. Only adding code when test fails...

Remember: YAGNI - You Aren't Gonna Need It (unless test says so).
```

For over-implementation violation templates, see the `tdd-workflow-engine` skill (V5–V7).

### Direct Domain Object Usage Violation
```
❌ VIOLATION DETECTED: Direct Domain Object Usage in Test
You used domain objects directly instead of snapshots in [test].

DETECTED IN:
- [Given/Then or both]: [description of violation]

CORRECTIVE ACTION:
1. Given: Replacing direct domain object construction with snapshot-based hydration...
2. Then: Converting assertion to use domainObject.ToSnapshot() instead of domainObject directly...
3. Ensuring snapshots are used at both test boundaries (setup and verification)...

Remember: Domain entities Equals() only compares ID, not business state.
Snapshots provide a complete, transparent view of state for both building test fixtures and verifying outcomes.
```

### Value Object Constructor Nullity Check Violation
```
❌ VIOLATION DETECTED: Value Object Constructor Nullity Check
You added ArgumentNullException.ThrowIfNull() in [ValueObjectName] constructor without failing test.

CORRECTIVE ACTION:
1. Removing ArgumentNullException.ThrowIfNull() from constructor...
2. Removing parameter validation not demanded by test...
3. Running test to verify it still passes...

Remember: Value objects should be simple data containers. Add validation only when test fails without it.
```

### Direct Domain Object Testing Violation
```
❌ VIOLATION DETECTED: Direct Domain Object Testing
You are testing [Aggregate/Entity/ValueObject] directly instead of through a Use Case.

CORRECTIVE ACTION:
1. Creating a Use Case (Application Service) as the SUT...
2. Adding fake repository for the aggregate...
3. Rewriting test to call UseCase.Handle(command) instead of aggregate methods...
4. Letting aggregate behavior emerge through the use case...

Remember: Outside-In TDD — start from the Use Case, let domain objects emerge as collaborators.
```

### Dependency Inversion Principle (DIP) Violation
```
❌ VIOLATION DETECTED: Dependency Inversion Principle Broken
Domain layer [ClassName] depends on infrastructure [InfrastructureClass/Package].

SPECIFIC VIOLATION:
[Detected pattern: Domain importing adapters/Framework annotation in domain/Use case importing infrastructure]

CORRECTIVE ACTION:
1. Analyzing dependency direction...
2. Creating abstraction in domain ports...
3. Moving concrete implementation to adapters layer...
4. Removing infrastructure imports from domain...

Remember: Dependencies MUST point inward. Domain owns abstractions, adapters implement them.
```

### Technical Expectations Violation
```
❌ VIOLATION DETECTED: Technical Expectations Ignored
You used [default pattern] when user specified [expectation].

USER EXPECTATION:
"[stored technical expectation]"

CORRECTIVE ACTION:
1. Reviewing stored technical expectations...
2. Applying user-specified [pattern/approach/style]...
3. Overriding default implementation...
4. Maintaining TDD discipline with user preferences...

Remember: User technical expectations override default patterns.
```

## 🎓 Enforcement Priority

1. **HIGHEST:** Wishful thinking - Test MUST be written first
2. **HIGHEST:** DIP violations - Domain CANNOT depend on infrastructure
3. **HIGH:** Technical expectations - User preferences OVERRIDE defaults
4. **HIGH:** User gates - CANNOT proceed without user input
5. **HIGH:** No defensive code - ONLY add when test requires
6. **MEDIUM:** State machine flow - Follow defined states
7. **LOW:** Naming conventions - Can be fixed in refactoring

## 📋 Enforcement Checklist

Before any implementation:
- [ ] COMPLETE test written FIRST using wishful thinking (all Given-When-Then in one pass)
- [ ] Test calls non-existent methods/classes
- [ ] No interleaving — test file is NOT edited after any production file in the same RED phase
- [ ] User explicitly selected what to implement
- [ ] Technical expectations captured and stored (if provided)
- [ ] User preferences applied throughout implementation
- [ ] Core tests target Use Cases, NOT aggregates/entities/value objects directly
- [ ] No defensive code added without test
- [ ] Domain layer has ZERO infrastructure dependencies
- [ ] Dependencies point inward only (DIP compliance)
- [ ] State machine being followed exactly
- [ ] Violations being auto-corrected

## 🔍 Audit Trail

**Every violation should log:**
```
[TIMESTAMP] VIOLATION: [Type]
Command: [/tdd-core, /tdd-adapters, etc.]
State: [Current state in workflow]
Detection: [What triggered violation]
Correction: [Action taken]
```

## Remember

**The goal is ENFORCEMENT, not suggestion:**
- Violations trigger IMMEDIATE correction
- User gates are MANDATORY stops
- Wishful thinking is NON-NEGOTIABLE
- Defensive code is FORBIDDEN without tests
- State machines MUST be followed

Every directive in skills and commands is MANDATORY and will be ENFORCED.