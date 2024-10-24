/**
 * Endepunkt /statistikk
 */
import { HttpResponse, http } from 'msw';
import { z } from 'zod';

export const pamOntologiEndepunkt = `/pam-ontologi/rest/typeahead/stilling*`;

const janzzKategoriDTOSchema = z.object({
    konseptId: z.number(),
    styrk08: z.string(),
    esco: z.string(),
    escoLabel: z.string(),
    label: z.string(),
    undertype: z.string(),
});

export type janzzKategoriDTO = z.infer<typeof janzzKategoriDTOSchema>;

const janzzKategoriMock = (): janzzKategoriDTO[] | null => {
    return [
        {
            konseptId: 358507,
            styrk08: '1112',
            esco: 'http://data.europa.eu/esco/isco/C1112',
            escoLabel: 'Toppledere i offentlig administrasjon',
            label: 'Departementsråd',
            undertype: '',
        },
    ];
};

export const pamOntologiMockMsw = http.get(pamOntologiEndepunkt, ({ request }) => {
    const janzzKategorier = janzzKategoriMock();

    return HttpResponse.json(janzzKategorier);
});
