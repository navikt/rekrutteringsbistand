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
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
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

    test('11. Forsøk å redigere intern stilling du eier - Skal ikke kunne redigere stilling', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling MIN' }).click();
        await expect(page.getByRole('button', { name: 'Rediger' })).not.toBeVisible();
    });

    test('11b. Forsøk å redigere ekstern stilling du eier - Skal ikke kunne redigere stilling', async ({
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

        await expect(page.getByText('Hei, du trenger rollen')).not.toBeVisible();

        await expect(page.getByRole('tab', { name: 'Oversikt' })).toBeVisible();
    });

    test('17. Inne i en kandidat, sjekk om historikkfanen vises - Historikkfanen skal vises', async ({
        page,
    }) => {
        await page.goto(
            'http://localhost:3000/kandidater/kandidat/PAM0yp25c81t/cv?fraKandidatsok=true'
        );

        await expect(page.getByRole('tab', { name: 'Historikk' })).toBeVisible();
        await page.getByRole('tab', { name: 'Historikk' }).click();
        await expect(page.getByRole('cell', { name: 'Lagt i listen' })).toBeVisible();
        await expect(page.getByText('Hei, du trenger rollen')).not.toBeVisible();
    });

    test('18. Forsøk å opprette stilling - Skal ikke kunne opprette stilling', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Ditt NAV-kontor' })).toBeVisible();

        // Forside knapp:
        await expect(page.getByRole('link', { name: 'Opprett ny stilling' })).not.toBeVisible();
        await page.getByRole('link', { name: 'Stillinger' }).click();

        // Knapp inne i stillingssiden:
        await page.getByRole('button', { name: 'Opprett ny' }).click();
        await expect(page.getByText('Hva skal du bruke stillingen')).toBeVisible();

        await expect(page.getByRole('radio', { name: 'Stilling' })).not.toBeVisible();
    });

    test('19. Forsøk å opprette jobbmessse - Skal ikke kunne opprette jobbmesse', async ({
        page,
    }) => {
        await expect(page.getByRole('heading', { name: 'Ditt NAV-kontor' })).toBeVisible();

        // Forside knapp:
        await expect(page.getByRole('link', { name: 'Opprett ny stilling' })).not.toBeVisible();
        await page.getByRole('link', { name: 'Stillinger' }).click();

        // Knapp inne i stillingssiden:
        await page.getByRole('button', { name: 'Opprett ny' }).click();
        await expect(page.getByText('Hva skal du bruke stillingen')).toBeVisible();

        await expect(page.getByRole('radio', { name: 'Jobbmesse/jobbtreff' })).not.toBeVisible();
    });

    test('20. Forsøk å opprette formidling - Skal kunne opprette formidling', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Ditt NAV-kontor' })).toBeVisible();

        // Forside knapp:
        await expect(page.getByRole('link', { name: 'Opprett ny stilling' })).not.toBeVisible();
        await page.getByRole('link', { name: 'Stillinger' }).click();

        // Knapp inne i stillingssiden:
        await page.getByRole('button', { name: 'Opprett ny' }).click();
        await expect(page.getByText('Hva skal du bruke stillingen')).toBeVisible();

        await expect(page.getByRole('radio', { name: 'Formidling' })).toBeVisible();
    });

    test('21. Søk etter kandidater ved å velge flere kontor - Skal få opp kandidater', async ({
        page,
    }) => {
        // TODO: Endre ved område implementering

        await page.getByRole('link', { name: 'Kandidatsøk' }).click();
        await page.getByRole('button', { name: 'Søk' }).click();
        await expect(page.getByText('Spasertur, Patent')).toBeVisible();
    });

    test('22.Søk etter kandidater for mine brukere - Skal få opp kandidater', async ({ page }) => {
        // TODO: Endre ved område implementering

        await page.getByRole('link', { name: 'Kandidatsøk' }).click();
        await page.getByRole('tab', { name: 'Mine brukere' }).click();
        await expect(page.getByText('Spasertur, Patent')).toBeVisible();
    });

    test('23.Søk etter kandidater for mitt kontor - Skal få opp kandidater', async ({ page }) => {
        // TODO: Endre ved område implementering

        await page.getByRole('link', { name: 'Kandidatsøk' }).click();
        await page.getByRole('tab', { name: 'Mitt kontor' }).click();
        await expect(page.getByText('Spasertur, Patent')).toBeVisible();
    });

    test('24 .For fomidling du eier: Forsøk å velge "Legg til kandidat"  og sett kandidat som "presentert" ', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Formidlinger' }).click();
        await page.getByRole('link', { name: 'Formidling MIN' }).click();
        await page.getByRole('button', { name: 'Legg til kandidat' }).click();
        await page.getByPlaceholder('siffer').click();
        await page.getByPlaceholder('siffer').fill('28125314475');
        await page.getByRole('button', { name: 'Registrer formidling' }).click();
        await page.getByLabel('Registrer at personen er blitt presentert').check();
        await page.getByRole('button', { name: 'Legg til', exact: true }).click();
        await expect(
            page.getByLabel('Legg til kandidat').getByLabel('Suksess').locator('path')
        ).toBeVisible();
    });

    test('25 For fomidling du eier: Forsøk å velge "Legg til kandidat" ', async ({ page }) => {
        await page.getByRole('link', { name: 'Formidlinger' }).click();
        await page.getByRole('tab', { name: 'Mine formidlinger' }).click();
        await page.getByRole('link', { name: 'Formidling MIN' }).click();
        await page.getByRole('button', { name: 'Legg til kandidat' }).click();
        await expect(page.getByText('Fødselsnummer på kandidaten')).toBeVisible();
    });

    // test('26 For fomidling du eier: Forsøk å velge "Finn kandidater"', async ({ page }) => {
    //     await page.getByRole('link', { name: 'Formidlinger' }).click();
    //     await page.getByRole('tab', { name: 'Mine formidlinger' }).click();
    //     await page.getByRole('link', { name: 'Formidling MIN' }).click();
    //     await page.getByRole('button', { name: 'Finn kandidater' }).click();
    //     await expect(page.getByText('Marker alle på siden')).toBeVisible();
    // });

    // test('27a For fomidling du eier: sett kandidat som "Fått jobben" ', async ({ page }) => {
    //     await page.getByRole('link', { name: 'Formidlinger' }).click();
    //     await page.getByRole('tab', { name: 'Mine formidlinger' }).click();
    //     await page.getByRole('link', { name: 'Formidling MIN' }).click();
    //     await page.getByRole('tab', { name: 'Kandidater' }).click();
    //     await page
    //         .getByRole('row', { name: '​ Jobbsøker, Jarle' })
    //         .getByLabel('Endre status eller hendelser')
    //         .click();
    //     await page.getByRole('button', { name: 'Registrer at kandidaten har f' }).click();
    //     await expect(page.getByRole('button', { name: 'Registrere fått jobben' })).toBeVisible();
    // });

    // test('27b For fomidling du eier: sett kandidat som "presentert"', async ({ page }) => {
    //     await page.getByRole('link', { name: 'Formidlinger' }).click();
    //     await page.getByRole('tab', { name: 'Mine formidlinger' }).click();
    //     await page.getByRole('link', { name: 'Formidling MIN' }).click();
    //     await page.getByRole('tab', { name: 'Kandidater' }).click();
    //     await page
    //         .getByRole('row', { name: '​ Jobbsøker, Jarle' })
    //         .getByLabel('Endre status eller hendelser')
    //         .click();
    //     await page.getByRole('button', { name: 'Registrer manuelt' }).click();
    //     await expect(page.getByRole('button', { name: 'CV-en er blitt delt' })).toBeVisible();
    // });
});
