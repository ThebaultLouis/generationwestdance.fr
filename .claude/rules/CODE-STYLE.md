# Code Style Rules

## Naming Conventions

### Domain Objects
- **Aggregates**: Noun (Order, Customer, Subscription)
- **Value Objects**: Descriptive noun (Money, EmailAddress, OrderId)
- **Domain Services**: Verb phrase or policy (PricingPolicy, InventoryChecker)
- **Domain Events**: Past tense (OrderPlaced, PaymentReceived)

### Application Layer
- **Use Cases**: Imperative verb (PlaceOrder, CancelSubscription)
- **Commands**: Action + "Command" (CreateOrderCommand)
- **Queries**: Query + "Query" (GetOrderByIdQuery)

### Tests
- **Test methods**: should_[expected]_when_[condition]
- **Test classes**: [ClassUnderTest]Test

## Test Body Structure (Mandatory)

Every `[Fact]` body must consist **only** of calls to private helper methods — no inline assertions or inline setup:

```csharp
[Fact]
public void should_reject_start_when_a_session_is_already_active()
{
    GivenActiveSession();
    var result = WhenStartingSession();
    ThenResultIsFailure<SessionDejaActive>(result);
}
```

- `Given*(…)` — seeds state; returns void
- `When*(…)` — calls the SUT; returns the result
- `Then*(…)` — all assertions; returns void
- Constructor wires collaborators only — no seeding

Applies to all test layers (unit, integration, E2E).

## C# Principles

### Null Safety
- **NEVER** use null where avoidable
- Use nullable reference types (`T?`) for maybe-present values
- Enable nullable context (`<Nullable>enable</Nullable>`) project-wide
- Validate in constructors with `ArgumentNullException.ThrowIfNull()`, only when a test proves necessity

### Immutability
- Immutable by default
- Use `record` or `record struct` for value objects
- Collections are immutable (`IReadOnlyList<T>`, `IReadOnlyCollection<T>`, collection expressions `[]`)
- State changes return new instances

### Visibility
- `internal` by default
- `public` only when crossing project boundaries
- `private` for internal implementation details
- `protected` rarely (only for controlled extension)

### Object Construction
- Constructor validation ensures objects are always valid
- Use static factory methods for complex creation
- Builder pattern only when truly needed

## Code Organization

### Namespace / Folder Structure
- One aggregate per folder/namespace
- Organize by feature, not by layer within bounded context
- Clear boundaries between contexts

### Class Size
- Single Responsibility Principle
- Maximum ~100 lines per class (excluding usings/namespace)
- Extract when cohesion drops

### Method Size
- Maximum 10-15 lines
- Single level of abstraction
- Extract method if you need comments to explain a block

## Domain Specific Rules

### No Anemic Models
- Behavior lives with data
- Rich domain objects with business methods
- No public setters

### Tell, Don't Ask
- Objects do things, they don't expose data
- No getter chains
- Encapsulate decisions

### No Primitive Obsession
- Wrap primitives in value objects
- Type safety over convenience
