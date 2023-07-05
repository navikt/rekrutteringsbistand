import { rest } from 'msw';
import { mockStilling } from './mockStilling';
import { api } from '../../src/felles/api';
import { mockPutStandardsøk, mockStandardsøk } from './mockStandardsøk';

export const stillingApiMock = [
    rest.get(`${api.stilling}/rekrutteringsbistandstilling/:stillingsId`, (_, res, ctx) =>
        res(ctx.json(mockStilling))
    ),

    rest.get(`${api.stilling}/standardsok`, (_, res, ctx) => res(ctx.json(mockStandardsøk))),

    rest.put(`${api.stilling}/standardsok`, (req, res, ctx) =>
        res(ctx.json(mockPutStandardsøk(req)))
    ),
];
