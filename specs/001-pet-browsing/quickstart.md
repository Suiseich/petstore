# Quickstart: Pet Browsing

## Goal

Verify the pet browsing feature from API contract through visitor-facing flows.

## Prerequisites

- PostgreSQL is available locally or through Docker.
- Backend environment points to the PostgreSQL database.
- Frontend environment points to the backend base URL.

## Backend Verification

1. Start PostgreSQL.
2. Start the Spring Boot backend.
3. Confirm the API base path responds under `/tayag/api/v1`.
4. Request `GET /tayag/api/v1/pet-categories`.
5. Confirm categories include dogs, cats, birds, reptiles, and fishes.
6. Request `GET /tayag/api/v1/pets`.
7. Confirm only available pets are returned.
8. Request `GET /tayag/api/v1/pets?category=CAT`.
9. Confirm only available cats are returned.
10. Request `GET /tayag/api/v1/pets/{petId}` for an available pet.
11. Confirm detail fields include price, availability, description, and care or
    health notes when present.
12. Confirm no endpoint accepts or documents a sorting parameter.

**Verification result**: Passed on 2026-05-07 with `mvn test` using Java 21.
Backend tests ran 9 checks with 0 failures.

## Frontend Verification

1. Start the frontend.
2. Open the pet browsing page.
3. Confirm available pets appear with name, category, price, and summary media
   or description.
4. Select one category.
5. Confirm only that category is shown.
6. Return to all pets.
7. Open a pet detail view.
8. Confirm detail information appears and no checkout, reservation, account,
   admin, search, or sorting controls are present.
9. Test empty-state behavior by using a category with no available pets.

**Verification result**: Passed on 2026-05-07 with `npm run build` and
`npm run test:e2e`. Frontend build completed successfully and 3 browser journey
tests passed.

## Render-Oriented Verification

1. Confirm backend reads database and port configuration from environment
   variables.
2. Confirm frontend reads backend URL from environment configuration.
3. Confirm Docker assets build backend and frontend independently.
4. Confirm the app remains usable after free-tier cold starts.

**Verification result**: Configuration files were created for Docker Compose
and Render free-tier deployment. Live Render deployment was not run locally.
