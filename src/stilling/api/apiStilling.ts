import { api } from '../../felles/api';

export const stillingEndepunkter = {
    hentStilling: (stillingsId: string) =>
        `${api.stilling}/rekrutteringsbistandstilling/${stillingsId}`,
    kopierStilling: (stillingsId: string) =>
        `${api.stilling}/rekrutteringsbistandstilling/kopier/${stillingsId}`,
};
