/**
 * Endepunkt /leggTilKandidat
 */
import { postApiResponse } from '../fetcher';

const leggTilKandidatEndepunkt = (stillingId: string) =>
    `/kandidat-api/veileder/stilling/${stillingId}/kandidatliste/kandidater`;

export interface LeggTilKandidatProps {
    stillingId: string;
    kandidatnr: string;
}

export interface LeggTilKandidaterProps {
    stillingId: string;
    kandidater: {
        kandidatnr: string;
    }[];
}

export const leggTilKandidatIKandidatliste = async ({
    stillingId,
    kandidatnr,
}: LeggTilKandidatProps) => {
    return await postApiResponse(leggTilKandidatEndepunkt(stillingId), [{ kandidatnr }]);
};

export const leggTilKandidaterIKandidatliste = async ({
    stillingId,
    kandidater,
}: LeggTilKandidaterProps) => {
    return await postApiResponse(leggTilKandidatEndepunkt(stillingId), kandidater);
};
