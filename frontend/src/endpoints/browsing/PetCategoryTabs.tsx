import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { PetCategory, PetCategoryOption } from './petBrowsingTypes';

interface PetCategoryTabsProps {
  categories: PetCategoryOption[];
  selectedCategory?: PetCategory;
  onChange: (category?: PetCategory) => void;
}

export default function PetCategoryTabs({ categories, selectedCategory, onChange }: PetCategoryTabsProps) {
  return (
    <ToggleButtonGroup
      color="primary"
      exclusive
      value={selectedCategory ?? 'ALL'}
      onChange={(_, value) => {
        if (value) {
          onChange(value === 'ALL' ? undefined : (value as PetCategory));
        }
      }}
      aria-label="Pet category"
      className="flex flex-wrap gap-2"
      sx={{
        '& .MuiToggleButtonGroup-grouped': {
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '8px !important',
          margin: 0,
          minWidth: 84,
          textTransform: 'none'
        }
      }}
    >
      <ToggleButton value="ALL" aria-label="All pets">
        All
      </ToggleButton>
      {categories.map((category) => (
        <ToggleButton key={category.value} value={category.value} aria-label={category.label}>
          {category.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
