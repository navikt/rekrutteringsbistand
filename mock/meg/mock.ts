import { HttpResponse, http } from 'msw';
import { frackendEndepunkter } from '../../src/api/frackend/proxy.api';

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
    http.get(frackendEndepunkter.innloggetBruker, (_) => HttpResponse.json(mockMeg)),
];
