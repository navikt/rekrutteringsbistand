/**
 * Endepunkt /kandidatsok-api/api/kandidatsammendrag
 */
import { HttpResponse, http } from 'msw';
import useSWR, {SWRResponse} from 'swr';
import { z } from 'zod';
import { mockKandidatsammendrag } from '../../../mock/kandidatsok-proxy/mockKandidat';
import {postApiWithSchemaEs} from '../fetcher';

const kandidatsammendragEndepunkt = '/kandidatsok-api/api/kandidatsammendrag';


export const kandidatsammendragSchema = z.object({
    adresselinje1: z.string(),
    fornavn: z.string(),
    poststed: z.string(),
    fodselsdato: z.string(),
    etternavn: z.string(),
    epostadresse: z.string().nullable(),
    postnummer: z.string(),
    telefon: z.string().nullable(),
    veilederIdent: z.string().nullable(),
    veilederEpost: z.string().nullable(),
    veilederVisningsnavn: z.string().nullable(),
    arenaKandidatnr: z.string(),
    fodselsnummer: z.string(),
});

export type Kandidatsammendrag = z.infer<typeof kandidatsammendragSchema>;

export interface KandidatsammendragProps {
    kandidatnr: string;
}

export const useKandidatsammendrag = (props: KandidatsammendragProps): SWRResponse<Kandidatsammendrag> => {
    return useSWR(
        { url: kandidatsammendragEndepunkt, body: props },
        postApiWithSchemaEs(kandidatsammendragSchema)
    );
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
