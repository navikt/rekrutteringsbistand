import { HttpResponse, http } from 'msw';
import { api } from '../../src/felles/api';
import { Reportee } from '../../src/stilling/reportee/reporteeReducer';
import { mockEnhetsregistersøk } from './mockEnhetsregister';
import {
    mockCategoriesWithAltnames,
    mockCounties,
    mockCountries,
    mockMunicipals,
    mockPostdata,
} from './mockGeografi';
import { mockPutStandardsøk, mockStandardsøk } from './mockStandardsøk';
import {
    mockNyRekrutteringsbistandstilling,
    mockRekrutteringsbistandstilling,
    mockStillingsinfo,
} from './mockStilling';
import { mockVeileder } from '../mockVeileder';

export const stillingApiMock = [
    http.get(`${api.stilling}/rekrutteringsbistandstilling/:stillingsId`, () =>
        HttpResponse.json(mockRekrutteringsbistandstilling)
    ),

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

    http.get(`${api.stilling}/rekrutteringsbistand/api/v1/geography/counties`, () =>
        HttpResponse.json(mockCounties)
    ),

    http.get(`${api.stilling}/rekrutteringsbistand/api/v1/geography/countries`, () =>
        HttpResponse.json(mockCountries)
    ),

    http.get(`${api.stilling}/rekrutteringsbistand/api/v1/geography/municipals`, () =>
        HttpResponse.json(mockMunicipals)
    ),

    http.get(`${api.stilling}/rekrutteringsbistand/api/v1/categories-with-altnames`, () =>
        HttpResponse.json(mockCategoriesWithAltnames)
    ),

    http.get(`${api.stilling}/rekrutteringsbistand/api/v1/geography/postdata`, () =>
        HttpResponse.json(mockPostdata)
    ),
];
