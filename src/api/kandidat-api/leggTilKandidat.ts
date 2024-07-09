/**
 * Endepunkt /leggTilKandidat
 */
import { postApiResponse } from '../fetcher';

const leggTilKandidatEndepunkt = (kandidatlisteId: string) =>
    `/kandidat-api/veileder/kandidatlister/${kandidatlisteId}/kandidater`;

const leggTilKandidatMedStillingsIdEndepunkt = (stillingsId: string) =>
    `/kandidat-api/veileder/stilling/${stillingsId}/kandidatliste/kandidater`;

export const leggTilKandidatKandidatliste = async (kandidatlisteId: string, kandidatnr: string) => {
    return await postApiResponse(leggTilKandidatEndepunkt(kandidatlisteId), [
        { kandidatnr: kandidatnr },
    ]);
};

export const leggTilKandidaterKandidatliste = async (
    stillingsId: string,
    kandidatnr: {
        kandidatnr: string;
    }[]
) => {
    return await postApiResponse(leggTilKandidatMedStillingsIdEndepunkt(stillingsId), kandidatnr);
};
