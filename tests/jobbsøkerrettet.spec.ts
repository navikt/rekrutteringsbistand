import { test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/jobbsokerrettet.json' });

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});

test.describe('Tilgangskontroll: Jobbsøkerrettet', () => {
    test('Viser alle faner ', async ({ page }) => {
        await page.getByRole('link', { name: 'Oversikt' });
        await page.getByRole('link', { name: 'Stillinger', exact: true });
        await page.getByRole('link', { name: 'Kandidatsøk' });
        await page.getByRole('link', { name: 'Formidlinger' });
    });
});
