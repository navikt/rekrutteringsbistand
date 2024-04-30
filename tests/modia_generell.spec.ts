import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/modia_generell.json' });

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});

test.describe('Tilgangskontroll: Modia Generell', () => {
    test('1. Gå inn i Oversikt fanen - Skal få en oversikt over gjeldende kontor ', async ({
        page,
    }) => {
        await expect(page.getByText('Delt med arbeidsgiver', { exact: true })).toBeVisible();
        await expect(page.getByText('Fikk jobb')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Stillinger delt med' })).toBeVisible();
    });

    test('2. Se om kandidatsøk-fanen er tilgjengelig - Fanen skal ikke vises', async ({ page }) => {
        await page.getByRole('link', { name: 'Kandidatsøk' }).click();
        await expect(page.getByText('Hei, du trenger rollen')).toBeVisible();

        //todo Tilgangskontroll steg2: Skriv om til at fanen ikke vises
        //   await expect(page.getByRole('link', { name: 'Kandidatsøk' })).not.toBeVisible();
    });

    test('3. Se om formidlings-fanen er tilgjengelig - Fanen skal ikke vises', async ({ page }) => {
        await page.getByRole('link', { name: 'Formidlinger' }).click();

        await expect(page.getByText('Hei, du trenger rollen')).toBeVisible();

        //todo Tilgangskontroll steg2: Skriv om til at fanen ikke vises
        //   await expect(page.getByRole('link', { name: 'Formidlinger' })).not.toBeVisible();
    });

    test('4. Gå inn i stillingssøket - Stillingssøket kan åpnes.', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await expect(page.getByRole('heading', { name: 'Stillinger' })).toBeVisible();
    });

    test('5. Se hvilke stillingsstatuser du kan søke på - Skal kun se "publisert", ikke "stoppet" og "utgått"', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await expect(page.getByRole('checkbox', { name: 'Publisert' })).toBeVisible();
        await expect(page.getByRole('checkbox', { name: 'Utløpt' })).not.toBeVisible();
        await expect(page.getByRole('checkbox', { name: 'Stoppet' })).not.toBeVisible();
    });

    test('6. Gå inn i stilingssøket, se om du ser fanen "Mine stillinger" - Skal ikke se fanen mine stillinger', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();

        await expect(page.getByRole('tab', { name: 'Mine stillinger' })).not.toBeVisible();
    });

    test('7. Gå inn i en intern stilling - Stilingen skal åpnes og vises', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'styrk eller tittel kommer her' }).click();

        await expect(page.getByText('DIR', { exact: true })).toBeVisible();
    });

    test('8. Gå inn i en ekstern stilling - Stilingen skal åpnes og vises', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'ekstern styrk tittel' }).click();

        //TODO Lag ekstern stilling mock
    });

    test('9. Forsøk å overta eierskap for intern stilling - Skal ikke kunne overta eierskap for intern stilling', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'styrk eller tittel kommer her' }).click();
        await expect(page.getByRole('button', { name: 'Marker som min' })).not.toBeVisible();
    });

    test('10. Forsøk å overta eierskap for ekstern stilling - Skal ikke kunne overta eierskap for ekstern stilling, hverken med "marker som min", eller opprett kandidatliste.', async ({
        page,
    }) => {
        //TODO Kopier inn til Arbeidsgiverrettet
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'styrk eller tittel kommer her' }).click();
        await expect(
            page.getByRole('button', { name: 'Opprett kandidatliste', exact: true })
        ).not.toBeVisible();
        await expect(page.getByRole('button', { name: 'Rediger' })).not.toBeVisible();
    });

    test('11 og 12. Forsøk å redigere stilling du eier og ikke eier - N/A', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'styrk eller tittel kommer her' }).click();
        await expect(page.getByRole('button', { name: 'Rediger' })).not.toBeVisible();
    });

    test('12. Forsøk å redigere stilling som du ikke eier', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'styrk eller tittel kommer her' }).click();
        await expect(page.getByRole('button', { name: 'Rediger' })).not.toBeVisible();
    });

    test('13. Gå inn i en direktemeldt stilling, se hvilke knapper for kandidathåndtering som finnes.', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'styrk eller tittel kommer her' }).click();
        await expect(page.getByRole('button', { name: 'Rediger' })).not.toBeVisible();
    });

    // test('', async ({page}) => {})
    // test('', async ({page}) => {})
    // test('', async ({page}) => {})

    // test('Skal se hurtiglenker', async ({ page }) => {
    //     await expect(page.getByRole('link', { name: 'Finn kandidater' })).not.toBeVisible();
    //     await expect(page.getByRole('link', { name: 'Finn stillinger' })).not.toBeVisible();
    //     await expect(page.getByRole('link', { name: 'Se mine stillinger' })).not.toBeVisible();
    //     await expect(page.getByRole('link', { name: 'Opprett ny stilling' })).not.toBeVisible();
    // });
    // test('Skal få advarsel om ikke tistrekkelig tilgang til å se siden.', async ({ page }) => {
    //     await page.getByRole('link', { name: 'Kandidatsøk' }).click();
    //     await expect(page.getByText('Hei, du trenger rollen')).toBeVisible();
    //     await page.getByRole('link', { name: 'Spasertur, Patent' }).click();
    //     await page.getByRole('tab', { name: 'Historikk' }).click();

    //     await expect(page.getByText('Snakk med din nærmeste leder.')).toHaveCount(2);
    // });

    // test('Skal IKKE kunne legge til kandidat i kandidatliste', async ({ page }) => {
    //     await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
    //     await page.getByRole('link', { name: 'styrk eller tittel kommer her' }).click();
    //     await expect(page.getByRole('button', { name: 'Legg til kandidat' })).not.toBeVisible();
    // });

    // test('Skal IKKE kunne se kandidatsøk og formidlingsfane', async ({ page }) => {
    //     await expect(page.getByRole('link', { name: 'Oversikt' })).toBeVisible();
    //     await expect(page.getByRole('link', { name: 'Stillinger', exact: true })).toBeVisible();
    //     await expect(page.getByRole('link', { name: 'Kandidatsøk' })).not.toBeVisible();
    //     await expect(page.getByRole('link', { name: 'Formidlinger' })).not.toBeVisible();
    // });
});
