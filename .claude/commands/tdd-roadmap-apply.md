---
description: Apply a TDD roadmap in order, processing one pending rule at a time with tdd-analyze + tdd-auto, pausing for user confirmation between rules
---

# /tdd-roadmap-apply — Apply TDD Roadmap

Reads a TDD roadmap, finds the next pending rule, runs `tdd-analyze` then `tdd-auto` for it, updates the roadmap status, and pauses for user confirmation before continuing.

**Arguments:** `$ARGUMENTS`

## Argument parsing

```
/tdd-roadmap-apply PluginLifecycle
/tdd-roadmap-apply Letstream.Plugins.Pomodoro
/tdd-roadmap-apply src/PluginLifecycle/docs/tdd-roadmap.md   # direct path
```

- If argument is a `.md` file path → use it directly
- If argument starts with `Letstream.Plugins.` → roadmap is at `src/Plugins/{PluginName}/docs/tdd-roadmap.md`
- Otherwise → roadmap is at `src/{BCName}/docs/tdd-roadmap.md`

If no argument is provided, ask the user which BC or roadmap file to use.

## Phase 1 — Read the roadmap

Load the roadmap file. Extract:
- All rules with their status (✅ Done / ⏳ Pending / ⚠️ Partial)
- The implementation order (the `## Implementation order` section)
- The tier definitions (the `## Priority tiers` section, each `### Tier N` block)

Parse the implementation order to determine the sequence (e.g. `R4 → R5 + R6 → R7 → R8 → R9`).

## Phase 2 — Find the next pending rule(s)

Follow the implementation order. Skip rules already marked ✅ Done.

The next item to process is:
- The first group in the implementation order that contains at least one ⏳ Pending or ⚠️ Partial rule
- If rules are grouped with `+` (e.g. `R5 + R6`), treat the group as a single batch

Show the user what will be processed:

```
📍 Next: R4 — Activation émet `PluginActivé` (BusinessLogic)
   Tier 2 — Event emission
   Status: ⏳ Pending

Proceeding with tdd-analyze...
```

## Phase 3 — tdd-analyze

Use the `tdd-analyze` agent to produce a test plan for the rule(s) in scope.

Provide the agent with:
- The rule description from the Tier section (full bullet points)
- The BC root folder path
- The existing code context (fakes, models, ports, use cases already in place)

The agent writes its output to `docs/tdd-iteration-{NN}.md` (or `docs/tdd.md` for the first analysis).

## Phase 3b — Pause after tdd-analyze

After `tdd-analyze` completes, show the test plan summary and ask the user to confirm before running `tdd-auto`:

```
📋 Test plan ready — docs/tdd-iteration-{NN}.md

{N} tests planned:
  [list of tests from the plan]

Proceed with tdd-auto? (yes / no / edit)
```

- `yes` → continue to Phase 4
- `no` → stop; user can edit the plan manually and re-run `/tdd-roadmap-apply`
- `edit` → open the plan file for the user to review, then wait for `yes` / `no`

**Do not start `tdd-auto` without explicit `yes`.**

## Phase 4 — tdd-auto

Use the `tdd-auto` agent to implement the test plan produced in Phase 3.

Provide the agent with:
- The test plan file path
- The BC root folder
- Any context from the roadmap tier description

The agent works autonomously through RED → GREEN cycles for each test.

## Phase 5 — Update roadmap status

After `tdd-auto` completes, update the roadmap file:
- Mark processed rules as ✅ Done
- Update the BDD coverage table accordingly
- Update the Status table at the top

## Phase 6 — Pause and ask to continue

```
✅ R4 done — Activation émet `PluginActivé`

Roadmap status:
  R4  ✅  Activation émet PluginActivé (BusinessLogic)
  R5  ⏳  POST /plugins/{slug}/activate (Api)
  R6  ⏳  POST /plugins/{slug}/deactivate (Api)
  R7  ⏳  PluginRepository EF Core (SecondaryAdapters)
  R8  ⏳  Tests d'intégration Testcontainers (SecondaryAdaptersTest)
  R9  ⏳  E2E activate / deactivate / seed (Host.ApiTest)

Next: R5 + R6 — HTTP API endpoints

Continue? (yes / no / skip)
```

- `yes` → loop back to Phase 2 with the next pending group
- `no` → stop, summarize overall progress
- `skip` → mark current rule as skipped and move to the next

## Phase 7 — Completion

When all rules are ✅ Done:

```
🎉 Roadmap complete!

All rules implemented:
  R1 ✅  R2 ✅  R3 ✅  R4 ✅  R5 ✅  R6 ✅  R7 ✅  R8 ✅  R9 ✅

Run full test suite to verify:
  dotnet test src/Letstream.sln --filter "FullyQualifiedName~PluginLifecycle"
```

## Notes

- Each tdd-analyze run produces a numbered iteration file (`tdd-iteration-NN.md`) to preserve history
- The roadmap file is the single source of truth for status; always update it after each rule
- If `tdd-auto` pauses with CYCLE_COMPLETE, relay its output to the user before continuing
- Tier 4 (SecondaryAdapters) and Tier 5 (E2E) rules may require real infrastructure — warn the user
