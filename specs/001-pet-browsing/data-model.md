# Data Model: Pet Browsing

## Pet

Represents an individual animal offered by the store.

### Fields

- `id`: Stable unique identifier.
- `name`: Display name shown in browsing and detail views.
- `category`: One of the supported pet categories.
- `price`: Customer-visible price.
- `availability`: Browsing-relevant availability state.
- `summary`: Short browsing description.
- `description`: Longer detail description.
- `careNotes`: Optional care or health notes for responsible purchase decisions.
- `primaryMediaUrl`: Optional primary image or media reference.
- `createdAt`: Timestamp for administrative traceability and stable fallback ordering.
- `updatedAt`: Timestamp for freshness and traceability.

### Validation Rules

- `name`, `category`, `price`, and `availability` are required.
- `price` must be zero or greater.
- `category` must be one of `DOG`, `CAT`, `BIRD`, `REPTILE`, or `FISH`.
- Normal browsing returns only pets with `AVAILABLE` availability.
- Details for non-available pets return an unavailable state rather than a
  normal detail response.

## Pet Category

Represents a supported browsing group.

### Values

- `DOG`
- `CAT`
- `BIRD`
- `REPTILE`
- `FISH`

### Validation Rules

- Category filters must match a supported value.
- Unknown categories return a validation error.

## Availability State

Represents whether a pet can appear in browsing.

### Values

- `AVAILABLE`: Pet appears in normal browsing and detail views.
- `RESERVED`: Pet does not appear in normal browsing.
- `SOLD`: Pet does not appear in normal browsing.
- `UNAVAILABLE`: Pet does not appear in normal browsing.
- `REMOVED`: Pet does not appear in normal browsing.

### State Handling

- This feature reads availability only.
- State changes are out of scope for pet browsing and belong to a future
  administrative inventory feature.

## Response Shapes

### Pet Summary

Used on browsing lists.

- `id`
- `name`
- `category`
- `price`
- `availability`
- `summary`
- `primaryMediaUrl`

### Pet Detail

Used on detail views.

- All pet summary fields.
- `description`
- `careNotes`
- `updatedAt`

## Relationships

- Each `Pet` has exactly one `Pet Category`.
- Each `Pet` has exactly one current `Availability State`.
