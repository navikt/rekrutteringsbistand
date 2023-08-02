import { rest } from 'msw';
import { api } from '../../src/felles/api';

export const presenterteKandidaterApiMock = [
    rest.get(
        `${api.presenterteKandidaterApi}/kandidatliste/:stillingsId/vurdering`,
        (_, res, ctx) => res(ctx.json(mockArbeidsgiversVurderinger))
    ),
];
const mockArbeidsgiversVurderinger: any = [
    {
        aktørId: '123',
        vurdering: 'abc',
    },
];
