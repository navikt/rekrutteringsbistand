import { rest } from 'msw';
import { api } from '../../src/felles/api';
import { Reportee } from '../../src/stilling/reportee/reporteeReducer';
import { mockVeileder } from '../meg/mock';
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

export const stillingApiMock = [
    rest.get(`${api.stilling}/rekrutteringsbistandstilling/:stillingsId`, (_, res, ctx) =>
        res(ctx.json(mockRekrutteringsbistandstilling))
    ),

    rest.delete(`${api.stilling}/rekrutteringsbistandstilling/:stillingsId`, (_, res, ctx) =>
        res(ctx.status(200))
    ),

    rest.put(`${api.stilling}/rekrutteringsbistandstilling`, (_, res, ctx) =>
        res(ctx.json(mockRekrutteringsbistandstilling))
    ),

    rest.put(`${api.stilling}/stillingsinfo`, (_, res, ctx) => res(ctx.json(mockStillingsinfo))),

    rest.get(`${api.stilling}/standardsok`, (_, res, ctx) => res(ctx.json(mockStandardsøk))),

    rest.put(`${api.stilling}/standardsok`, (req, res, ctx) =>
        res(ctx.json(mockPutStandardsøk(req)))
    ),

    rest.get(`${api.stilling}/rekrutteringsbistand/api/v1/reportee`, (req, res, ctx) => {
        const innloggetBruker: Reportee = {
            displayName: `${mockVeileder.fornavn} ${mockVeileder.etternavn}`,
            navIdent: mockVeileder.navIdent,
        };

        return res(ctx.json(innloggetBruker));
    }),

    rest.post(`${api.stilling}/search-api/underenhet/_search`, (_, res, ctx) =>
        res(ctx.json(mockEnhetsregistersøk))
    ),

    rest.post(`${api.stilling}/rekrutteringsbistandstilling`, (_, res, ctx) =>
        res(ctx.status(201), ctx.json(mockNyRekrutteringsbistandstilling))
    ),

    rest.post(`${api.stilling}/rekrutteringsbistandstilling/kopier/:stillingsId`, (_, res, ctx) =>
        res(ctx.status(201), ctx.json(mockRekrutteringsbistandstilling))
    ),

    rest.get(`${api.stilling}/rekrutteringsbistand/api/v1/geography/counties`, (_, res, ctx) =>
        res(ctx.json(mockCounties))
    ),

    rest.get(`${api.stilling}/rekrutteringsbistand/api/v1/geography/countries`, (_, res, ctx) =>
        res(ctx.json(mockCountries))
    ),

    rest.get(`${api.stilling}/rekrutteringsbistand/api/v1/geography/municipals`, (_, res, ctx) =>
        res(ctx.json(mockMunicipals))
    ),

    rest.get(
        `${api.stilling}/rekrutteringsbistand/api/v1/categories-with-altnames`,
        (_, res, ctx) => res(ctx.json(mockCategoriesWithAltnames))
    ),

    rest.get(`${api.stilling}/rekrutteringsbistand/api/v1/geography/postdata`, (_, res, ctx) =>
        res(ctx.json(mockPostdata))
    ),
];
