import { HttpResponse, http } from 'msw';
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
    http.get(api.innloggetBruker, (_) => HttpResponse.json(mockMeg)),
];
