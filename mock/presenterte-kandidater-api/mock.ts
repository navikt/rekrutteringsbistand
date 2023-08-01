import { rest } from 'msw';
import { api } from '../../src/felles/api';

export const presenterteKandidaterApiMock = [
    rest.get(
        `${api.presenterteKandidaterApi}/kandidatliste/1ea746af-66be-4cf8-a051-9e815f77b1d1/vurdering`,
        (_, res, ctx) => res(ctx.json(mockArbeidsgiversVurderinger))
    ),
];
const mockArbeidsgiversVurderinger: any = [
    {
        aktørId: '123',
        vurdering: 'abc',
    },
];
