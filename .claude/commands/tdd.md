---
description: TDD workflow (migrated to tdd agent)
---

# /tdd -> TDD Agent

The TDD workflow has been migrated to the **`tdd` custom agent** for stronger identity and enforcement.

## How to use

The `tdd` agent is automatically delegated by Claude when you describe a feature requirement. You can also explicitly invoke it:

```
"use the tdd agent to implement: trainee should receive certificate after completing training"
"use the tdd agent for: e2e: expose training session creation via REST API"
"use the tdd agent for: integration: training repository should persist to PostgreSQL"
```

## Test type prefixes

| Prefix | Test Type |
|--------|-----------|
| (none) | Unit test (default) |
| `unit:` | Unit test (explicit) |
| `e2e:` | E2E test |
| `integration:` | Integration test |

The agent auto-detects test type from keywords. Use prefixes to override.
