/**
 * Endepunkt /leggTilKandidat
 */
import { postApiResponse } from '../fetcher';

const leggTilKandidatEndepunkt = (stillingId: string) =>
    `/kandidat-api/veileder/stilling/${stillingId}/kandidatliste/kandidater`;

export const leggTilKandidatKandidatliste = async (stillingId: string, kandidatnr: string) => {
    return await postApiResponse(leggTilKandidatEndepunkt(stillingId), [
        { kandidatnr: kandidatnr },
    ]);
};

export const leggTilKandidaterKandidatliste = async (
    stillingsId: string,
    kandidatnr: {
        kandidatnr: string;
    }[]
) => {
    return await postApiResponse(leggTilKandidatEndepunkt(stillingsId), kandidatnr);
};
