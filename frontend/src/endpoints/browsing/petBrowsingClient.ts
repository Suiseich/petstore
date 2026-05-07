import type { PetCategory, PetCategoryOption, PetDetail, PetSummary } from './petBrowsingTypes';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/tayag/api/v1';

async function readJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    const payload = await response.json().catch(() => ({ message: 'Request failed.' }));
    throw new Error(payload.message ?? 'Request failed.');
  }
  return response.json() as Promise<T>;
}

export async function fetchPets(category?: PetCategory): Promise<PetSummary[]> {
  const url = new URL(`${API_BASE_URL}/pets`);
  if (category) {
    url.searchParams.set('category', category);
  }
  const payload = await readJson<{ pets: PetSummary[] }>(url.toString());
  return payload.pets;
}

export async function fetchPetCategories(): Promise<PetCategoryOption[]> {
  const payload = await readJson<{ categories: PetCategoryOption[] }>(`${API_BASE_URL}/pet-categories`);
  return payload.categories;
}

export async function fetchPetDetail(petId: string): Promise<PetDetail> {
  return readJson<PetDetail>(`${API_BASE_URL}/pets/${encodeURIComponent(petId)}`);
}

