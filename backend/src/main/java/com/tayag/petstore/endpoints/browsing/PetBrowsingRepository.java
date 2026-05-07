package com.tayag.petstore.endpoints.browsing;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetBrowsingRepository extends JpaRepository<PetEntity, String> {
    List<PetEntity> findByAvailabilityOrderByCreatedAtAscIdAsc(AvailabilityState availability);

    List<PetEntity> findByCategoryAndAvailabilityOrderByCreatedAtAscIdAsc(
            PetCategory category,
            AvailabilityState availability
    );

    Optional<PetEntity> findByIdAndAvailability(String id, AvailabilityState availability);
}

