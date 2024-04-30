import { HttpResponse, http } from 'msw';
import { api } from '../../src/felles/api';
import { Reportee } from '../../src/stilling/reportee/reporteeReducer';
import { mockVeileder } from '../mockVeileder';
import { mockEnhetsregistersøk } from './mockEnhetsregister';
import { mockCategoriesWithAltnames, mockPostdata } from './mockGeografi';
import { mockPutStandardsøk, mockStandardsøk } from './mockStandardsøk';
import {
    mockNyRekrutteringsbistandstilling,
    mockRekrutteringsbistandstilling,
    mockRekrutteringsbistandstillingEkstern,
    mockRekrutteringsbistandstillingMin,
    mockRekrutteringsbistandstillingMinEkstern,
    mockStillingsinfo,
} from './mockStilling';

export const stillingApiMock = [
    http.get(`${api.stilling}/rekrutteringsbistandstilling/:stillingsId`, ({ params }) => {
        const { stillingsId } = params;

        if (stillingsId === 'minInterne') {
            console.log('🎺 "Er jo her da"', 'Er jo her da');
            return HttpResponse.json(mockRekrutteringsbistandstillingMin);
        } else if (stillingsId === 'ekstern') {
            return HttpResponse.json(mockRekrutteringsbistandstillingEkstern);
        } else if (stillingsId === 'minEkstern') {
            return HttpResponse.json(mockRekrutteringsbistandstillingMinEkstern);
        }

        return HttpResponse.json(mockRekrutteringsbistandstilling);
    }),

    http.delete(
        `${api.stilling}/rekrutteringsbistandstilling/:stillingsId`,
        () => new HttpResponse(null, { status: 200 })
    ),

    http.put(`${api.stilling}/rekrutteringsbistandstilling`, () =>
        HttpResponse.json(mockRekrutteringsbistandstilling)
    ),

    http.put(`${api.stilling}/stillingsinfo`, () => HttpResponse.json(mockStillingsinfo)),

    http.get(`${api.stilling}/standardsok`, () => HttpResponse.json(mockStandardsøk)),

    http.put(`${api.stilling}/standardsok`, ({ request }) =>
        HttpResponse.json(mockPutStandardsøk(request))
    ),

    http.get(`${api.stilling}/rekrutteringsbistand/api/v1/reportee`, () => {
        const innloggetBruker: Reportee = {
            displayName: `${mockVeileder.fornavn} ${mockVeileder.etternavn}`,
            navIdent: mockVeileder.navIdent,
        };

        return HttpResponse.json(innloggetBruker);
    }),

    http.post(`${api.stilling}/search-api/underenhet/_search`, () =>
        HttpResponse.json(mockEnhetsregistersøk)
    ),

    http.post(`${api.stilling}/rekrutteringsbistandstilling`, () =>
        HttpResponse.json(mockNyRekrutteringsbistandstilling)
    ),

    http.post(`${api.stilling}/rekrutteringsbistandstilling/kopier/:stillingsId`, () =>
        HttpResponse.json(mockRekrutteringsbistandstilling)
    ),

    http.get(`${api.stilling}/rekrutteringsbistand/api/v1/categories-with-altnames`, () =>
        HttpResponse.json(mockCategoriesWithAltnames)
    ),

    http.get(`${api.stilling}/rekrutteringsbistand/api/v1/geography/postdata`, () =>
        HttpResponse.json(mockPostdata)
    ),
];
