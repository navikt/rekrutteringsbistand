import { api, post } from 'felles/api';
import { Nettressurs } from 'felles/nettressurs';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';

export const postKandidaterTilKandidatliste = async (
    kandidatlisteId: string,
    kandidatnr: string,
    notat?: string
): Promise<Nettressurs<Kandidatliste>> => {
    return await post<Kandidatliste>(
        `${api.kandidat}/veileder/kandidatlister/${kandidatlisteId}/kandidater`,
        [
            {
                kandidatnr,
                notat,
            },
        ]
    );
};
