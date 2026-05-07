import { Alert, Button, CircularProgress, Container, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { fetchPetDetail } from './petBrowsingClient';
import type { PetDetail } from './petBrowsingTypes';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

interface PetDetailPageProps {
  petId: string;
  onBack: () => void;
}

export default function PetDetailPage({ petId, onBack }: PetDetailPageProps) {
  const [pet, setPet] = useState<PetDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPetDetail(petId)
      .then(setPet)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [petId]);

  return (
    <Container maxWidth="md" className="py-8">
      <Stack spacing={3}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} className="self-start">
          Back to browsing
        </Button>

        {loading && (
          <Stack alignItems="center" className="py-16">
            <CircularProgress aria-label="Loading pet detail" />
          </Stack>
        )}

        {!loading && error && (
          <Alert severity="warning" action={<Button onClick={onBack}>Browse pets</Button>}>
            {error}
          </Alert>
        )}

        {!loading && pet && (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            {pet.primaryMediaUrl && (
              <img src={pet.primaryMediaUrl} alt={pet.name} className="h-72 w-full object-cover" />
            )}
            <Stack spacing={2} className="p-6">
              <Typography variant="h3" component="h1" fontWeight={700}>
                {pet.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {pet.category.toLowerCase()} · {pet.availability.toLowerCase()}
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {formatter.format(pet.price)}
              </Typography>
              <Typography variant="body1" className="break-words">
                {pet.description || pet.summary}
              </Typography>
              {pet.careNotes && (
                <Alert severity="info">
                  <strong>Care notes:</strong> {pet.careNotes}
                </Alert>
              )}
            </Stack>
          </div>
        )}
      </Stack>
    </Container>
  );
}

