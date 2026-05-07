package com.tayag.petstore.endpoints.browsing;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestController
@RequestMapping("/tayag/api/v1")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class PetBrowsingController {
    private final PetBrowsingService service;

    public PetBrowsingController(PetBrowsingService service) {
        this.service = service;
    }

    @GetMapping("/pets")
    public PetsResponse browsePets(@RequestParam(required = false) PetCategory category) {
        return new PetsResponse(service.browse(category));
    }

    @GetMapping("/pets/{petId}")
    public PetDetailResponse petDetail(@PathVariable String petId) {
        return service.detail(petId);
    }

    @GetMapping("/pet-categories")
    public CategoriesResponse petCategories() {
        return new CategoriesResponse(service.categories());
    }

    @ExceptionHandler(PetUnavailableException.class)
    ResponseEntity<ErrorResponse> unavailable(PetUnavailableException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(exception.getMessage()));
    }

    @ExceptionHandler({MethodArgumentTypeMismatchException.class, MethodArgumentNotValidException.class})
    ResponseEntity<ErrorResponse> invalidRequest(Exception exception) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Unsupported request value."));
    }

    public record PetsResponse(List<PetSummaryResponse> pets) {
    }

    public record CategoriesResponse(List<PetCategoryResponse> categories) {
    }

    public record ErrorResponse(String message) {
    }
}
