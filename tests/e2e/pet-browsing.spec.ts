import { test, expect } from '../../frontend/node_modules/@playwright/test';

test('visitor can browse pets without sorting controls', async ({ page }) => {
  await page.route('**/tayag/api/v1/pet-categories', async (route) => {
    await route.fulfill({
      json: {
        categories: [
          { value: 'DOG', label: 'Dogs' },
          { value: 'CAT', label: 'Cats' }
        ]
      }
    });
  });
  await page.route('**/tayag/api/v1/pets', async (route) => {
    await route.fulfill({
      json: {
        pets: [
          {
            id: 'dog-001',
            name: 'Buddy',
            category: 'DOG',
            price: 450,
            availability: 'AVAILABLE',
            summary: 'Friendly young beagle who loves walks.',
            primaryMediaUrl: null
          }
        ]
      }
    });
  });

  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'PetStore' })).toBeVisible();
  await expect(page.getByText('Buddy')).toBeVisible();
  await expect(page.getByText('$450.00')).toBeVisible();
  await expect(page.getByText(/Friendly young beagle/)).toBeVisible();
  await expect(page.getByRole('button', { name: /sort/i })).toHaveCount(0);
});

test('visitor can filter by category and see category empty state', async ({ page }) => {
  await page.route('**/tayag/api/v1/pet-categories', async (route) => {
    await route.fulfill({ json: { categories: [{ value: 'CAT', label: 'Cats' }] } });
  });
  await page.route('**/tayag/api/v1/pets?category=CAT', async (route) => {
    await route.fulfill({ json: { pets: [] } });
  });
  await page.route('**/tayag/api/v1/pets', async (route) => {
    await route.fulfill({ json: { pets: [] } });
  });

  await page.goto('/');
  await page.getByRole('button', { name: 'Cats' }).click();

  await expect(page.getByText('No available pets in this category right now.')).toBeVisible();
});

test('visitor can open detail and return to browsing', async ({ page }) => {
  await page.route('**/tayag/api/v1/pet-categories', async (route) => {
    await route.fulfill({ json: { categories: [] } });
  });
  await page.route('**/tayag/api/v1/pets/dog-001', async (route) => {
    await route.fulfill({
      json: {
        id: 'dog-001',
        name: 'Buddy',
        category: 'DOG',
        price: 450,
        availability: 'AVAILABLE',
        summary: 'Friendly young beagle.',
        description: 'Buddy is a gentle beagle.',
        careNotes: 'Needs daily walks.',
        primaryMediaUrl: null
      }
    });
  });
  await page.route('**/tayag/api/v1/pets', async (route) => {
    await route.fulfill({
      json: {
        pets: [
          {
            id: 'dog-001',
            name: 'Buddy',
            category: 'DOG',
            price: 450,
            availability: 'AVAILABLE',
            summary: 'Friendly young beagle.',
            primaryMediaUrl: null
          }
        ]
      }
    });
  });

  await page.goto('/');
  await page.getByText('Buddy').click();

  await expect(page.getByText('Buddy is a gentle beagle.')).toBeVisible();
  await expect(page.getByText(/Care notes:/)).toBeVisible();
  await page.getByRole('button', { name: /Back to browsing/i }).click();
  await expect(page.getByRole('heading', { name: 'PetStore' })).toBeVisible();
});
