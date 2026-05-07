package com.tayag.petstore.endpoints.browsing;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "pets")
public class PetEntity {
    @Id
    private String id;

    @NotBlank
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    private PetCategory category;

    @NotNull
    @PositiveOrZero
    private BigDecimal price;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AvailabilityState availability;

    private String summary;

    @Column(length = 2000)
    private String description;

    @Column(name = "care_notes", length = 2000)
    private String careNotes;

    @Column(name = "primary_media_url")
    private String primaryMediaUrl;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    protected PetEntity() {
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public PetCategory getCategory() {
        return category;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public AvailabilityState getAvailability() {
        return availability;
    }

    public String getSummary() {
        return summary;
    }

    public String getDescription() {
        return description;
    }

    public String getCareNotes() {
        return careNotes;
    }

    public String getPrimaryMediaUrl() {
        return primaryMediaUrl;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }
}

