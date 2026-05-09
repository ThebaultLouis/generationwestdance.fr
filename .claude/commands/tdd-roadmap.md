---
description: Generate a TDD roadmap by crossing existing code state with BDD scenarios
---

# /tdd-roadmap — Generate TDD Roadmap

Generates `docs/tdd-roadmap.md` for a Bounded Context or Plugin by inspecting the current code state and crossing it with the BDD specification.

**Arguments:** `$ARGUMENTS`

## Argument parsing

```
/tdd-roadmap PluginLifecycle
/tdd-roadmap Letstream.Plugins.Pomodoro
```

- If the argument starts with `Letstream.Plugins.`, the BC is under `src/Plugins/{PluginName}/`
- Otherwise, the BC is under `src/{BCName}/`

If no argument is provided, ask the user which BC to analyze.

## Phase 1 — Locate the BC

Resolve the root folder:
- `src/Plugins/{PluginName}/` for plugins
- `src/{BCName}/` for first-party BCs

Verify the folder exists. If not, abort with a clear message.

## Phase 2 — Inspect existing code state

For each of the 5 layers, check what exists:

### BusinessLogic
- List all `UseCases/*/` folders → these are the implemented use cases
- List all files in `BusinessLogicTest/` → these are the covered scenarios
- List all files in `BusinessLogic/Ports/` → note which ports are defined

### SecondaryAdapters
- Check if any `.cs` source files exist (excluding `obj/`)
- If empty → "not started"
- If non-empty → list what's implemented

### Api
- Check the controller(s) for defined endpoints (`[HttpGet]`, `[HttpPost]`, etc.)
- If no endpoints beyond the default → "not started"

### SecondaryAdaptersTest
- Check if any `.cs` source files exist (excluding `obj/`)
- If empty → "not started"

### Host.ApiTest
- Check `src/Letstream.Host.ApiTest/` for any test files referencing this BC
- If none → "not started"

## Phase 3 — Read BDD specification

Look for `docs/bdd*.md` (or `docs/bdd.md`) in the BC folder.

If found:
- Extract all rules (`### Règle métier N` or `### Règle N`)
- Extract all scenarios and their rule mapping
- Cross-reference with what's covered by existing tests (infer from test method names and Given/When/Then helpers)

If not found: generate the roadmap based on code inspection only, noting "no BDD spec found".

## Phase 4 — Generate docs/tdd-roadmap.md

Create `{BC-root}/docs/tdd-roadmap.md` using the following structure:

```markdown
# {BC Name} — TDD Roadmap

## Status

| Rule | Description | Layer | Status |
|------|-------------|-------|--------|
| R1   | ...         | BusinessLogic | ✅ Done / ⏳ Pending |
...

---

## BDD coverage

| Scénario BDD | Rule | Status |
|---|---|---|
| N.M — description | RX | ✅ / ⏳ (note partial coverage if needed) |
...

---

## Priority tiers

### Tier 1 — Done
...

### Tier 2 — {Next logical group}
...

(add as many tiers as needed, ordered by dependency)

---

## Implementation order

\`\`\`
RX → RY + RZ → ...
\`\`\`
```

### Rules for status inference

- A use case folder exists AND corresponding test file exists AND test covers happy path + error cases → **✅ Done**
- A use case folder exists but test coverage is partial (e.g., missing event emission assertions) → **⚠️ Partial** (note what's missing)
- Feature documented in BDD but no use case folder → **⏳ Pending**
- SecondaryAdapters non-empty → **✅ Done**, else **⏳ Pending**
- SecondaryAdaptersTest non-empty → **✅ Done**, else **⏳ Pending**
- Host.ApiTest references exist → **✅ Done**, else **⏳ Pending**

### Tier assignment rules

1. **Tier "Done"** — everything already implemented and tested
2. **BusinessLogic tier** — missing ports, use case logic, or unit test coverage
3. **Api tier** — missing HTTP endpoints
4. **SecondaryAdapters tier** — EF Core repositories, external adapters (event publishers, etc.)
5. **SecondaryAdaptersTest tier** — integration tests (Testcontainers)
6. **E2E tier** — Host.ApiTest black-box tests

Cross-BC rules (policies reacting to events from another BC) always go in the last tier, after all intra-BC rules are done.

## Output

Print a brief summary of what was found, then confirm the file was written:

```
Analyzed: src/{path}/
BDD spec: {found / not found}
Use cases: {N implemented}
SecondaryAdapters: {empty / N files}
SecondaryAdaptersTest: {empty / N files}
Host.ApiTest: {no coverage / N tests found}

→ docs/tdd-roadmap.md written ({N rules, M pending}
```
