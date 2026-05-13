import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
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
    <Card variant="outlined" className="h-full overflow-hidden bg-white shadow-sm">
      <CardActionArea className="flex h-full flex-col items-stretch" onClick={() => onSelect(pet.id)}>
        <Box className="h-48 w-full overflow-hidden bg-slate-100">
          {pet.primaryMediaUrl ? (
            <CardMedia component="img" image={pet.primaryMediaUrl} alt={pet.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">No image</div>
          )}
        </Box>
        <CardContent className="flex min-h-52 flex-1 flex-col">
          <Stack spacing={1.25} className="h-full">
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={1.5}>
              <Box className="min-w-0">
                <Typography variant="h6" component="h2" className="break-words leading-snug">
                  {pet.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="capitalize">
                  {pet.category.toLowerCase()}
                </Typography>
              </Box>
              <Chip size="small" color="success" label="available" />
            </Stack>
            <Typography variant="h6" fontWeight={700}>
              {formatter.format(pet.price)}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="line-clamp-3 min-h-[60px] break-words">
              {pet.summary || 'Care details available on the pet profile.'}
            </Typography>
            <Typography variant="button" color="primary" className="mt-auto pt-2">
              View details
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
