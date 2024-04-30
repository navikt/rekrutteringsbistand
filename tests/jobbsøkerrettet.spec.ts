import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/jobbsokerrettet.json' });

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});

test.describe('Tilgangskontroll: Jobbsøkerrettet', () => {
    test('1. Gå inn i Oversikt fanen - Skal få en oversikt over gjeldende kontor ', async ({
        page,
    }) => {
        await expect(page.getByText('Delt med arbeidsgiver', { exact: true })).toBeVisible();
        await expect(page.getByText('Fikk jobb')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Stillinger delt med' })).toBeVisible();
    });

    test('2. Se om kandidatsøk-fanen er tilgjengelig - Fanen skal vises', async ({ page }) => {
        await page.getByRole('link', { name: 'Kandidatsøk' }).click();
        await expect(page.getByText('Hei, du trenger rollen')).not.toBeVisible();
    });

    test('3. Se om formidlings-fanen er tilgjengelig - Fanen skal vises', async ({ page }) => {
        await page.getByRole('link', { name: 'Formidlinger' }).click();

        await expect(page.getByText('Hei, du trenger rollen')).not.toBeVisible();
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
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await expect(page.getByRole('tab', { name: 'Mine stillinger' })).not.toBeVisible();
    });

    test('7. Gå inn i en Intern stilling - Stilingen skal åpnes og vises', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling' }).click();
        await expect(page.getByText('DIR', { exact: true })).toBeVisible();
    });

    test('8. Gå inn i en ekstern stilling - Stilingen skal åpnes og vises', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Ekstern stilling', exact: true }).click();
    });

    test('9. Forsøk å overta eierskap for Intern stilling - Skal ikke kunne overta eierskap for Intern stilling', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await expect(page.getByRole('button', { name: 'Marker som min' })).not.toBeVisible();
    });

    test('10. Forsøk å overta eierskap for ekstern stilling - Skal ikke kunne overta eierskap for ekstern stilling, hverken med "marker som min", eller opprett kandidatliste.', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Ekstern stilling', exact: true }).click();
        await expect(
            page.getByRole('button', { name: 'Opprett kandidatliste', exact: true })
        ).not.toBeVisible();
        await expect(page.getByRole('button', { name: 'Rediger' })).not.toBeVisible();
    });

    test('11. Forsøk å redigere stilling du eier - Skal ikke kunne redigere stilling', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling MIN' }).click();
        await expect(page.getByRole('button', { name: 'Rediger' })).not.toBeVisible();
    });

  test('11b. Forsøk å redigere stilling du eier - Skal ikke kunne redigere stilling', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Ekstern stilling MIN' }).click();
        await expect(page.getByRole('button', { name: 'Rediger' })).not.toBeVisible();
    });

    test('12. Forsøk å redigere intern stilling som du ikke eier', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await expect(page.getByRole('button', { name: 'Rediger' })).not.toBeVisible();
    });

    test('12b. Forsøk å redigere ekstern stilling som du ikke eier', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Ekstern stilling', exact: true }).click();
        await expect(page.getByRole('button', { name: 'Rediger' })).not.toBeVisible();
    });

    test('13. Gå inn i en direktemeldt stilling, se hvilke knapper for kandidathåndtering som finnes - Skal ikke se "Finn kandidat". Skal  se "Legg til kandidat"', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await expect(page.getByRole('button', { name: 'Finn kandidater' })).not.toBeVisible();
        await expect(page.getByRole('button', { name: 'Legg til kandidat' })).toBeVisible();
    });

    test('14. Gå inn i en direktemeldt stilling du eier. Sjekk om fanen kandidater vises. - Fanen skal ikke vises.', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling MIN' }).click();

        await expect(page.getByRole('tab', { name: 'Kandidater' })).not.toBeVisible();
    });

    test('15. Gå inn i en direktemeldt stilling der du ikke er eier. Sjekk om fanen kandidater vises. - Skal ikke vises', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Ekstern stilling', exact: true }).click();

        await expect(page.getByRole('tab', { name: 'Kandidater' })).not.toBeVisible();
    });

    test('16. Forsøk å åpne en cv via lenke. Eksempel i test: http://localhost:3000/kandidater/kandidat/PAM0yp25c81t/cv?fraKandidatsok=true', async ({
        page,
    }) => {
        await page.goto(
            'http://localhost:3000/kandidater/kandidat/PAM0yp25c81t/cv?fraKandidatsok=true'
        );

        //todo Tilgangskontroll steg2: Skriv om til at innhold ikke skal vises

        await expect(page.getByText('Hei, du trenger rollen')).toBeVisible();

        //TODO Denne skal bli not visible i steg2:
        await expect(page.getByRole('tab', { name: 'Oversikt' })).toBeVisible();
    });

    test('17. Inne i en kandidat, sjekk om historikkfanen vises - Historikkfanen skal ikke vises', async ({
        page,
    }) => {
        await page.goto(
            'http://localhost:3000/kandidater/kandidat/PAM0yp25c81t/cv?fraKandidatsok=true'
        );

        //todo Tilgangskontroll steg2: Skriv om til at innhold ikke skal vises
        await expect(page.getByText('Hei, du trenger rollen')).toBeVisible();

        await expect(page.getByRole('tab', { name: 'Historikk' })).not.toBeVisible();
    });

    test('18. Forsøk å opprette stilling - Skal ikke kunne opprette stilling', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Ditt NAV-kontor' })).toBeVisible();
        // Forside knapp:
        await expect(page.getByRole('link', { name: 'Opprett ny stilling' })).not.toBeVisible();
        await page.getByRole('link', { name: 'Stillinger' }).click();
        // Knapp inne i stillingssiden:
        await expect(page.getByRole('button', { name: 'Opprett ny' })).not.toBeVisible();
    });

    test('19. Forsøk å opprette jobbmessse - Skal ikke kunne opprette jobbmesse', async ({
        page,
    }) => {
        await expect(page.getByRole('heading', { name: 'Ditt NAV-kontor' })).toBeVisible();
        // Forside knapp:
        await expect(page.getByRole('link', { name: 'Opprett ny stilling' })).not.toBeVisible();
    });

    test('20. Forsøk å opprette formidling - Skal ikke kunne opprette formidling', async ({
        page,
    }) => {
        await expect(page.getByRole('heading', { name: 'Ditt NAV-kontor' })).toBeVisible();
        // Forside knapp:
        await expect(page.getByRole('link', { name: 'Opprett ny stilling' })).not.toBeVisible();
    });
});
