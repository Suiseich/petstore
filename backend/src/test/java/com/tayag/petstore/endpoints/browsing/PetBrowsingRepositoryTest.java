package com.tayag.petstore.endpoints.browsing;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

@DataJpaTest
@ActiveProfiles("test")
class PetBrowsingRepositoryTest {
    @Autowired
    private PetBrowsingRepository repository;

    @Test
    void findsAvailablePetsOnly() {
        List<PetEntity> pets = repository.findByAvailabilityOrderByCreatedAtAscIdAsc(AvailabilityState.AVAILABLE);

        assertThat(pets).hasSize(5);
        assertThat(pets).allMatch(pet -> pet.getAvailability() == AvailabilityState.AVAILABLE);
        assertThat(pets).extracting(PetEntity::getId).doesNotContain("cat-002");
    }

    @Test
    void findsAvailablePetsByCategoryOnly() {
        List<PetEntity> cats = repository.findByCategoryAndAvailabilityOrderByCreatedAtAscIdAsc(
                PetCategory.CAT,
                AvailabilityState.AVAILABLE
        );

        assertThat(cats).extracting(PetEntity::getId).containsExactly("cat-001");
    }

    @Test
    void excludesUnavailablePetDetails() {
        assertThat(repository.findByIdAndAvailability("cat-002", AvailabilityState.AVAILABLE)).isEmpty();
    }
}

