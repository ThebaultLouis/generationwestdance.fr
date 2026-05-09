---
name: vue-project-guidelines
description: Best practices for building or refactoring a Vue 3 + Vite + TypeScript project with thin components, composables, ports/adapters, Pinia vs Vue Query decision rules, and a Vitest testing strategy.
---

# Skill: Vue Project Guidelines

Use this skill when creating, refactoring, reviewing, or structuring a Vue project.

## Default target stack

- `Vue 3`
- `Vite`
- `TypeScript`
- `Vitest`

Optional when there is a real need:
- `Pinia` for shared client-side state
- `@tanstack/vue-query` for server state with caching, invalidation, and retry behavior

## Architectural goal

Avoid two failure modes:
- a project where everything lives in `App.vue`
- over-architecture copied from React/Redux without a real need

The goal is:
- thin presentation components
- screen orchestration in composables
- testable logic in TypeScript command handlers
- runtime dependencies behind ports/adapters

## Recommended architecture

Preferred structure for a non-trivial app:

```text
src/
├── BusinessLogic/
│   ├── Models/
│   ├── Ports/
│   └── UseCases/
│       └── {UseCase}/
│           ├── {UseCase}Command.ts
│           └── {UseCase}CommandHandler.ts
├── SecondaryAdapters/
├── Presentation/
│   ├── components/
│   ├── composables/
│   └── views/
├── App.vue
├── main.ts
└── style.css
```

Responsibility split:
- `BusinessLogic`: testable application logic, independent from Vue
- `Ports`: contracts toward external dependencies
- `SecondaryAdapters`: `fetch`, `EventSource`, `Date.now()`, `window`, `localStorage`, Tauri, etc.
- `Presentation`: Vue components, reactive state, lifecycle

## Use case convention

When this skill is applied, prefer the same naming convention as the C# codebase:
- one folder per use case
- always a `*Command.ts`
- always a `*CommandHandler.ts`

Examples:
- `LoadPomodoroSession/LoadPomodoroSessionCommand.ts`
- `LoadPomodoroSession/LoadPomodoroSessionCommandHandler.ts`
- `BuildPomodoroRingState/BuildPomodoroRingStateCommand.ts`
- `BuildPomodoroRingState/BuildPomodoroRingStateCommandHandler.ts`

This rule also applies to pure computations if the project chooses full architectural symmetry.

Meaning in Vue:
- `Command`: typed input for an action or calculation
- `CommandHandler`: orchestration or pure deterministic transformation

Even when a handler is simple, prefer consistency over mixed conventions if the project has chosen this style.

Concrete example inspired by the Pomodoro plugin:

```text
src/
├── BusinessLogic/
│   ├── Models/
│   │   ├── PomodoroConfiguration.ts
│   │   ├── PomodoroSessionSnapshot.ts
│   │   └── PomodoroRingState.ts
│   ├── Ports/
│   │   ├── IPomodoroConfigurationRepository.ts
│   │   ├── IPomodoroSessionRepository.ts
│   │   ├── IPomodoroSessionEventSource.ts
│   │   └── IClock.ts
│   └── UseCases/
│       ├── LoadPomodoroSession/
│       │   ├── LoadPomodoroSessionCommand.ts
│       │   └── LoadPomodoroSessionCommandHandler.ts
│       ├── SubscribePomodoroSession/
│       │   ├── SubscribePomodoroSessionCommand.ts
│       │   └── SubscribePomodoroSessionCommandHandler.ts
│       ├── ComputePomodoroTimeLeft/
│       │   ├── ComputePomodoroTimeLeftCommand.ts
│       │   └── ComputePomodoroTimeLeftCommandHandler.ts
│       └── BuildPomodoroRingState/
│           ├── BuildPomodoroRingStateCommand.ts
│           └── BuildPomodoroRingStateCommandHandler.ts
├── SecondaryAdapters/
│   ├── Http/
│   │   └── PomodoroHttpRepository.ts
│   ├── Sse/
│   │   └── PomodoroSessionEventSource.ts
│   └── Time/
│       └── BrowserClock.ts
├── Presentation/
│   ├── components/
│   ├── composables/
│   │   ├── PomodoroScreenDependencies.ts
│   │   └── usePomodoroScreen.ts
│   └── views/
├── App.vue
├── main.ts
└── style.css
```

## Decision rules

### Composable vs Pinia

Use a composable when:
- the state is local to one screen
- orchestration depends on the Vue lifecycle
- no other view needs the same reactive instance

Use `Pinia` when:
- multiple views share the same state
- the state must survive navigation
- multiple distant components coordinate around the same source of truth

Do not add `Pinia` just to imitate Redux.

### Vue Query vs simple repository

Use `Vue Query` when:
- the data comes from the server and is read frequently
- cache, stale time, retry, and invalidation provide real value
- multiple screens consume the same remote resource

Do not use `Vue Query` when:
- the flow is driven by SSE/WebSocket
- the state is highly local and sequential
- a repository + use case + composable is simpler

