import { api, post } from 'felles/api';
import { ApiError } from '../../api/apiUtils';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { KandidatLookup } from 'felles/domene/kandidat/Kandidat';
import Synlighetsevaluering from 'felles/domene/synlighet/Synlighetsevaluering';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { EsQuery, EsResponse } from 'felles/domene/elastic/ElasticSearch';

export const fetchSynlighetsevaluering = async (
    fødselsnummer: string
): Promise<Nettressurs<Synlighetsevaluering>> => {
    const url = `${api.synlighet}/evaluering/${fødselsnummer}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        if (response.ok) {
            const body = await response.json();

            return {
                kind: Nettstatus.Suksess,
                data: body,
            };
        } else {
            throw new ApiError(await response.text(), response.status);
        }
    } catch (e) {
        return {
            kind: Nettstatus.Feil,
            error: {
                message: 'Nettverksfeil',
            },
        };
    }
};

export class KandidatSokError {
    message: string;
    status: number;

    constructor(error) {
        this.message = error.message;
        this.status = error.status;
    }
}

export const fetchKandidatMedFnr = async (fnr: string): Promise<Nettressurs<KandidatLookup>> => {
    try {
        const response = await post<EsResponse<KandidatLookup>>(api.kandidatsøk, byggQueryFnr(fnr));

        if (response.kind === Nettstatus.Suksess) {
            const data = response.data.hits.hits[0]?._source;
            if (data) {
                return {
                    kind: Nettstatus.Suksess,
                    data,
                };
            } else {
                return {
                    kind: Nettstatus.FinnesIkke,
                };
            }
        } else {
            return {
                kind: Nettstatus.Feil,
                error: { message: 'Klarte ikke å hente data for kandidaten' },
            };
        }
    } catch (e) {
        return {
            kind: Nettstatus.Feil,
            error: e,
        };
    }
};

const byggQueryFnr = (
    fodselsnummer: string
): EsQuery<{
    fodselsnummer: string;
}> => ({
    query: {
        term: {
            fodselsnummer,
        },
    },
    size: 1,
});

export const fetchKandidatliste = (stillingsId: string): Promise<Kandidatliste> =>
    fetchJson(`${api.kandidat}/veileder/stilling/${stillingsId}/kandidatliste`);

async function fetchJson(url) {
    try {
        const response = await fetch(url, { credentials: 'include' });
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        let error;
        try {
            error = await response.json();
        } catch (e) {
            throwError(response.statusText, response.status);
        }
        throwError(error.message, error.status);
    } catch (e) {
        throwError(e.message, e.status);
    }
}

const throwError = (message?: string, status?: number) => {
    throw new KandidatSokError({ message, status });
};
