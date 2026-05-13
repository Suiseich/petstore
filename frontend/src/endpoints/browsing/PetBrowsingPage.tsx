import { Alert, Box, CircularProgress, Container, Paper, Stack, Typography } from '@mui/material';
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
    <Box className="min-h-screen bg-slate-50">
      <Container maxWidth="lg" className="py-8 sm:py-10">
        <Stack spacing={3}>
          <Paper elevation={0} className="border border-slate-200 bg-white px-5 py-5 sm:px-6">
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="space-between">
              <Box>
                <Typography variant="h3" component="h1" fontWeight={700}>
                  PetStore
                </Typography>
                <Typography variant="body1" color="text.secondary" className="mt-2 max-w-2xl">
                  Browse available dogs, cats, birds, reptiles, and fishes.
                </Typography>
              </Box>
              <Box className="text-left md:text-right">
                <Typography variant="overline" color="text.secondary">
                  Available pets
                </Typography>
                <Typography variant="h4" fontWeight={700}>
                  {loading ? '-' : pets.length}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper elevation={0} className="border border-slate-200 bg-white px-4 py-3">
            <PetCategoryTabs categories={categories} selectedCategory={selectedCategory} onChange={setSelectedCategory} />
          </Paper>

          {loading && (
            <Stack alignItems="center" className="py-16">
              <CircularProgress aria-label="Loading pets" />
            </Stack>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          {!loading && !error && pets.length === 0 && <Alert severity="info">{emptyMessage}</Alert>}

          {!loading && !error && pets.length > 0 && (
            <Box className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} onSelect={onSelectPet} />
              ))}
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
