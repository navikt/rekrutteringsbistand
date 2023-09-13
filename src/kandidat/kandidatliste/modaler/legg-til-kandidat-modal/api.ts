import { api, post } from 'felles/api';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { SearchApiError } from '../../../api/fetchUtils';
import { KandidatLookup } from 'felles/domene/kandidat/Kandidat';
import Synlighetsevaluering from 'felles/domene/synlighet/Synlighetsevaluering';
import { EsQuery, EsResponse } from 'felles/domene/elastic/ElasticSearch';

export const fetchKandidatMedFnr = async (fnr: string): Promise<Nettressurs<KandidatLookup>> => {
    try {
        const response = await post<EsResponse<KandidatLookup>>(api.kandidatsøk, byggQueryFnr(fnr));

        if (response.kind === Nettstatus.Suksess) {
            const data = response.data.hits.hits[0]?._source;
            if (data) {
                return {
                    kind: Nettstatus.FinnesIkke,
                };
            } else {
                return {
                    kind: Nettstatus.Suksess,
                    data,
                };
            }
        } else {
            throw new SearchApiError({
                message: `Uventet status: ${response.kind}`,
                status: 400,
            });
        }
    } catch (e) {
        throw new SearchApiError({
            message: e.message,
            status: e.status,
        });
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
            throw await response.text();
        }
    } catch (e) {
        throw new SearchApiError({
            message: e.message,
            status: e.status,
        });
    }
};
