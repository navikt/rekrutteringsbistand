import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/modia_generell.json' });

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});

test.describe('Tilgangskontroll: Modia Generell', () => {
    test('Skal se hurtiglenker', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Finn kandidater' })).not.toBeVisible();
        await expect(page.getByRole('link', { name: 'Finn stillinger' })).not.toBeVisible();
        await expect(page.getByRole('link', { name: 'Se mine stillinger' })).not.toBeVisible();
        await expect(page.getByRole('link', { name: 'Opprett ny stilling' })).not.toBeVisible();
    });
    test('Skal få advarsel: "Du har ikke tistrekkelig tilgang til å se denne siden."', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Kandidatsøk' }).click();
        await expect(page.getByText('Du har ikke tistrekkelig')).toBeVisible();
        await page.getByRole('link', { name: 'Spasertur, Patent' }).click();
        await page.getByRole('tab', { name: 'Historikk' }).click();

        await expect(
            page.getByText('Du har ikke tistrekkelig tilgang til å se denne siden.')
        ).toHaveCount(2);
    });

    test('Skal IKKE kunne legge til kandidat i kandidatliste', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'styrk eller tittel kommer her' }).click();
        await expect(page.getByRole('button', { name: 'Legg til kandidat' })).not.toBeVisible();
    });
});
