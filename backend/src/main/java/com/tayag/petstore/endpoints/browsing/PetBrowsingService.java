package com.tayag.petstore.endpoints.browsing;

import java.util.Arrays;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class PetBrowsingService {
    private final PetBrowsingRepository repository;

    public PetBrowsingService(PetBrowsingRepository repository) {
        this.repository = repository;
    }

    public List<PetSummaryResponse> browse(PetCategory category) {
        List<PetEntity> pets = category == null
                ? repository.findByAvailabilityOrderByCreatedAtAscIdAsc(AvailabilityState.AVAILABLE)
                : repository.findByCategoryAndAvailabilityOrderByCreatedAtAscIdAsc(category, AvailabilityState.AVAILABLE);

        return pets.stream().map(PetSummaryResponse::from).toList();
    }

    public PetDetailResponse detail(String petId) {
        return repository.findByIdAndAvailability(petId, AvailabilityState.AVAILABLE)
                .map(PetDetailResponse::from)
                .orElseThrow(() -> new PetUnavailableException("Pet is not available for browsing."));
    }

    public List<PetCategoryResponse> categories() {
        return Arrays.stream(PetCategory.values())
                .map(PetCategoryResponse::from)
                .toList();
    }
}

