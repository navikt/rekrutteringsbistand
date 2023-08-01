import { rest } from 'msw';
import { api } from '../../src/felles/api';

export const presenterteKandidaterApiMock = [
    rest.get(
        `${api.presenterteKandidaterApi}/kandidatliste/3d2e6a60-9cd5-551a-b8cf-8fce1954c5da/vurdering`,
        (_, res, ctx) => res(ctx.json(mockArbeidsgiversVurderinger))
    ),
];
const mockArbeidsgiversVurderinger: any = [
    {
        aktørId: '123',
        vurdering: 'abc',
    },
];
