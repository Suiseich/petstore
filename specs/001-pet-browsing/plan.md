# Implementation Plan: Pet Browsing

**Branch**: `001-pet-browsing` | **Date**: 2026-05-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-pet-browsing/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Deliver the first PetStore browsing increment: visitors can view available pets,
filter by one supported category, and open pet detail information. The backend
will expose read-only Spring Boot endpoints under `/tayag/api/v1`, backed by
PostgreSQL pet catalog data. The React frontend will consume those endpoints
and present catalog, category, empty, unavailable, and detail states without
checkout, reservation, account, admin, search, or sorting behavior.

The user requested Java package `com.tayag.package`. That exact package is not
valid Java because `package` is a reserved keyword. Implementation uses
`com.tayag.petstore` as the compile-safe base package while preserving the
requested surname in the API path.

## Technical Context

**Language/Version**: Java 21, Spring Boot 3.x for backend; TypeScript with React 18+ for frontend  
**Primary Dependencies**: Spring Web, Spring Data JPA, PostgreSQL driver, validation, Flyway; React, Tailwind CSS, Material UI  
**Storage**: PostgreSQL for pet catalog, categories, media metadata, and availability state  
**Testing**: JUnit 5, Spring Boot Test, Testcontainers or local PostgreSQL integration tests; frontend component and journey tests  
**Target Platform**: Render free-tier web service/static site plus Render PostgreSQL or compatible managed PostgreSQL  
**Project Type**: Full-stack web application with backend API and frontend client  
**Performance Goals**: Visitors can view the initial browsing page in under 3 seconds after service wake-up; category changes feel immediate for normal catalog sizes  
**Constraints**: API base path MUST start with `/tayag/api/v1`; browsing MUST NOT include sorting; exact Java package `com.tayag.package` is invalid, so implementation uses `com.tayag.petstore`  
**Scale/Scope**: Initial browsing feature for dogs, cats, birds, reptiles, and fishes; no checkout, accounts, reservations, search, admin, or sorting

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Product Scope and User Value**: PASS. Plan maps to pet browsing, category filtering, and detail viewing only.
- **Full-Stack Architecture Boundaries**: PASS. Backend owns domain rules and read APIs; frontend owns browsing UI and client state.
- **Commerce, Data, and Animal Welfare Integrity**: PASS. Pet records model individual animals, availability, price, media, and care/health notes.
- **Security, Privacy, and Operational Safety**: PASS. This feature is read-only and public; server-side validation and safe error handling still apply.
- **Free-Tier Deployability and Maintainability**: PASS WITH NOTE. Plan uses simple Spring Boot, React, PostgreSQL, Docker, and Render-compatible configuration.
- **Owner Approval for Future AI Edits**: PASS. This plan and tasks are created from the current explicit request.
- **Java Package Constraint**: PASS WITH NOTE. `com.tayag.package` is not legal Java; implementation uses `com.tayag.petstore`.

## Project Structure

### Documentation (this feature)

```text
specs/001-pet-browsing/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- openapi.yaml
|-- checklists/
|   `-- requirements.md
`-- tasks.md
```

### Source Code (repository root)

```text
backend/
|-- pom.xml
|-- Dockerfile
|-- src/
|   |-- main/
|   |   |-- java/
|   |   |   `-- com/
|   |   |       `-- tayag/
|   |   |           `-- petstore/
|   |   |               |-- PetStoreApplication.java
|   |   |               `-- endpoints/
|   |   |                   `-- browsing/
|   |   |                       |-- PetBrowsingController.java
|   |   |                       |-- PetBrowsingService.java
|   |   |                       |-- PetBrowsingRepository.java
|   |   |                       |-- PetSummaryResponse.java
|   |   |                       |-- PetDetailResponse.java
|   |   |                       |-- PetCategoryResponse.java
|   |   |                       |-- PetEntity.java
|   |   |                       |-- PetCategory.java
|   |   |                       `-- AvailabilityState.java
|   |   `-- resources/
|   |       |-- application.yml
|   |       `-- db/
|   |           `-- migration/
|   |               |-- V1__create_pet_browsing_tables.sql
|   |               `-- V2__seed_pet_browsing_catalog.sql
|   `-- test/
|       `-- java/
|           `-- com/
|               `-- tayag/
|                   `-- petstore/
|                       `-- endpoints/
|                           `-- browsing/
|                               |-- PetBrowsingControllerTest.java
|                               `-- PetBrowsingRepositoryTest.java

frontend/
|-- package.json
|-- Dockerfile
|-- index.html
|-- src/
|   |-- main.tsx
|   |-- app/
|   |   `-- App.tsx
|   |-- endpoints/
|   |   `-- browsing/
|   |       |-- PetBrowsingPage.tsx
|   |       |-- PetDetailPage.tsx
|   |       |-- PetCategoryTabs.tsx
|   |       |-- PetCard.tsx
|   |       |-- petBrowsingClient.ts
|   |       `-- petBrowsingTypes.ts
|   `-- styles/
|       `-- index.css
`-- tests/
    `-- e2e/
        `-- pet-browsing.spec.ts

docker-compose.yml
render.yaml
```

**Structure Decision**: Use a two-application full-stack layout with `backend/`
and `frontend/`. Backend code is organized by endpoint area under
`endpoints/browsing` so controller, service, repository, DTOs, and local entity
types for pet browsing stay together. Frontend code mirrors the same endpoint
area under `src/endpoints/browsing` for a simple feature-oriented structure.

## Phase 0: Research

Research output: [research.md](./research.md)

Resolved decisions:

- API base path: `/tayag/api/v1`.
- Backend feature package organization: endpoint-oriented under
  `com.tayag.petstore.endpoints.browsing`.
- Compile-safe package name: `com.tayag.petstore` because
  `com.tayag.package` is invalid Java.
- Browsing order: server-defined stable order only; no user sorting.
- Data access: Spring Data JPA with PostgreSQL and Flyway migrations.
- Contract style: OpenAPI contract for read-only browsing endpoints.

## Phase 1: Design and Contracts

Design artifacts:

- Data model: [data-model.md](./data-model.md)
- API contract: [contracts/openapi.yaml](./contracts/openapi.yaml)
- Quickstart: [quickstart.md](./quickstart.md)

Backend endpoints:

- `GET /tayag/api/v1/pets`
- `GET /tayag/api/v1/pets?category={category}`
- `GET /tayag/api/v1/pets/{petId}`
- `GET /tayag/api/v1/pet-categories`

Frontend views:

- Pet browsing page with all available pets.
- Single-category filtered browsing state.
- Pet detail view.
- Empty and unavailable states.

## Post-Design Constitution Check

- **Stack alignment**: PASS. Java Spring Boot, PostgreSQL, Docker, React, Tailwind CSS, Material UI, and Render are represented.
- **API and data boundaries**: PASS. Frontend consumes read APIs; backend owns availability and filtering.
- **Security requirements**: PASS. Public read endpoints expose only browsing-safe fields; no admin/customer data.
- **Render deployability**: PASS. Docker and environment configuration are planned without paid-only assumptions.
- **Independently testable delivery**: PASS. User stories are mapped to separate endpoint/UI increments.
- **No sorting**: PASS. Sorting is explicitly excluded from contracts, frontend controls, and tasks.
- **Java package constraint**: PASS WITH NOTE. Implementation uses legal base package `com.tayag.petstore`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Requested Java package `com.tayag.package` cannot compile | Java reserves `package` as a keyword | Use `com.tayag.petstore` |
