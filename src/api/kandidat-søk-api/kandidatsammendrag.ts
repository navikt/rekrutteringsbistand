/**
 * Endepunkt /kandidatsok-api/api/kandidatsammendrag
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { postApi } from '../fetcher';
import { mockKandidatsammendrag } from './mockKandidatsøk';

const kandidatsammendragEndepunkt = '/kandidatsok-api/api/kandidatsammendrag';

export const kandidatsammendragSchema = z.object({
    adresselinje1: z.string().nullable(),
    fornavn: z.string(),
    poststed: z.string().nullable(),
    fodselsdato: z.string(),
    etternavn: z.string(),
    epostadresse: z.string().nullable(),
    postnummer: z.string().nullable(),
    telefon: z.string().nullable(),
    veilederIdent: z.string().nullable(),
    veilederEpost: z.string().nullable(),
    veilederVisningsnavn: z.string().nullable(),
    arenaKandidatnr: z.string(),
    fodselsnummer: z.string(),
});

export const kandidatsammendragDTOSchema = z.object({
    kandidatsammendrag: kandidatsammendragSchema.optional().nullable(),
    isLoading: z.boolean(),
    error: z.any(),
});

export type KandidatsammendragDTO = z.infer<typeof kandidatsammendragDTOSchema>;

export type Kandidatsammendrag = z.infer<typeof kandidatsammendragSchema>;
export interface KandidatsammendragProps {
    kandidatnr: string;
}

export const useKandidatsammendrag = (props: KandidatsammendragProps): KandidatsammendragDTO => {
    const swrData = useSWR({ path: kandidatsammendragEndepunkt, props }, ({ path }) =>
        postApi(path, { ...props })
    );

    if (swrData.data) {
        const kandidatsammendragData: Kandidatsammendrag | null =
            swrData?.data?.hits?.hits[0]?._source;
        const kandidatsammendrag = kandidatsammendragSchema.parse(kandidatsammendragData);
        return {
            ...swrData,
            kandidatsammendrag,
        };
    }
    return swrData;
};

export const kandidatsammendragMockMsw = http.post(kandidatsammendragEndepunkt, (_) =>
    HttpResponse.json({
        hits: {
            hits: [
                {
                    _source: mockKandidatsammendrag,
                },
            ],
        },
    })
);
