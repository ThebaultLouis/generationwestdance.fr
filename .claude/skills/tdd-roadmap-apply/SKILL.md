---
name: tdd-roadmap-apply
description: Use when the user wants to execute a TDD roadmap incrementally by selecting the next pending roadmap item, handing it to analysis, updating roadmap status, and pausing between completed items unless bypass mode is active.
---

# TDD Roadmap Apply

Use this skill when the user wants to apply an existing roadmap step by step.

## Purpose

Read an existing roadmap and advance one pending rule or rule batch at a time.

## Preferred execution

Delegate to the local `tdd-roadmap-apply` agent defined in:

- `.claude/agents/tdd-roadmap-apply.md`

Inputs can be:

- a bounded context name such as `PluginLifecycle`
- a plugin namespace such as `Letstream.Plugins.LoyaltyCard`
- a direct roadmap path

## Required behavior

- read `docs/tdd-roadmap.md`
- find the next `⏳ Pending` or `⚠️ Partial` item in implementation order
- present that item to the user
- hand the selected item directly to `tdd-analyze`
- update the roadmap only after successful implementation
- pause between completed roadmap items unless the orchestrator is running in explicit `bypass` mode

## Handoff

This skill does not replace `tdd-analyze` or `tdd-auto`.
It prepares and sequences their work through the roadmap.

## Repo references

- `.claude/agents/tdd-roadmap-apply.md`
- `.claude/commands/tdd-roadmap-apply.md`
- `docs/tdd-orchestration.md`
