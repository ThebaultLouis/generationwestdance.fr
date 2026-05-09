---
name: tdd-roadmap
description: Use when the user wants to generate or refresh a TDD roadmap for a bounded context or plugin by crossing the current code state with its BDD specification, before implementation begins.
---

# TDD Roadmap

Use this skill when the user wants a roadmap artifact before implementation.

## Purpose

Generate or refresh `{BC-root}/docs/tdd-roadmap.md` by inspecting:

- the current code structure
- existing tests
- the BDD specification when present

## Preferred execution

Delegate to the local `tdd-roadmap` agent defined in:

- `.claude/agents/tdd-roadmap.md`

Inputs can be:

- a bounded context name such as `PluginLifecycle`
- a plugin namespace such as `Letstream.Plugins.LoyaltyCard`
- a direct BC path

## Required output

Write or refresh:

- `{BC-root}/docs/tdd-roadmap.md`

The roadmap should include:

- rule status
- BDD coverage
- priority tiers
- implementation order

## Handoff

After roadmap generation, stop and ask the user to confirm before moving to roadmap application.

## Repo references

- `.claude/agents/tdd-roadmap.md`
- `.claude/commands/tdd-roadmap.md`
- `docs/tdd-orchestration.md`
