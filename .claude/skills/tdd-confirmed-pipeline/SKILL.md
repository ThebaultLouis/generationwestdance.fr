---
name: tdd-confirmed-pipeline
description: Use when the user wants the repo TDD workflow to follow the sequence tdd-roadmap, then tdd-roadmap-apply, then tdd-analyze, then tdd-auto, either with explicit confirmations or with an explicit opt-in bypass mode.
---

# TDD Confirmed Pipeline

Use this skill when the user asks to follow the repo's Claude-style TDD workflow but wants confirmation gates on every major step.
It also applies when the user wants the same workflow with an explicit bypass option.

## Canonical invocation

Treat this as the default prompt shape for the workflow:

```text
Use the tdd-confirmed-pipeline agent for: {BC or plugin}.
Execution mode: confirmed | bypass.
Always follow:
tdd-roadmap -> confirm -> tdd-roadmap-apply -> tdd-analyze -> confirm -> tdd-auto.
Use docs artifacts as the source of truth.
Never auto-resume past a worker pause block unless execution mode is bypass.
```

If the user request is less explicit but clearly asks for the gated TDD flow, apply this invocation context automatically.

## Required sequence

Always follow this order:

1. `tdd-roadmap`
2. Ask for user confirmation before continuing
3. `tdd-roadmap-apply`
4. `tdd-analyze`
5. Ask for user confirmation before continuing
6. `tdd-auto`

Do not skip or reorder these steps unless the user explicitly asks to do so.

## Confirmation policy

In `confirmed` mode, explicit user confirmation is mandatory:

- after the roadmap is generated
- after each generated TDD analysis plan
- before starting `tdd-auto`
- after each `tdd-auto` cycle completes, before moving to the next requirement or roadmap item

Accept only a clear affirmative answer such as `yes`, `ok`, `continue`, or an equivalent explicit instruction.

If the user asks for edits, stop at the current artifact, let them adjust it, and resume only after a new explicit confirmation.

If the user says `no`, stop and summarize the current state without advancing the workflow.

In `bypass` mode:

- require an explicit opt-in such as `bypass confirmations for this run`
- preserve the same stage order
- allow the orchestrator to auto-resume through worker pause blocks
- stop if a blocker, ambiguity, or contradiction appears
- stop if the user revokes bypass

## Execution rules

- Treat `docs/tdd-roadmap.md` as the planning source of truth for implementation order.
- Preserve `docs/tdd-iteration-XX.md` history produced by analysis steps.
- Treat `docs/tdd-orchestration.md` as the orchestration contract for entrypoint, artifacts, and resume behavior.
- Never start `tdd-auto` directly from a vague feature request. A concrete TDD analysis artifact must exist first.
- Never collapse planning, analysis, and implementation into one opaque step. Keep stage boundaries visible in summaries and artifacts.
- When a step has already been completed and its artifact exists, reuse it instead of regenerating it unless the user asks for a refresh.
- Preserve worker pause blocks and route control back through the orchestrator instead of silently resuming the worker, unless `bypass` mode was explicitly enabled for the run.

## Recommended operator script

Use this conversational pattern:

1. Generate or refresh the roadmap.
2. Show the next pending rule or batch from the roadmap.
3. Ask the user whether to apply that roadmap item.
4. Generate the TDD analysis artifact for that item.
5. Summarize the planned tests.
6. Ask the user whether to start implementation.
7. Run `tdd-auto`.
8. After cycle completion, summarize progress and ask whether to continue with the next roadmap item.

In `bypass` mode, steps 3, 6, and 8 may be auto-advanced by the orchestrator after the user explicitly authorizes bypass for the run.

## Artifacts to maintain

- `{BC-root}/docs/tdd-roadmap.md`
- `{BC-root}/docs/tdd.md` or `{BC-root}/docs/tdd-iteration-XX.md`

## Repo references

Follow the existing local workflow definitions:

- `docs/tdd-orchestration.md`
- `.claude/commands/tdd-roadmap.md`
- `.claude/commands/tdd-roadmap-apply.md`
- `.claude/commands/tdd-analyze.md`
- `.claude/commands/tdd-auto.md`
- `.claude/agents/tdd-roadmap.md`
- `.claude/agents/tdd-roadmap-apply.md`
- `.claude/agents/tdd-analyze.md`
- `.claude/agents/tdd-auto.md`
- `.claude/agents/tdd-confirmed-pipeline.md`
- `.claude/skills/tdd-workflow-engine/SKILL.md`

## Trigger examples

This skill should trigger for requests like:

- "Use the full TDD roadmap flow but always ask me before continuing"
- "Follow tdd-roadmap, then apply it step by step with confirmation"
- "I want Claude's TDD pattern, but gated"
- "Always confirm before tdd-auto"

## Default assumption

If the user asks for this workflow without naming a bounded context or plugin, first identify the target from the request or ask one concise clarification question. Do not begin roadmap generation until the target is known.
