import { expect, test } from '@playwright/test';

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

    test('Skal kunne legge til kandidat i kandidatliste', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'intern stilling' }).click();
        await expect(page.getByRole('button', { name: 'Legg til kandidat' })).toBeVisible();
    });

    test('Skal kunne se kandidatsøk og formidlingsfane', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Kandidatsøk' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Formidlinger' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Oversikt' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Stillinger', exact: true })).toBeVisible();
    });
});
