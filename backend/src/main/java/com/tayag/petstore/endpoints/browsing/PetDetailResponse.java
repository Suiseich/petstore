package com.tayag.petstore.endpoints.browsing;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record PetDetailResponse(
        String id,
        String name,
        PetCategory category,
        BigDecimal price,
        AvailabilityState availability,
        String summary,
        String primaryMediaUrl,
        String description,
        String careNotes,
        OffsetDateTime updatedAt
) {
    static PetDetailResponse from(PetEntity pet) {
        return new PetDetailResponse(
                pet.getId(),
                pet.getName(),
                pet.getCategory(),
                pet.getPrice(),
                pet.getAvailability(),
                pet.getSummary(),
                pet.getPrimaryMediaUrl(),
                pet.getDescription(),
                pet.getCareNotes(),
                pet.getUpdatedAt()
        );
    }
}

