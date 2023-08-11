import { rest } from 'msw';
import { api } from '../../src/felles/api';

export const synlighetApiMock = [
    rest.get(
        `${api.synlighet}/evaluering/:fnr`,
        (_, res, ctx) => res(ctx.status(500)) // TODO
    ),
];
