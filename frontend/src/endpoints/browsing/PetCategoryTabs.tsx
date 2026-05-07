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

