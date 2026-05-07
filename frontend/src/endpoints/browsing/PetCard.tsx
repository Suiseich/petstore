import { Card, CardActionArea, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import type { PetSummary } from './petBrowsingTypes';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

interface PetCardProps {
  pet: PetSummary;
  onSelect: (petId: string) => void;
}

export default function PetCard({ pet, onSelect }: PetCardProps) {
  return (
    <Card variant="outlined" className="h-full overflow-hidden bg-white">
      <CardActionArea className="h-full" onClick={() => onSelect(pet.id)}>
        {pet.primaryMediaUrl ? (
          <CardMedia component="img" height="180" image={pet.primaryMediaUrl} alt={pet.name} />
        ) : (
          <div className="flex h-[180px] items-center justify-center bg-slate-100 text-sm text-slate-500">
            No image
          </div>
        )}
        <CardContent>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
              <Typography variant="h6" component="h2" className="break-words">
                {pet.name}
              </Typography>
              <Chip size="small" color="success" label={pet.availability.toLowerCase()} />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {pet.category.toLowerCase()}
            </Typography>
            <Typography variant="subtitle1" fontWeight={700}>
              {formatter.format(pet.price)}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="line-clamp-3 break-words">
              {pet.summary || 'Care details available on the pet profile.'}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

