export type PetCategory = 'DOG' | 'CAT' | 'BIRD' | 'REPTILE' | 'FISH';

export type AvailabilityState = 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'UNAVAILABLE' | 'REMOVED';

export interface PetSummary {
  id: string;
  name: string;
  category: PetCategory;
  price: number;
  availability: AvailabilityState;
  summary?: string;
  primaryMediaUrl?: string | null;
}

export interface PetDetail extends PetSummary {
  description?: string;
  careNotes?: string | null;
  updatedAt?: string;
}

export interface PetCategoryOption {
  value: PetCategory;
  label: string;
}

