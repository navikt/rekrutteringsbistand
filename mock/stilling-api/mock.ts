import { rest } from 'msw';
import { api } from '../../src/felles/api';
import { Reportee } from '../../src/stilling/reportee/reporteeReducer';
import { mockVeileder } from '../meg/mock';
import { mockEnhetsregistersøk } from './mockEnhetsregister';
import { mockPutStandardsøk, mockStandardsøk } from './mockStandardsøk';
import {
    mockNyRekrutteringsbistandstilling,
    mockRekrutteringsbistandstilling,
} from './mockStilling';

// const todo = (req: RestRequest, res: ResponseFunction, ctx: RestContext) =>
// res(ctx.status(500, 'Mock er ikke implementert'));

export const stillingApiMock = [
    rest.get(`${api.stilling}/rekrutteringsbistandstilling/:stillingsId`, (_, res, ctx) =>
        res(ctx.json(mockRekrutteringsbistandstilling))
    ),

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
];
