package com.tayag.petstore.endpoints.browsing;

public record PetCategoryResponse(PetCategory value, String label) {
    static PetCategoryResponse from(PetCategory category) {
        return new PetCategoryResponse(category, category.label());
    }
}

