---
description: Gated TDD workflow using tdd-roadmap, tdd-roadmap-apply, tdd-analyze, and tdd-auto with mandatory user confirmation before each transition
---

# /tdd-confirmed-pipeline -> TDD Confirmed Pipeline Agent

The gated orchestration workflow now uses the **`tdd-confirmed-pipeline` custom agent**.

## How to use

```text
"use the tdd-confirmed-pipeline agent for: Letstream.Plugins.LoyaltyCard"
"use the tdd-confirmed-pipeline agent for: Letstream.Plugins.Pomodoro"
"use the tdd-confirmed-pipeline agent for: PluginLifecycle"
```

## Goal

Run the repo TDD pipeline in this strict order:

1. `tdd-roadmap`
2. `tdd-roadmap-apply`
3. `tdd-analyze`
4. `tdd-auto`

But always pause for explicit user confirmation before advancing to the next major step or autonomous execution step.

## How to use

```text
/tdd-confirmed-pipeline Letstream.Plugins.LoyaltyCard
/tdd-confirmed-pipeline Letstream.Plugins.Pomodoro
/tdd-confirmed-pipeline PluginLifecycle
```

## Mandatory confirmation gates

Do not continue without an explicit user yes:

- after generating or refreshing `docs/tdd-roadmap.md`
- before applying the next roadmap item
- after producing each TDD analysis file
- before starting `tdd-auto`
- after each `tdd-auto` cycle completes

If the user asks for edits, stop at the current artifact and wait.

If the user says no, stop and summarize the current state.

## Expected artifacts

- `{BC-root}/docs/tdd-roadmap.md`
- `{BC-root}/docs/tdd.md` or `{BC-root}/docs/tdd-iteration-XX.md`

## Operating rule

Never jump directly from a feature request to `tdd-auto`.
Always require a roadmap artifact and a concrete analysis artifact first.
