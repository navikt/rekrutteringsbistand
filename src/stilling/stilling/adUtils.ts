import { Miljø, getMiljø } from 'felles/miljø';

const visStillingUrl =
    getMiljø() === Miljø.DevGcp
        ? 'https://vis-stilling.intern.dev.nav.no/arbeid/stilling'
        : 'https://www.nav.no/arbeid/stilling';

export const stillingErPublisert = (ad: any) => {
    if (ad.status === 'INACTIVE' && ad.deactivatedByExpiry === false) {
        return false;
    }

    return true;
};

export const hentAnnonselenke = (uuid?: string) => `${visStillingUrl}/${uuid}`;

export const erDirektemeldtStilling = (source?: string): boolean => source === 'DIR';
