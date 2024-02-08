/**
 * Endepunkt /kandidatsok-api/api/kandidat-stillingssok
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { mockKandidatStillingssøk } from '../../../mock/kandidatsok-proxy/mockKandidat';
import { postApi } from '../fetcher';

export const kandidatStillingssøkEndepunkt = '/kandidatsok-api/api/kandidat-stillingssok';

export type KandidatStillingssøkES = {
    hits: {
        hits: Array<{
            _source: KandidatStillingssøkDTO;
        }>;
    };
};

export type KandidatStillingssøkDTO = {
    yrkeJobbonskerObj: YrkeJobbonske[];
    geografiJobbonsker: GeografiJobbonske[];
    kommunenummerstring: string;
    kommuneNavn: string;
};

type YrkeJobbonske = {
    styrkBeskrivelse: string;
    sokeTitler: string[];
    primaertJobbonske: boolean;
    styrkKode: null | string;
};

type GeografiJobbonske = {
    geografiKodeTekst: string;
    geografiKode: string;
};

export interface KandidatStillingssøkProps {
    kandidatnr: string;
}

export const useKandidatStillingssøk = (props: KandidatStillingssøkProps) => {
    const swrData = useSWR({ path: kandidatStillingssøkEndepunkt, props }, ({ path }) =>
        postApi(path, props)
    );
    const kandidatStillingssøk: KandidatStillingssøkDTO = swrData?.data?.hits?.hits[0]?._source;
    return {
        ...swrData,
        kandidatStillingssøk,
    };
};

export const kandidatStillingssøkMockMsw = http.post(kandidatStillingssøkEndepunkt, (_) =>
    HttpResponse.json({
        hits: {
            hits: [
                {
                    _source: mockKandidatStillingssøk,
                },
            ],
        },
    })
);
