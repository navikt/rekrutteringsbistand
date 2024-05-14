import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/jobbsokerrettet.json' });

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});

test.describe('Stilling', () => {
    test('Antall kandidater i stilling', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'Intern stilling MIN' }).click();
        await expect(page.getByText('Antall kandidater allerede registrert for stillingen: 2'))
            .toBeVisible;
    });
});
