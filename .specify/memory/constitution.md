<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- Template principle 1 -> I. Product Scope and User Value
- Template principle 2 -> II. Full-Stack Architecture Boundaries
- Template principle 3 -> III. Commerce, Data, and Animal Welfare Integrity
- Template principle 4 -> IV. Security, Privacy, and Operational Safety
- Template principle 5 -> V. Free-Tier Deployability and Maintainability
Added sections:
- Required Technology Stack
- Development Workflow and Quality Gates
Removed sections:
- Placeholder Section 2
- Placeholder Section 3
Templates requiring updates:
- .specify/templates/plan-template.md: reviewed, no update required
- .specify/templates/spec-template.md: reviewed, no update required
- .specify/templates/tasks-template.md: reviewed, no update required
Follow-up TODOs: none
-->

# PetStore Constitution

## Core Principles

### I. Product Scope and User Value

PetStore MUST be built as an e-commerce application for selling pets across the
supported categories of dogs, cats, birds, reptiles, and fishes. Every feature
MUST map to a customer, administrator, or operations journey that can be
described and tested independently. The first usable release MUST prioritize
catalog browsing, pet detail pages, cart or checkout intent, account access,
order tracking, and administrator inventory management.

Non-commerce content MAY exist only when it directly helps customers make a
safe purchase decision, such as care notes, availability, age, breed or species
details, seller policy, or delivery constraints.

### II. Full-Stack Architecture Boundaries

The application MUST keep backend, frontend, database, and deployment concerns
explicitly separated. The backend MUST expose stable HTTP APIs from a Java
Spring Boot service. The frontend MUST consume those APIs from a React
application styled with Tailwind CSS and Material UI. PostgreSQL MUST be the
system of record for catalog, customer, order, and administrative data.

Domain rules MUST live in backend application services and domain models, not
inside React components. React components MUST focus on presentation, client
state, form handling, and API integration. Docker assets MUST make local
development reproducible for the backend, frontend, and database.

### III. Commerce, Data, and Animal Welfare Integrity

Pet inventory MUST distinguish real availability states such as available,
reserved, sold, unavailable, and removed. Checkout and order workflows MUST
prevent overselling and MUST record the exact pet, price, customer, and order
state used at the time of purchase intent. Administrative changes to inventory
and order status MUST be traceable through timestamps and responsible users
where authentication is available.

Pet data MUST include enough structured information for responsible browsing:
category, species or breed when applicable, age or life stage, health or care
notes, price, media, location or fulfillment constraints, and availability.
Features MUST avoid presenting animals as interchangeable stock when the data
model needs an individual pet record.

### IV. Security, Privacy, and Operational Safety

Authentication and authorization MUST protect customer account features and all
administrative actions. Server-side validation MUST enforce all business rules
and never trust frontend-only validation. Secrets, database credentials, API
keys, and Render environment values MUST stay outside committed files.

Customer data MUST be limited to what the application needs for accounts,
orders, and fulfillment. Errors returned to users MUST be useful without
revealing secrets or internal stack traces. Logs MUST support debugging of
orders, inventory changes, authentication events, and deployment issues while
avoiding sensitive personal data.

### V. Free-Tier Deployability and Maintainability

The system MUST be deployable on Render using free-tier-compatible services:
a Spring Boot web service, a React static site or web service, and PostgreSQL.
Plans MUST account for free-tier constraints such as cold starts, limited
compute, limited database resources, and environment-based configuration.

Implementation MUST favor simple framework-native patterns over unnecessary
abstractions. New dependencies MUST have a clear purpose, be compatible with
the selected stack, and not require paid infrastructure for the baseline
deployment. Performance work MUST focus first on practical user experience:
fast catalog browsing, efficient API queries, resilient loading states, and
clear failure recovery.

## Required Technology Stack

The baseline technology stack is fixed unless this constitution is amended:

- Backend: Java Spring Boot.
- Database: PostgreSQL.
- Frontend: React.
- Styling and UI: Tailwind CSS and Material UI.
- Packaging and local runtime: Docker and Docker Compose where appropriate.
- Deployment target: Render free-tier services.

Feature specifications MUST describe user behavior and business outcomes.
Implementation plans MUST translate those requirements into this stack and
document any unavoidable exception in Complexity Tracking.

## Development Workflow and Quality Gates

Work MUST proceed through Spec Kit artifacts in order: constitution, feature
specification, plan, tasks, and implementation. Each feature specification MUST
include independently testable user stories, acceptance scenarios, edge cases,
functional requirements, key entities when data is involved, and measurable
success criteria.

Implementation plans MUST perform a Constitution Check before research and
again after design. The check MUST verify stack alignment, API and data
boundaries, security requirements, Render deployability, and independently
testable delivery. Tasks MUST be grouped so the highest-priority user journey
can be delivered as a useful MVP before lower-priority journeys.

Tests MUST be included for high-risk behavior, including authentication,
authorization, inventory state transitions, order creation, validation errors,
and API contracts that affect checkout or administrative workflows. Frontend
work MUST include practical verification of critical user journeys and loading
or error states. Docker and Render configuration changes MUST include a local
or documented verification path.

Future file changes by AI assistance MUST be proposed to the project owner
before editing unless the owner has already approved the specific scope of
change in the current conversation.

## Governance

This constitution supersedes conflicting project practices and guides all
Spec Kit specifications, plans, tasks, and implementation work. Pull requests,
reviews, or AI-generated changes MUST identify any constitutional conflict and
either resolve it or document the justified exception in Complexity Tracking.

Amendments MUST include the reason for change, affected principles or sections,
expected migration impact, and updated version. Versioning follows semantic
versioning:

- MAJOR: Backward-incompatible governance or principle changes.
- MINOR: New principles, required stack changes, or materially expanded rules.
- PATCH: Clarifications, wording fixes, or non-semantic refinements.

Optional automation hooks, such as git commits after constitution changes, MAY
run only with explicit owner approval.

**Version**: 1.0.0 | **Ratified**: 2026-05-07 | **Last Amended**: 2026-05-07
