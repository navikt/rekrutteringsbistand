import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/arbeigsgiverrettet.json' });

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});

const leggTilSynligKandidat = async (page) => {
    await page.getByRole('button', { name: 'Legg til kandidat' }).click();
    await page.getByPlaceholder('siffer').click();
    await page.getByPlaceholder('siffer').fill('28125314475');
    await page.getByRole('button', { name: 'Legg til', exact: true }).click();
    await expect(page.getByText('SuksessKandidat Ola Nordmann')).toBeVisible();
};

const leggTilUsynligKandidat = async (page) => {
    await page.getByRole('button', { name: 'Legg til kandidat' }).click();
    await page.getByPlaceholder('siffer').click();
    await page.getByPlaceholder('siffer').fill('22078738700');
    await expect(page.getByText('Kandidaten er ikke synlig i')).toBeVisible();
};

const formidleUsynligKandidat = async (page) => {
    await page.getByRole('button', { name: 'Legg til kandidat' }).click();
    await page.getByPlaceholder('siffer').click();
    await page.getByPlaceholder('siffer').fill('22078738700');
    await page.getByRole('button', { name: 'Registrer formidling' }).click();
    await expect(page.getByText('Registrer formidling for Kari:')).toBeVisible();
};

const formidleSynligKandidat = async (page) => {
    await page.getByRole('button', { name: 'Legg til kandidat' }).click();
    await page.getByPlaceholder('siffer').click();
    await page.getByPlaceholder('siffer').fill('28125314475');
    await page.getByRole('button', { name: 'Registrer formidling' }).click();
    await expect(page.getByText('Registrer formidling for Ola:')).toBeVisible();
};

test.describe('Legg til kandidat knapp - Arbeidsgiverrettet', () => {
    test('Skal kunne legge til SYNLIG kandidat på STILLING man er eier', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('tab', { name: 'Mine stillinger' }).click();
        await page.getByRole('link', { name: 'Intern stilling MIN' }).click();
        await leggTilSynligKandidat(page);
    });

    test('Skal ikke kunne legge til USYNLIG kandidat på STILLING man er eier', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('tab', { name: 'Mine stillinger' }).click();
        await page.getByRole('link', { name: 'Intern stilling MIN' }).click();
        await leggTilUsynligKandidat(page);
    });

    // Todo kommer:
    // test('Skal kunne formidle SYNLIG kandidat på STILLING man er eier', async ({ page }) => {
    //     await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
    //     await page.getByRole('tab', { name: 'Mine stillinger' }).click();
    //     await page.getByRole('link', { name: 'Intern stilling MIN' }).click();
    //     await formidleSynligKandidat(page);
    // });

    test('Skal kunne formidle USYNLIG kandidat på STILLING man er eier', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('tab', { name: 'Mine stillinger' }).click();
        await page.getByRole('link', { name: 'Intern stilling MIN' }).click();
        await formidleUsynligKandidat(page);
    });

    test('Skal kunne legge til SYNLIG kandidat på STILLING man IKKE er eier', async ({ page }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await page.getByRole('button', { name: 'Legg til kandidat' }).click();
        await page.getByPlaceholder('siffer').click();
        await page.getByPlaceholder('siffer').fill('28125314475');
        await page.getByRole('button', { name: 'Legg til', exact: true }).click();
        await expect(page.getByText('SuksessKandidat Ola Nordmann')).toBeVisible();
    });

    test('Skal ikke kunne legge til USYNLIG kandidat på STILLING man IKKE er eier', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await page.getByRole('button', { name: 'Legg til kandidat' }).click();
        await page.getByPlaceholder('siffer').click();
        await page.getByPlaceholder('siffer').fill('22078738700');
        await expect(
            page.getByText('Kandidaten er ikke synlig i Rekrutteringsbistand')
        ).toBeVisible();
        await expect(page.getByRole('button', { name: 'Legg til', exact: true })).toBeDisabled();
    });

    test('Skal IKKE kunne formidle SYNLIG kandidat på STILLING man er IKKE eier', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await page.getByRole('button', { name: 'Legg til kandidat' }).click();
        await page.getByPlaceholder('siffer').click();
        await page.getByPlaceholder('siffer').fill('28125314475');
        await expect(page.getByText('Ola Nordmann')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Registrer formidling' })).not.toBeVisible();
    });

    test('Skal IKKE kunne formidle USYNLIG kandidat på STILLING man er IKKE eier', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Stillinger', exact: true }).click();
        await page.getByRole('link', { name: 'Intern stilling', exact: true }).click();
        await page.getByRole('button', { name: 'Legg til kandidat' }).click();
        await page.getByPlaceholder('siffer').click();
        await page.getByPlaceholder('siffer').fill('22078738700');
        await expect(
            page.getByText('Kandidaten er ikke synlig i Rekrutteringsbistand')
        ).toBeVisible();
        await expect(page.getByRole('button', { name: 'Registrer formidling' })).not.toBeVisible();
    });

    test('Skal kunne legge til SYNLIG kandidat på FORMIDLING man er eier', async ({ page }) => {
        await page.getByRole('link', { name: 'Formidlinger' }).click();
        await page.getByRole('link', { name: 'Formidling MIN' }).click();
        await leggTilSynligKandidat(page);
    });

    test('Skal kunne legge til USYNLIG kandidat på FORMIDLING man er eier', async ({ page }) => {
        await page.getByRole('link', { name: 'Formidlinger' }).click();
        await page.getByRole('link', { name: 'Formidling MIN' }).click();
        await leggTilUsynligKandidat(page);
    });

    // Todo kommer:
    // test('Skal kunne formidle SYNLIG kandidat på FORMIDLING man er eier', async ({ page }) => {
    //     await page.getByRole('link', { name: 'Formidlinger' }).click();
    //     await page.getByRole('link', { name: 'Formidling MIN' }).click();
    //     await formidleSynligKandidat(page);
    // });

    test('Skal kunne formidle USYNLIG kandidat på FORMIDLING man er eier', async ({ page }) => {
        await page.getByRole('link', { name: 'Formidlinger' }).click();
        await page.getByRole('link', { name: 'Formidling MIN' }).click();
        await formidleUsynligKandidat(page);
    });

    test('Skal IKKE kunne legge til og formidle SYNLIG kandidat på FORMIDLING man IKKE er eier', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Formidlinger' }).click();
        await page.getByRole('link', { name: 'Formidling', exact: true }).click();
        await expect(page.getByRole('tab', { name: 'Om stillingen' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Legg til kandidat' })).not.toBeVisible();
    });

    test('Skal IKKE kunne legge til og formidle USYNLIG kandidat på FORMIDLING man IKKE er eier', async ({
        page,
    }) => {
        await page.getByRole('link', { name: 'Formidlinger' }).click();
        await page.getByRole('link', { name: 'Formidling', exact: true }).click();
        await expect(page.getByRole('tab', { name: 'Om stillingen' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Legg til kandidat' })).not.toBeVisible();
    });
});
