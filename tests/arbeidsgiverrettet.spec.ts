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

    test('2. Se om kandidatsøk-fanen er tilgjengelig. - Fanen skal vises', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Kandidatsøk' })).toBeVisible();
    });
    test('3. Se om formidlings-fanen er tilgjengelig - Fanen skal vises', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Formidling' })).toBeVisible();
    });
    test('4. Gå inn i stillingssøket - Stillingssøket kan åpnes.', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await expect(page.getByRole('heading', { name: 'Stillinger' })).toBeVisible();
    });
    test('5. Se hvilke stillingsstatuser du kan søke på - Skal se "publisert", "stoppet" og "utgått"', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await expect(page.getByRole('checkbox', { name: 'Publisert' })).toBeVisible();
        await expect(page.getByRole('checkbox', { name: 'Utløpt' })).toBeVisible();
        await expect(page.getByRole('checkbox', { name: 'Stoppet' })).toBeVisible();
    });
    test('6. Gå inn i stilingssøket, se om du ser fanen "Mine stillinger" - Skal se fanen "Mine stillinger"', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await expect(page.getByRole('tab', { name: 'Mine stillinger' })).toBeVisible();
    });
    test('7. Gå inn i en intern stilling - Stillingen kan åpnes og vises', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await expect(page.getByRole('tab', { name: 'Om stillingen' })).toBeVisible();
    });
    test('8. Gå inn i en ekstern stilling - Stillingen kan åpnes og vises', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Ekstern stilling', exact: true }).click();
        await expect(page.getByRole('tab', { name: 'Om stillingen' })).toBeVisible();
    });
    test('9. Forsøk å overta eierskap for intern stilling - Skal kunne overta eierskap for intern stilling', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await page.getByRole('button', { name: 'Marker som min' }).click();
        await expect(
            page
                .getByLabel('Marker stillingen som min')
                .getByRole('button', { name: 'Marker som min' })
        ).toBeVisible();
    });
    test('10. Forsøk å overta eierskap for ekstern stilling - Skal kunne overta eierskap for intern stilling', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Ekstern stilling', exact: true }).click();
        await page.getByRole('button', { name: 'Marker som min' }).click();
        await expect(
            page
                .getByLabel('Marker stillingen som min')
                .getByRole('button', { name: 'Marker som min' })
        ).toBeVisible();
    });
    test('11. Forsøk å redigere stilling som du eier - Skal kunne redigere stilling', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling MIN' }).click();
        await expect(page.getByRole('button', { name: 'Rediger' })).toBeVisible();
    });
    test('12a. Forsøk å redigere intern stilling du ikke eier - Skal ikke kunne redigere stilling', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling' }).click();
        await expect(page.getByRole('button', { name: 'Rediger' })).not.toBeVisible();
    });
    test('12b. Forsøk å redigere ekstern stilling du ikke eier - Skal ikke kunne redigere stilling', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Ekstern stilling' }).click();
        await expect(page.getByRole('button', { name: 'Rediger' })).not.toBeVisible();
    });
    test('13. Gå inn i en direktemeldt stilling, se hvilke knapper for kandidathåndtering som finnes. - Skal ikke se "Finn kandidat". Skal se "Legg til kandidat', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await expect(page.getByRole('button', { name: 'Legg til kandidat' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Finn kandidater' })).not.toBeVisible();
    });
    test('14. Gå inn i en direktemeldt stilling der du er eier. Sjekk om fanen kandidater vises. - Fanen skal vises ', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling MIN' }).click();
        await expect(page.getByRole('tab', { name: 'Kandidater' })).toBeVisible();
    });
    test('15. Gå inn i en direktemeldt stilling der du ikke er eier. Sjekk om fanen kandidater vises. - Fanen skal ikke vises ', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await expect(page.getByRole('tab', { name: 'Kandidater' })).not.toBeVisible();
    });
    test('17a. Forsøk å åpne en cv, først via kandidatliste, så via kandidatsøk, og deretter via lenke. Eksempel i test: https://rekrutteringsbistand.intern.dev.nav.no/kandidater/kandidat/PAM0xtfrwli5/cv?fraKandidatsok=true', async ({
        page,
    }) => {
        // TODO mangler mock på kandidat i kandidatliste
    });
    test('17b. Forsøk å åpne en cv, først via kandidatliste, så via kandidatsøk, og deretter via lenke. Eksempel i test: https://rekrutteringsbistand.intern.dev.nav.no/kandidater/kandidat/PAM0xtfrwli5/cv?fraKandidatsok=true', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Kandidatsøk' }).click();
        await page.getByRole('link', { name: 'Spasertur, Patent' }).click(); // TODO kanskje ha samsvar på navn mellom kandidatsøk og kandidatmock
        await expect(page.getByRole('tab', { name: 'Historikk' })).toBeVisible();
        await page.getByRole('tab', { name: 'Historikk' }).click();
        await expect(page.getByRole('cell', { name: 'Lagt i listen' })).toBeVisible();
        await expect(page.getByText('Hei, du trenger rollen')).not.toBeVisible();
    });
    test('17c. Forsøk å åpne en cv, først via kandidatliste, så via kandidatsøk, og deretter via lenke. Eksempel i test: https://rekrutteringsbistand.intern.dev.nav.no/kandidater/kandidat/PAM0xtfrwli5/cv?fraKandidatsok=true', async ({
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
    test('18. Forsøk å opprette stilling - Skal kunne opprette stilling', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('button', { name: 'Opprett ny' }).click();
        await expect(page.getByRole('radio', { name: 'Stilling' })).toBeVisible();
    });
    test('19. Forsøk å opprette jobbmessse - Skal kunne opprette jobbmesse', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('button', { name: 'Opprett ny' }).click();
        await expect(page.getByRole('radio', { name: 'Jobbmesse/jobbtreff' })).toBeVisible();
    });
    test('20. Forsøk å opprette formidling - Skal kunne opprette formidling', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger' }).click();
        await page.getByRole('button', { name: 'Opprett ny' }).click();
        await expect(page.getByRole('radio', { name: 'Formidling' })).toBeVisible();
    });
    // test('', async ({ page }) => {});
});
