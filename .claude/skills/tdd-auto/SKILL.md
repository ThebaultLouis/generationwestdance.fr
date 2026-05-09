---
name: tdd-auto
description: Use when the user wants autonomous TDD execution from an existing TPP-ordered analysis plan, following strict RED-GREEN discipline and updating the TDD plan status as tests turn green.
---

# TDD Auto

Use this skill when the analysis artifact already exists and the next step is implementation through autonomous TDD cycles.

## Purpose

Execute a pre-analyzed TDD plan through RED -> GREEN while preserving the repo's TDD workflow rules.

## Preferred execution

Delegate to the local `tdd-auto` agent defined in:

- `.claude/agents/tdd-auto.md`

Inputs should include:

- the active requirement or roadmap item
- the path to `{BC-root}/docs/tdd.md` or `{BC-root}/docs/tdd-iteration-XX.md`

## Required behavior

- start from the existing analysis plan rather than re-analyzing
- write the full failing test before production code
- progress one test at a time
- update plan statuses to `✅ GREEN`
- stop at cycle completion

## Handoff

After each cycle completes, summarize progression and stop for user confirmation before continuing to the next roadmap item or requirement.

## Repo references

- `.claude/agents/tdd-auto.md`
- `.claude/commands/tdd-auto.md`
- `docs/tdd-orchestration.md`