### What should not live in a Vue component

- `fetch`
- `EventSource`
- `WebSocket`
- `Date.now()`
- `window.location`
- non-trivial business logic

Components should consume a composable or props.

## Dependency inversion in Vue

Expected approach:
- `Presentation` calls command handlers
- command handlers depend on `Ports`
- `SecondaryAdapters` implement the ports
- dependencies are assembled at the composable entry point or via a small factory

Prefer:
- a `createXDependencies()` factory
- injectable dependencies passed into the composable

Recommended pattern:

```ts
export interface PomodoroScreenDependencies {
  configurationRepository: IPomodoroConfigurationRepository
  sessionRepository: IPomodoroSessionRepository
  sessionEventSource: IPomodoroSessionEventSource
  clock: IClock
  appOrigin: string
}

export function createPomodoroScreenDependencies(): PomodoroScreenDependencies {
  const httpRepository = new PomodoroHttpRepository()

  return {
    configurationRepository: httpRepository,
    sessionRepository: httpRepository,
    sessionEventSource: new PomodoroSessionEventSource(),
    clock: new BrowserClock(),
    appOrigin: window.location.origin,
  }
}
```

Avoid:
- implicit module-level singletons when they make testing harder

## Component conventions

- `App.vue` doit rester thin
- les vues doivent être majoritairement déclaratives
- un composant de présentation reçoit des props et émet des événements
- un composant ne possède pas la logique d'appel réseau
 - `App.vue` should stay thin
 - views should be mostly declarative
 - a presentation component receives props and emits events
 - a component should not own network-call logic

If a file mixes rendering, network calls, timers, snapshot mapping, and business rules, split it.

## Composable conventions

A screen composable may own:
- `ref`, `computed`, `watch`
- `onMounted`, `onUnmounted`
- orchestration between command handlers
- mapping into UI-facing state

But it should not become a god object.

When the composable grows, extract:
- pure logic into `UseCases/*CommandHandler.ts`
- types into `Models`
- runtime concerns into `SecondaryAdapters`

The composable should call handlers, not raw adapters:
- good: `loadPomodoroSessionCommandHandler.handle({})`
- avoid: `fetch('/plugins/pomodoro/session')` inside the composable

## Testing strategy

Priority order:

1. unit tests for pure command handlers
2. adapter tests with mocked boundaries
3. composable tests
4. component tests

Most of the suite should live below the DOM layer.

Prioritize tests for:
- derived calculations
- state transitions
- snapshot mapping
- start/pause/resume/stop rules
- composable orchestration

Do not test everything through `App.vue`.

## TypeScript constraints

If the project uses `erasableSyntaxOnly: true`, avoid TS syntax that cannot be erased cleanly.

In particular, do not use parameter properties in constructors:

```ts
// Avoid
constructor(private readonly repository: IRepository) {}
```

Prefer explicit fields:

```ts
export class Handler {
  private readonly repository: IRepository

  constructor(repository: IRepository) {
    this.repository = repository
  }
}
```

## Test structure: Given / When / Then

Vue tests should follow the same intent as the C# tests:
- `Given`: prepare the state, fakes, dependencies, clock, or mounted subject
- `When`: execute the action under test
- `Then`: assert the outcome

This applies to:
- command handler tests
- adapter tests
- composable tests
- component tests

Prefer helper functions named `given*`, `when*`, and `then*` when a test starts growing.

Example for a use case test:

```ts
it('should reset to idle state when the snapshot is inactive', () => {
  const command = givenApplyInactiveSnapshotCommand()

  const result = whenHandlingCommand(command)

  thenIdleStateIsReturned(result)
})
```

Example for a composable test:

```ts
it('should stop the ticker when the session becomes paused', async () => {
  const { screen, eventSource, clock } = await givenMountedPomodoroScreen()

  await whenPausedSnapshotIsReceived(eventSource)
  await whenTimeAdvances(clock, 5000)

  thenTickerIsStopped(screen)
})
```

Keep tests readable:
- no large inline setup blocks when helpers would clarify intent
- no mixed setup/action/assertion ordering
- one behavioral expectation per test unless two assertions describe the same outcome

## Review checklist

- Is `App.vue` thin?
- Are components presentation-only?
- Are network calls behind adapters?
- Is business logic testable through command handlers without mounting Vue?
- Is `Pinia` actually justified?
- Is `Vue Query` actually justified?
- Are runtime dependencies explicit?
- Do tests cover command handlers and composables first?
- Do tests follow a clear `Given / When / Then` structure?

## Anti-patterns

- adding a global store when a composable is enough
- copying Redux patterns into Vue without a real need
- hiding business logic inside untested `computed` chains
- leaving `fetch` and `EventSource` inside components
- writing most tests at component level
- mixing server state, UI state, and live state without clear separation
- mixing setup, action, and assertions chaotically inside the same test body

## Expected outcome

A good Vue project should produce:
- readable components
- clear screen composables
- testable application logic in `CommandHandler`s
- a clean boundary between Vue and runtime infrastructure
