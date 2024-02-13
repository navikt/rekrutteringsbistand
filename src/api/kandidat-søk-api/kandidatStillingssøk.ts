/**
 * Endepunkt /kandidatsok-api/api/kandidat-stillingssok
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
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

const yrkeJobbonskeSchema = z.object({
    styrkBeskrivelse: z.string(),
    sokeTitler: z.array(z.string()),
    primaertJobbonske: z.boolean(),
    styrkKode: z.string().nullable(),
});

const geografiJobbonskeSchema = z.object({
    geografiKodeTekst: z.string(),
    geografiKode: z.string(),
});

export const kandidatStillingssøkDTOSchema = z.object({
    yrkeJobbonskerObj: z.array(yrkeJobbonskeSchema),
    geografiJobbonsker: z.array(geografiJobbonskeSchema),
    kommunenummerstring: z.string(),
    kommuneNavn: z.string(),
});

export type KandidatStillingssøkDTO = z.infer<typeof kandidatStillingssøkDTOSchema>;

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
