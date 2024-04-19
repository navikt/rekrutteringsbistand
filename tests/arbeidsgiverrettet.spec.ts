import { test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/arbeigsgiverrettet.json' });

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});

test.describe('Tilgangskontroll: Arbeigsgiverrettet', () => {
    test('Viser alle faner ', async ({ page }) => {
        await page.getByRole('link', { name: 'Oversikt' });
        await page.getByRole('link', { name: 'Stillinger', exact: true });
        await page.getByRole('link', { name: 'Kandidatsøk' });
        await page.getByRole('link', { name: 'Formidlinger' });
    });

    test('Mulighet til å søke på Publisert, Utløpt og Stoppet stillinger ', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('checkbox', { name: 'Publisert' });
        await page.getByRole('checkbox', { name: 'Utløpt' });
        await page.getByRole('checkbox', { name: 'Stoppet' });
    });

    test('Mulighet til å opprette stilling, jobbmesse og formidling ', async ({ page }) => {
        await page.getByRole('link', { name: 'Opprett ny stilling' }).click();
        await page
            .getByLabel('Opprett ny stilling, velg')
            .getByText('Stilling', { exact: true })
            .click();
        await page.getByText('Jobbmesse/jobbtreff').click();
        await page.getByText('Formidling', { exact: true }).click();
    });

    test('Ser historikken til kandidater ', async ({ page }) => {
        await page.getByRole('link', { name: 'Kandidatsøk' }).click();
        await page.getByRole('link', { name: 'Spasertur, Patent' }).click();
        await page.getByRole('tab', { name: 'Historikk' }).click();
    });
});
