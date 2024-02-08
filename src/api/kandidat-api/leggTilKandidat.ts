/**
 * Endepunkt /leggTilKandidat
 */
import { postApiResponse } from '../fetcher';

const leggTilKandidatEndepunkt = (kandidatlisteId: string) =>
    `/kandidat-api/veileder/kandidatlister/${kandidatlisteId}/kandidater`;

export const leggTilKandidatKandidatliste = async (kandidatlisteId: string, kandidatnr: string) => {
    return await postApiResponse(leggTilKandidatEndepunkt(kandidatlisteId), [
        { kandidatnr: kandidatnr },
    ]);
};

export const leggTilKandidaterKandidatliste = async (
    kandidatlisteId: string,
    kandidatnr: {
        kandidatnr: string;
    }[]
) => {
    return await postApiResponse(leggTilKandidatEndepunkt(kandidatlisteId), kandidatnr);
};
