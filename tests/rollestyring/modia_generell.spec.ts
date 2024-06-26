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
        await expect(page.getByRole('link', { name: 'Kandidatsøk' })).not.toBeVisible();
    });

    test('3. Se om formidlings-fanen er tilgjengelig - Fanen skal ikke vises', async ({ page }) => {
        await expect(
            page.getByRole('link', { name: 'Etterregistrering formidlinger' })
        ).not.toBeVisible();
    });

    test('4. Gå inn i stillingssøket - Stillingssøket kan åpnes.', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await expect(page.getByRole('heading', { name: 'Stillinger' })).toBeVisible();
    });

    test('5. Se hvilke stillingsstatuser du kan søke på - Skal kun se "publisert", ikke "stoppet" og "utløpt"', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await expect(page.getByRole('group', { name: 'Område' })).toBeVisible();
        await expect(page.getByRole('checkbox', { name: 'Publisert' })).not.toBeVisible();
        await expect(page.getByRole('checkbox', { name: 'Utløpt' })).not.toBeVisible();
        await expect(page.getByRole('checkbox', { name: 'Stoppet' })).not.toBeVisible();
    });

    test('6. Gå inn i stilingssøket, se om du ser fanen "Mine stillinger" - Skal ikke se fanen mine stillinger', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();

        await expect(page.getByRole('tab', { name: 'Alle' })).toBeVisible();
        await expect(page.getByRole('tab', { name: 'Mine stillinger' })).not.toBeVisible();
    });

    test('7. Gå inn i en Intern stilling - Stilingen skal åpnes og vises', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();

        await expect(page.getByText('DIR', { exact: true })).toBeVisible();
    });

    test('8. Gå inn i en ekstern stilling - Stilingen skal åpnes og vises', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'Ekstern stilling', exact: true }).click();
        await expect(page.getByRole('tab', { name: 'Om stillingen' })).toBeVisible();
    });

    test('9. Forsøk å overta eierskap for Intern stilling - Skal ikke kunne overta eierskap for Intern stilling', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await expect(page.getByRole('tab', { name: 'Om stillingen' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Marker som min' })).not.toBeVisible();
    });

    test('10. Forsøk å overta eierskap for ekstern stilling - Skal ikke kunne overta eierskap for ekstern stilling, hverken med "marker som min", eller opprett kandidatliste. Rediger knappen skal heller ikke finnes', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await expect(page.getByRole('tab', { name: 'Om stillingen' })).toBeVisible();
        await expect(
            page.getByRole('button', { name: 'Opprett kandidatliste', exact: true })
        ).not.toBeVisible();
        await expect(page.getByRole('button', { name: 'Rediger' })).not.toBeVisible();
    });

    test('11. Forsøk å redigere stilling du eier - Redigerknappen skal ikke vises, så du kan ikke redigere stillingen', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await expect(page.getByRole('tab', { name: 'Om stillingen' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Rediger' })).not.toBeVisible();
    });

    test('12. Forsøk å redigere stilling som du ikke eier', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await expect(page.getByRole('tab', { name: 'Om stillingen' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Rediger' })).not.toBeVisible();
    });

    test('13. Gå inn i en direktemeldt stilling, se hvilke knapper for kandidathåndtering som finnes - Skal ikke se "Finn kandidat". Skal ikke se "Legg til kandidat"', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await expect(page.getByRole('tab', { name: 'Om stillingen' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Finn kandidater' })).not.toBeVisible();
        await expect(page.getByRole('button', { name: 'Legg til kandidat' })).not.toBeVisible();
    });

    test('14. Gå inn i en direktemeldt stilling du eier. Sjekk om fanen kandidater vises. - Fanen skal ikke vises.', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'Intern stilling MIN', exact: true }).click();
        await expect(page.getByRole('tab', { name: 'Om stillingen' })).toBeVisible();
        await expect(page.getByRole('tab', { name: 'Kandidater' })).not.toBeVisible();
    });

    test('15. Gå inn i en direktemeldt stilling der du ikke er eier. Sjekk om fanen Kandidater vises - Fanen skal ikke vises', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await expect(page.getByRole('tab', { name: 'Om stillingen' })).toBeVisible();
        await expect(page.getByRole('tab', { name: 'Kandidater' })).not.toBeVisible();
    });

    test('16. Forsøk å åpne en cv via lenke. Eksempel i test: http://localhost:3000/kandidater/kandidat/PAM0yp25c81t/cv?fraKandidatsok=true', async ({
        page,
    }) => {
        await page.goto(
            'http://localhost:3000/kandidater/kandidat/PAM0yp25c81t/cv?fraKandidatsok=true'
        );

        await expect(
            page.getByText(
                'Hei, du trenger rollen Arbeidsgiverrettet eller Jobbsøkerrettet for å få tilgang til innhold på denne siden. Husk at du må ha et tjenstlig behov for det den spesifikke rollen gir deg tilgang til. Snakk med din nærmeste leder.'
            )
        ).toBeVisible;
    });

    test('17. Inne i en kandidat, sjekk om historikkfanen vises - Historikkfanen skal ikke vises', async ({
        page,
    }) => {
        await page.goto(
            'http://localhost:3000/kandidater/kandidat/PAM0yp25c81t/cv?fraKandidatsok=true'
        );

        await expect(
            page.getByText(
                'Hei, du trenger rollen Arbeidsgiverrettet eller Jobbsøkerrettet for å få tilgang til innhold på denne siden. Husk at du må ha et tjenstlig behov for det den spesifikke rollen gir deg tilgang til. Snakk med din nærmeste leder.'
            )
        ).toBeVisible;
    });

    test('18. Forsøk å opprette stilling - Skal ikke kunne opprette stilling', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Ditt NAV-kontor' })).toBeVisible();
        // Forside knapp:
        await expect(page.getByRole('link', { name: 'Opprett ny stilling' })).not.toBeVisible();
        await page.getByRole('link', { name: 'Stillinger' }).click();
        // Knapp inne i stillingssiden:
        await expect(page.getByRole('heading', { name: 'Stillinger' })).toBeVisible();
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
