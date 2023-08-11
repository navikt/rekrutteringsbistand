import { rest } from 'msw';
import { api } from '../../src/felles/api';

export const mockVeileder = {
    fornavn: 'Varg',
    etternavn: 'Veileder',
    navKontor: '1209',
    navIdent: 'Z994161',
};

export const mockMeg = {
    navIdent: mockVeileder.navIdent,
};

export const innloggetBrukerMock = [
    rest.get(api.innloggetBruker, (_, res, ctx) => res(ctx.json(mockMeg))),
];
