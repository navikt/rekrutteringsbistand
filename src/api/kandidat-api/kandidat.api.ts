import { postApi, postApiResponse } from '../fetcher';

const kandidatApi = '/kandidat-api';

export const kandidatEndepunkter = {
    leggTilKandidat: (kandidatlisteId: string) =>
        `${kandidatApi}/veileder/kandidatlister/${kandidatlisteId}/kandidater`,
    kandidatNavn: `${kandidatApi}/veileder/kandidater/navn`,
};

export const leggTilKandidatKandidatliste = async (kandidatlisteId: string, kandidatnr: string) => {
    return await postApiResponse(kandidatEndepunkter.leggTilKandidat(kandidatlisteId), kandidatnr);
};

export const hentKandidatFraPDL = async (fnr: string) => {
    return await postApi(kandidatEndepunkter.kandidatNavn, { fnr });
};
