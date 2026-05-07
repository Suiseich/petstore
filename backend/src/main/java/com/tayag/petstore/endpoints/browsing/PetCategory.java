package com.tayag.petstore.endpoints.browsing;

public enum PetCategory {
    DOG("Dogs"),
    CAT("Cats"),
    BIRD("Birds"),
    REPTILE("Reptiles"),
    FISH("Fishes");

    private final String label;

    PetCategory(String label) {
        this.label = label;
    }

    public String label() {
        return label;
    }
}

