import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/arbeigsgiverrettet.json' });

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});

test.describe('Tilgangskontroll: Arbeigsgiverrettet', () => {
    test('1. Gå inn i "Oversikt" fanen - Skal få en oversikt over gjeldende kontor.  Skal se knapperad for "Finn Kandidat", "Finn Stillinger", "Se mine Stillinger", "Opprett ny stilling"', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Oversikt' }).click();
        await expect(page.getByText('NAV Hurdal', { exact: true })).toBeVisible();

        await expect(page.getByRole('link', { name: 'Finn kandidater' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Finn stillinger' })).toBeVisible;
        await expect(page.getByRole('link', { name: 'Se mine stillinger' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Opprett ny stilling' })).toBeVisible();
    });

    test('2. Se om kandidatsøk-fanen er tilgjengelig. - Fanen skal vises', async ({ page }) => {});
    // test('', async ({ page }) => {});
    // test('', async ({ page }) => {});
    // test('', async ({ page }) => {});
    // test('', async ({ page }) => {});
    // test('', async ({ page }) => {});
});
