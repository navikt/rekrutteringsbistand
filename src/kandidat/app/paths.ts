import { KandidatQueryParam } from '../kandidatside/Kandidatside';

import { KandidatsokQueryParam } from 'felles/lenker';

export const lenkeTilTilgangsside = `/kandidater/mangler-tilgang`;
export const lenkeTilKandidatliste = (stillingId: string, filterQuery?: URLSearchParams) => {
    let lenke = `/stillinger/stilling/${stillingId}/kandidater`;

    if (filterQuery) {
        lenke += `?${filterQuery}`;
    }

    return lenke;
};

export const lenkeTilKandidatsøk = (searchParams?: string) => {
    let url = '/kandidatsok';

    if (searchParams) {
        url += '?' + searchParams;
    }

    return url;
};

export const lenkeTilFinnKandidater = (stillingId: string) => {
    const queryParams = new URLSearchParams();
    queryParams.set(KandidatsokQueryParam.BrukKriterierFraStillingen, 'true');
    queryParams.set(KandidatsokQueryParam.Stilling, stillingId);
    return `/kandidatsok?${queryParams.toString()}`;
};

export enum Kandidatfane {
    Cv = 'cv',
    Historikk = 'historikk',
}

export const lenkeTilKandidatside = (
    kandidatnr: string,
    aktivFane: Kandidatfane,
    stillingId?: string | null,
    fraKandidatliste?: boolean,
    fraKandidatsøk?: boolean
) =>
    aktivFane === Kandidatfane.Cv
        ? lenkeTilCv(kandidatnr, stillingId, fraKandidatliste, fraKandidatsøk)
        : lenkeTilHistorikk(kandidatnr, stillingId, fraKandidatliste, fraKandidatsøk);

export const lenkeTilCv = (
    kandidatnr: string,
    stillingId?: string | null,
    fraKandidatliste?: boolean,
    fraKandidatsøk?: boolean
) => {
    let lenke = `/kandidater/kandidat/${kandidatnr}/cv`;
    return lenke + queryParamsForKandidatside(stillingId, fraKandidatliste, fraKandidatsøk);
};

export const lenkeTilHistorikk = (
    kandidatnr: string,
    stillingId?: string | null,
    fraKandidatliste?: boolean,
    fraKandidatsøk?: boolean
) => {
    let lenke = `/kandidater/kandidat/${kandidatnr}/historikk`;
    return lenke + queryParamsForKandidatside(stillingId, fraKandidatliste, fraKandidatsøk);
};

const queryParamsForKandidatside = (
    stillingId?: string | null,
    fraKandidatliste?: boolean,
    fraKandidatsøk?: boolean
) => {
    let queryParams = new URLSearchParams();

    if (fraKandidatliste) {
        queryParams.set(KandidatQueryParam.FraKandidatliste, 'true');
    }

    if (fraKandidatsøk) {
        queryParams.set(KandidatQueryParam.FraKandidatsøk, 'true');
    }

    if (stillingId) {
        queryParams.set(KandidatQueryParam.StillingId, stillingId);
    }

    return queryParams.size === 0 ? '' : `?${queryParams.toString()}`;
};
