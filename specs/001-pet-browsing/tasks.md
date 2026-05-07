# Tasks: Pet Browsing

**Input**: Design documents from `/specs/001-pet-browsing/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/openapi.yaml, quickstart.md

**Tests**: Included because the constitution requires verification for API contracts, validation errors, and critical browsing journeys.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the full-stack project shell and confirm the Java package decision before Java source files are added.

- [x] T001 Resolve the legal Java base package decision in specs/001-pet-browsing/plan.md, replacing or approving `com.tayag.petstore` before creating Java source files
- [x] T002 Create backend Maven project configuration in backend/pom.xml
- [x] T003 [P] Create backend Docker image definition in backend/Dockerfile
- [x] T004 [P] Create frontend package configuration in frontend/package.json
- [x] T005 [P] Create frontend Docker image definition in frontend/Dockerfile
- [x] T006 Create local service orchestration for backend, frontend, and PostgreSQL in docker-compose.yml
- [x] T007 Create Render deployment blueprint for free-tier services in render.yaml

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish backend configuration, frontend app shell, and shared browsing contracts.

- [x] T008 Create Spring Boot application entry point in backend/src/main/java/com/tayag/petstore/PetStoreApplication.java
- [x] T009 Create backend environment and datasource configuration in backend/src/main/resources/application.yml
- [x] T010 Create database migration for pet browsing tables in backend/src/main/resources/db/migration/V1__create_pet_browsing_tables.sql
- [x] T011 Create seed data migration for sample browseable pets in backend/src/main/resources/db/migration/V2__seed_pet_browsing_catalog.sql
- [x] T012 [P] Create browsing category enum in backend/src/main/java/com/tayag/petstore/endpoints/browsing/PetCategory.java
- [x] T013 [P] Create availability enum in backend/src/main/java/com/tayag/petstore/endpoints/browsing/AvailabilityState.java
- [x] T014 Create pet persistence entity in backend/src/main/java/com/tayag/petstore/endpoints/browsing/PetEntity.java
- [x] T015 Create frontend app entry point in frontend/src/main.tsx
- [x] T016 Create frontend application shell in frontend/src/app/App.tsx
- [x] T017 Create shared frontend styles with Tailwind and MUI baseline in frontend/src/styles/index.css
- [x] T018 [P] Create frontend browsing API types in frontend/src/endpoints/browsing/petBrowsingTypes.ts
- [x] T019 [P] Create frontend browsing API client using `/tayag/api/v1` in frontend/src/endpoints/browsing/petBrowsingClient.ts

**Checkpoint**: Foundation ready. User story implementation can begin.

---

## Phase 3: User Story 1 - Browse Available Pets (Priority: P1)

**Goal**: Visitors can open the browsing page and see available pets with summary information.

**Independent Test**: A visitor opens the browsing page and sees available pets, or a clear empty state when none are available.

### Tests for User Story 1

- [x] T020 [P] [US1] Add controller contract test for `GET /tayag/api/v1/pets` in backend/src/test/java/com/tayag/petstore/endpoints/browsing/PetBrowsingControllerTest.java
- [x] T021 [P] [US1] Add repository integration test for returning only available pets in backend/src/test/java/com/tayag/petstore/endpoints/browsing/PetBrowsingRepositoryTest.java
- [x] T022 [P] [US1] Add frontend journey test for initial pet browsing and empty state in tests/e2e/pet-browsing.spec.ts

### Implementation for User Story 1

- [x] T023 [P] [US1] Create pet summary response DTO in backend/src/main/java/com/tayag/petstore/endpoints/browsing/PetSummaryResponse.java
- [x] T024 [US1] Create browsing repository method for available pets in backend/src/main/java/com/tayag/petstore/endpoints/browsing/PetBrowsingRepository.java
- [x] T025 [US1] Create browsing service method for available pet summaries in backend/src/main/java/com/tayag/petstore/endpoints/browsing/PetBrowsingService.java
- [x] T026 [US1] Create `GET /tayag/api/v1/pets` endpoint without sorting parameters in backend/src/main/java/com/tayag/petstore/endpoints/browsing/PetBrowsingController.java
- [x] T027 [P] [US1] Create pet card component with no sorting UI in frontend/src/endpoints/browsing/PetCard.tsx
- [x] T028 [US1] Create pet browsing page for all available pets and empty state in frontend/src/endpoints/browsing/PetBrowsingPage.tsx
- [x] T029 [US1] Wire browsing page route into frontend/src/app/App.tsx

**Checkpoint**: User Story 1 is independently browseable and testable.

---

## Phase 4: User Story 2 - Filter Pets by Category (Priority: P2)

**Goal**: Visitors can filter browsing to one supported pet category and return to all pets.

**Independent Test**: A visitor selects a category, sees only available pets in that category, then returns to all pets.

### Tests for User Story 2

- [x] T030 [P] [US2] Add controller contract test for `GET /tayag/api/v1/pets?category=CAT` in backend/src/test/java/com/tayag/petstore/endpoints/browsing/PetBrowsingControllerTest.java
- [x] T031 [P] [US2] Add controller contract test for `GET /tayag/api/v1/pet-categories` in backend/src/test/java/com/tayag/petstore/endpoints/browsing/PetBrowsingControllerTest.java
- [x] T032 [P] [US2] Add frontend journey test for category filtering and category empty state in tests/e2e/pet-browsing.spec.ts

### Implementation for User Story 2

- [x] T033 [P] [US2] Create category response DTO in backend/src/main/java/com/tayag/petstore/endpoints/browsing/PetCategoryResponse.java
- [x] T034 [US2] Add category-filtered repository method in backend/src/main/java/com/tayag/petstore/endpoints/browsing/PetBrowsingRepository.java
- [x] T035 [US2] Add category filtering and category list service methods in backend/src/main/java/com/tayag/petstore/endpoints/browsing/PetBrowsingService.java
- [x] T036 [US2] Extend controller with category query handling and `GET /tayag/api/v1/pet-categories` in backend/src/main/java/com/tayag/petstore/endpoints/browsing/PetBrowsingController.java
- [x] T037 [P] [US2] Create pet category tabs without sorting controls in frontend/src/endpoints/browsing/PetCategoryTabs.tsx
- [x] T038 [US2] Add category filter state and category empty state to frontend/src/endpoints/browsing/PetBrowsingPage.tsx
- [x] T039 [US2] Extend frontend API client for categories and category filtering in frontend/src/endpoints/browsing/petBrowsingClient.ts

**Checkpoint**: User Stories 1 and 2 work independently with no sorting controls.

---

## Phase 5: User Story 3 - View Pet Details (Priority: P3)

**Goal**: Visitors can open pet detail information from browsing.

**Independent Test**: A visitor selects an available pet and sees detail information, while unavailable pets show a clear unavailable state.

### Tests for User Story 3

- [x] T040 [P] [US3] Add controller contract test for `GET /tayag/api/v1/pets/{petId}` in backend/src/test/java/com/tayag/petstore/endpoints/browsing/PetBrowsingControllerTest.java
- [x] T041 [P] [US3] Add repository integration test for unavailable pet detail handling in backend/src/test/java/com/tayag/petstore/endpoints/browsing/PetBrowsingRepositoryTest.java
- [x] T042 [P] [US3] Add frontend journey test for opening pet detail and unavailable state in tests/e2e/pet-browsing.spec.ts

### Implementation for User Story 3

- [x] T043 [P] [US3] Create pet detail response DTO in backend/src/main/java/com/tayag/petstore/endpoints/browsing/PetDetailResponse.java
- [x] T044 [US3] Add repository method for available pet detail lookup in backend/src/main/java/com/tayag/petstore/endpoints/browsing/PetBrowsingRepository.java
- [x] T045 [US3] Add detail lookup and unavailable handling to backend/src/main/java/com/tayag/petstore/endpoints/browsing/PetBrowsingService.java
- [x] T046 [US3] Add `GET /tayag/api/v1/pets/{petId}` endpoint to backend/src/main/java/com/tayag/petstore/endpoints/browsing/PetBrowsingController.java
- [x] T047 [P] [US3] Create pet detail page with unavailable state in frontend/src/endpoints/browsing/PetDetailPage.tsx
- [x] T048 [US3] Add detail navigation from frontend/src/endpoints/browsing/PetCard.tsx
- [x] T049 [US3] Wire detail view route into frontend/src/app/App.tsx

**Checkpoint**: All browsing user stories are functional and independently testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verify contracts, no-sorting scope, deployment readiness, and documentation.

- [x] T050 [P] Validate OpenAPI contract alignment in specs/001-pet-browsing/contracts/openapi.yaml
- [x] T051 [P] Update quickstart verification notes after implementation in specs/001-pet-browsing/quickstart.md
- [x] T052 Run backend test suite and record result in specs/001-pet-browsing/quickstart.md
- [x] T053 Run frontend journey tests and record result in specs/001-pet-browsing/quickstart.md
- [x] T054 Verify no sorting controls or sort query parameters exist in backend/src/main/java/com/tayag/petstore/endpoints/browsing/PetBrowsingController.java and frontend/src/endpoints/browsing/PetBrowsingPage.tsx
- [x] T055 Verify Docker and Render configuration for free-tier deployment in docker-compose.yml and render.yaml

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Starts immediately.
- **Foundational (Phase 2)**: Depends on setup completion and package-name decision.
- **User Story 1 (Phase 3)**: Depends on foundational completion.
- **User Story 2 (Phase 4)**: Depends on User Story 1 API/client foundations.
- **User Story 3 (Phase 5)**: Depends on User Story 1 browsing links and foundational API structure.
- **Polish (Phase 6)**: Depends on all selected user stories.

### User Story Dependencies

- **US1 Browse Available Pets**: MVP scope and first deliverable.
- **US2 Filter Pets by Category**: Builds on browsing list and category data.
- **US3 View Pet Details**: Builds on browsing list selection and detail API.

### Within Each User Story

- Write tests before implementation.
- Backend DTOs and repository methods before service methods.
- Service methods before controller endpoints.
- API client updates before frontend page integration.
- Story complete before moving to the next priority.

## Parallel Opportunities

- Setup tasks T003, T004, and T005 can run in parallel.
- Foundational enum/type tasks T012, T013, T018, and T019 can run in parallel.
- US1 tests T020, T021, and T022 can run in parallel.
- US2 tests T030, T031, and T032 can run in parallel.
- US3 tests T040, T041, and T042 can run in parallel.
- DTO/component tasks marked `[P]` can run in parallel within their phases.

## Parallel Example: User Story 1

```text
Task: "Add controller contract test for GET /tayag/api/v1/pets in backend/src/test/java/com/tayag/petstore/endpoints/browsing/PetBrowsingControllerTest.java"
Task: "Add repository integration test for returning only available pets in backend/src/test/java/com/tayag/petstore/endpoints/browsing/PetBrowsingRepositoryTest.java"
Task: "Add frontend journey test for initial pet browsing and empty state in tests/e2e/pet-browsing.spec.ts"
Task: "Create pet summary response DTO in backend/src/main/java/com/tayag/petstore/endpoints/browsing/PetSummaryResponse.java"
Task: "Create pet card component with no sorting UI in frontend/src/endpoints/browsing/PetCard.tsx"
```

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete User Story 1 only.
3. Validate that visitors can browse available pets with no sorting controls.
4. Stop and demo before adding category filters or detail pages.

### Incremental Delivery

1. Deliver US1 browsing page.
2. Add US2 category filtering.
3. Add US3 detail view.
4. Run cross-cutting verification against quickstart.md.

### Package-Name Decision

Implementation MUST NOT create Java files under `com/tayag/package` because
that path maps to invalid Java package `com.tayag.package`. Use
`com.tayag.petstore` unless the owner provides another legal Java package.
