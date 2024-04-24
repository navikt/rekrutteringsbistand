import { expect, test as setup } from '@playwright/test';

const velgRolle = async ({ page, rolle, json }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Mocks' }).click();
    await page.getByRole('button', { name: rolle }).click();
    await page.getByRole('button', { name: 'Lukk', exact: true }).click();
    await page.waitForLoadState('load');
    expect(page.getByRole('heading', { name: 'Rekrutteringsbistand' })).toBeTruthy();
    await page.context().storageState({ path: json });
};

setup('Bruk rolle Arbeidsgiverrettet', async ({ page }) => {
    await velgRolle({
        page,
        rolle: 'AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET',
        json: 'playwright/.auth/arbeigsgiverrettet.json',
    });
});

setup('Bruk rolle Jobbsøkerrettet', async ({ page }) => {
    await velgRolle({
        page,
        rolle: 'AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET',
        json: 'playwright/.auth/jobbsokerrettet.json',
    });
});

setup('Bruk rolle Modia Generell', async ({ page }) => {
    await velgRolle({
        page,
        rolle: 'AD_GRUPPE_MODIA_GENERELL_TILGANG',
        json: 'playwright/.auth/modia_generell.json',
    });
});
