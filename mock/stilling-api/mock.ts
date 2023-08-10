import { ResponseFunction, RestContext, RestRequest, rest } from 'msw';
import { api } from '../../src/felles/api';
import { mockPutStandardsøk, mockStandardsøk } from './mockStandardsøk';
import { mockStilling } from './mockStilling';

const todo = (req: RestRequest, res: ResponseFunction, ctx: RestContext) =>
    res(ctx.status(500, 'Mock er ikke implementert'));

export const stillingApiMock = [
    rest.get(`${api.stilling}/rekrutteringsbistandstilling/:stillingsId`, (_, res, ctx) =>
        res(ctx.json(mockStilling))
    ),

    rest.get(`${api.stilling}/standardsok`, (_, res, ctx) => res(ctx.json(mockStandardsøk))),

    rest.put(`${api.stilling}/standardsok`, (req, res, ctx) =>
        res(ctx.json(mockPutStandardsøk(req)))
    ),

    rest.post(`${api.stilling}/search-api/underenhet/_search`, todo),
];
