# Research: Pet Browsing

## Decision: API base path is `/tayag/api/v1`

**Rationale**: The user explicitly requested the surname `tayag` in the backend
API path. Versioning with `/v1` keeps the first browsing API stable for future
features.

**Alternatives considered**:

- `/api/v1`: Rejected because it omits the requested surname.
- `/tayag/v1/api`: Rejected because `/tayag/api/v1` is clearer and matches the
  user wording.

## Decision: Use `com.tayag.petstore` as compile-safe Java base package

**Rationale**: The user requested `com.tayag.package`, but `package` is a Java
reserved keyword and cannot be used as a package segment. `com.tayag.petstore`
preserves the surname and product identity while compiling normally.

**Alternatives considered**:

- `com.tayag.package`: Rejected as invalid Java.
- `com.tayag.pkg`: Considered compile-safe but less descriptive.
- `com.tayag.petstore`: Selected pending owner approval.

## Decision: Organize backend by endpoint area

**Rationale**: The user requested organization by endpoints. For this feature,
all browsing-specific controller, service, repository, DTO, entity, enum, and
test classes live under `endpoints.browsing`.

**Alternatives considered**:

- Layered global packages such as `controllers`, `services`, `repositories`:
  Rejected because it conflicts with the endpoint-oriented request.

## Decision: Read-only Spring Boot API with PostgreSQL

**Rationale**: Pet browsing needs persisted catalog data and availability
states but no write behavior in this feature. Spring Data JPA and Flyway keep
the read model simple and Render-compatible.

**Alternatives considered**:

- In-memory data only: Rejected because the constitution requires PostgreSQL as
  system of record.
- Add admin inventory writes now: Rejected because this feature is browsing
  only.

## Decision: No user-selectable sorting

**Rationale**: The user explicitly said "No sorting." The backend may return a
stable default order for consistent display, but the API and UI will not expose
sort parameters or sorting controls.

**Alternatives considered**:

- Sort by category, price, or newest: Rejected as out of scope.

## Decision: OpenAPI contract for backend endpoints

**Rationale**: The feature exposes HTTP interfaces consumed by the frontend.
OpenAPI documents request paths, query parameters, response fields, and error
states clearly for planning and implementation.

**Alternatives considered**:

- Informal endpoint notes only: Rejected because contract tests and frontend
  integration benefit from a precise schema.
