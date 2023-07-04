import { rest } from 'msw';
import { mockStilling } from './mockStilling';
import { api } from '../../src/felles/api';

export const stillingApiMock = [
    rest.get(`${api.stilling}/rekrutteringsbistandstilling/:stillingsId`, (_, res, ctx) =>
        res(ctx.json(mockStilling))
    ),
];
