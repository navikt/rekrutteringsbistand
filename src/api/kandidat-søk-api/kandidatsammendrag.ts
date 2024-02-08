/**
 * Endepunkt /kandidatsok-api/api/kandidatsammendrag
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { mockKandidatsammendrag } from '../../../mock/kandidatsok-proxy/mockKandidat';
import { postApi } from '../fetcher';

const kandidatsammendragEndepunkt = '/kandidatsok-api/api/kandidatsammendrag';

export type KandidatsammendragDTO = {
    kandidatsammendrag?: Kandidatsammendrag | null;
    isLoading: boolean;
    error: any;
};

export type Kandidatsammendrag = {
    adresselinje1: string;
    fornavn: string;
    poststed: string;
    fodselsdato: string;
    etternavn: string;
    epostadresse: null | string;
    postnummer: string;
    telefon: null | string;
    veilederIdent: null | string;
    veilederEpost: null | string;
    veilederVisningsnavn: null | string;
    arenaKandidatnr: string;
    fodselsnummer: string;
};

export interface KandidatsammendragProps {
    kandidatnr: string;
}

export const useKandidatsammendrag = (props: KandidatsammendragProps): KandidatsammendragDTO => {
    const swrData = useSWR({ path: kandidatsammendragEndepunkt, props }, ({ path }) =>
        postApi(path, { ...props })
    );

    const kandidatsammendrag: Kandidatsammendrag | null = swrData?.data?.hits?.hits[0]?._source;

    return {
        ...swrData,
        kandidatsammendrag,
    };
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
