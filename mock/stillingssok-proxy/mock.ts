import { rest } from 'msw';
import { api } from '../../src/felles/api';
import { mockStillingssøk } from './mockStillingssøk';

export const stillingssøkMock = [
    rest.post(`${api.stillingssøk}/stilling/_search`, (_, res, ctx) =>
        res(ctx.json(mockStillingssøk))
    ),
];
