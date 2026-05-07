package com.tayag.petstore.endpoints.browsing;

import static org.hamcrest.Matchers.everyItem;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PetBrowsingControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void returnsAvailablePetsWithoutSortingParameter() throws Exception {
        mockMvc.perform(get("/tayag/api/v1/pets"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.pets", hasSize(5)))
                .andExpect(jsonPath("$.pets[*].availability", everyItem(is("AVAILABLE"))))
                .andExpect(jsonPath("$.pets[*].id", not(hasItem("cat-002"))));
    }

    @Test
    void filtersAvailablePetsByCategory() throws Exception {
        mockMvc.perform(get("/tayag/api/v1/pets").param("category", "CAT"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.pets", hasSize(1)))
                .andExpect(jsonPath("$.pets[0].id").value("cat-001"))
                .andExpect(jsonPath("$.pets[0].category").value("CAT"));
    }

    @Test
    void returnsSupportedPetCategories() throws Exception {
        mockMvc.perform(get("/tayag/api/v1/pet-categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.categories", hasSize(5)))
                .andExpect(jsonPath("$.categories[0].value").value("DOG"));
    }

    @Test
    void returnsAvailablePetDetail() throws Exception {
        mockMvc.perform(get("/tayag/api/v1/pets/dog-001"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("dog-001"))
                .andExpect(jsonPath("$.price").value(450.00))
                .andExpect(jsonPath("$.availability").value("AVAILABLE"))
                .andExpect(jsonPath("$.description").exists())
                .andExpect(jsonPath("$.careNotes").exists());
    }

    @Test
    void returnsNotFoundForUnavailablePetDetail() throws Exception {
        mockMvc.perform(get("/tayag/api/v1/pets/cat-002"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Pet is not available for browsing."));
    }

    @Test
    void returnsBadRequestForUnknownCategory() throws Exception {
        mockMvc.perform(get("/tayag/api/v1/pets").param("category", "HORSE"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Unsupported request value."));
    }
}

