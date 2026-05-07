package com.tayag.petstore.endpoints.browsing;

import java.math.BigDecimal;

public record PetSummaryResponse(
        String id,
        String name,
        PetCategory category,
        BigDecimal price,
        AvailabilityState availability,
        String summary,
        String primaryMediaUrl
) {
    static PetSummaryResponse from(PetEntity pet) {
        return new PetSummaryResponse(
                pet.getId(),
                pet.getName(),
                pet.getCategory(),
                pet.getPrice(),
                pet.getAvailability(),
                pet.getSummary(),
                pet.getPrimaryMediaUrl()
        );
    }
}

