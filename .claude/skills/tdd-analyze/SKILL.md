---
name: tdd-analyze
description: Use when the user wants a business requirement turned into a TPP-ordered, FLFI-labeled TDD plan before any implementation starts, written to docs/tdd.md or docs/tdd-iteration-XX.md.
---

# TDD Analyze

Use this skill when the next step is to analyze a requirement into an executable TDD plan.

## Purpose

Produce a structured test list that:

- uses FLFI test names
- follows TPP ordering
- explains the contradiction each test introduces
- captures repo-specific design notes and reusable fakes
- preserves readable `Given` / `When` / `Then` test structure, with assertions grouped in `Then...` helpers when the assertion block is non-trivial

## Preferred execution

Delegate to the local `tdd-analyze` agent defined in:

- `.claude/agents/tdd-analyze.md`

Inputs can be:

- a business requirement
- a roadmap item selected from `docs/tdd-roadmap.md`
- a requirement with an explicit test type prefix such as `unit:`, `e2e:`, or `integration:`

## Required output

Write one of:

- `{BC-root}/docs/tdd.md`
- `{BC-root}/docs/tdd-iteration-XX.md`

## Handoff

After the analysis is written, summarize the planned tests and stop for user confirmation before starting `tdd-auto`.

When the planned test shape includes several assertions, call that out in the design notes so the implementation uses explicit `Then...` helper methods instead of leaving long raw assertion blocks inline.

## Repo references

- `.claude/agents/tdd-analyze.md`
- `.claude/commands/tdd-analyze.md`
- `docs/tdd-orchestration.md`
