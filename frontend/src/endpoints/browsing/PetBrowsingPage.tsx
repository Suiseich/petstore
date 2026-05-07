import { Alert, Box, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PetCard from './PetCard';
import PetCategoryTabs from './PetCategoryTabs';
import { fetchPetCategories, fetchPets } from './petBrowsingClient';
import type { PetCategory, PetCategoryOption, PetSummary } from './petBrowsingTypes';

interface PetBrowsingPageProps {
  onSelectPet: (petId: string) => void;
}

export default function PetBrowsingPage({ onSelectPet }: PetBrowsingPageProps) {
  const [pets, setPets] = useState<PetSummary[]>([]);
  const [categories, setCategories] = useState<PetCategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PetCategory | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPetCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPets(selectedCategory)
      .then(setPets)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const emptyMessage = selectedCategory
    ? 'No available pets in this category right now.'
    : 'No pets are available for browsing right now.';

  return (
    <Container maxWidth="lg" className="py-8">
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3" component="h1" fontWeight={700}>
            PetStore
          </Typography>
          <Typography variant="body1" color="text.secondary" className="mt-2 max-w-2xl">
            Browse available dogs, cats, birds, reptiles, and fishes.
          </Typography>
        </Box>

        <PetCategoryTabs categories={categories} selectedCategory={selectedCategory} onChange={setSelectedCategory} />

        {loading && (
          <Stack alignItems="center" className="py-16">
            <CircularProgress aria-label="Loading pets" />
          </Stack>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && pets.length === 0 && <Alert severity="info">{emptyMessage}</Alert>}

        {!loading && !error && pets.length > 0 && (
          <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} onSelect={onSelectPet} />
            ))}
          </Box>
        )}
      </Stack>
    </Container>
  );
}

