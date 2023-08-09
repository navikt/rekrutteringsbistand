import { rest } from 'msw';
import { api } from '../../src/felles/api';

export const mockMeg = {
    navIdent: 'Z994161',
};

export const innloggetBrukerMock = [
    rest.get(api.innloggetBruker, (_, res, ctx) => res(ctx.json(mockMeg))),
];
