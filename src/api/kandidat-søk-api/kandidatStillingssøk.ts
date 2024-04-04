/**
 * Endepunkt /kandidatsok-api/api/kandidat-stillingssok
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { postApi } from '../fetcher';
import { mockKandidatStillingssøk } from './mockKandidatsøk';
import { finn2024KoderForGamleKoder } from 'felles/MappingSted';
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

export type GeografiØnske = z.infer<typeof geografiJobbonskeSchema>;
export type KandidatStillingssøkDTO = z.infer<typeof kandidatStillingssøkDTOSchema>;
export interface KandidatStillingssøkProps {
    kandidatnr: string;
}

export const useKandidatStillingssøk = (props: KandidatStillingssøkProps) => {
    const swrData = useSWR({ path: kandidatStillingssøkEndepunkt, props }, ({ path }) =>
        postApi(path, props)
    );

    if (swrData.data) {
        const kandidatStillingssøkData: KandidatStillingssøkDTO =
            swrData?.data?.hits?.hits[0]?._source;

        const nyeGeografiJobbonskerPåKandidatformat: string[] = finn2024KoderForGamleKoder(
            kandidatStillingssøkData.geografiJobbonsker.map((geografiJobbonske) => {
                return `${geografiJobbonske.geografiKodeTekst}.${geografiJobbonske.geografiKode}`;
            })
        );
        const nyeGeografiJobbønsker: GeografiØnske[] = nyeGeografiJobbonskerPåKandidatformat.map(
            (kode) => {
                const deler = kode.split('.');
                return {
                    geografiKodeTekst: deler[0],
                    geografiKode: deler.slice(1).join('.'),
                };
            }
        );

        return {
            ...swrData,
            data: kandidatStillingssøkDTOSchema.parse({
                ...kandidatStillingssøkData,
                geografiJobbonsker: nyeGeografiJobbønsker,
            }),
        };
    }
    return swrData;
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
