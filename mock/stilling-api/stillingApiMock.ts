import { rest } from 'msw';
import { stillingApi } from '../../src/stillingssok/api/api';
import { mockStilling } from './mockStilling';

export const stillingApiMock = [
    rest.get(`${stillingApi}/rekrutteringsbistandstilling/:stillingsId`, (req, res, ctx) =>
        res(ctx.json(mockStilling))
    ),
];
