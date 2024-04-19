import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/arbeigsgiverrettet.json' });

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});

test.describe('Tilgangskontroll: Arbeigsgiverrettet', () => {
    test('Viser alle faner ', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Oversikt' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Stillinger', exact: true })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Kandidatsøk' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Formidlinger' })).toBeVisible();
    });

    test('Skal se hurtiglenker', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Finn kandidater' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Finn stillinger' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Se mine stillinger' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Opprett ny stilling' })).toBeVisible();
    });

    test('Mulighet til å søke på Publisert, Utløpt og Stoppet stillinger ', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await expect(page.getByRole('checkbox', { name: 'Publisert' })).toBeVisible();
        await expect(page.getByRole('checkbox', { name: 'Utløpt' })).toBeVisible();
        await expect(page.getByRole('checkbox', { name: 'Stoppet' })).toBeVisible();
    });

    test('Mulighet til å opprette stilling, jobbmesse og formidling ', async ({ page }) => {
        await page.getByRole('link', { name: 'Opprett ny stilling' }).click();
        await expect(
            page.getByLabel('Opprett ny stilling, velg').getByText('Stilling', { exact: true })
        ).toBeVisible();
        await expect(page.getByText('Jobbmesse/jobbtreff')).toBeVisible();
        await expect(page.getByText('Formidling', { exact: true })).toBeVisible();
    });

    test('Ser historikken til kandidater ', async ({ page }) => {
        await page.getByRole('link', { name: 'Kandidatsøk' }).click();
        await page.getByRole('link', { name: 'Spasertur, Patent' }).click();
        await expect(page.getByRole('tab', { name: 'Historikk' })).toBeVisible();
    });

    test('Skal kunne legge til kandidat i kandidatliste', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'styrk eller tittel kommer her' }).click();
        await expect(page.getByRole('button', { name: 'Legg til kandidat' })).toBeVisible();
    });
});
