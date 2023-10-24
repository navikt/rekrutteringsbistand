import { HttpResponse, http } from 'msw';
import { api } from '../../src/felles/api';

export const presenterteKandidaterApiMock = [
    http.get(`${api.presenterteKandidaterApi}/kandidatliste/:stillingsId/vurdering`, () =>
        HttpResponse.json(mockArbeidsgiversVurderinger)
    ),
];
const mockArbeidsgiversVurderinger: any = [
    {
        aktørId: '123',
        vurdering: 'abc',
    },
];
