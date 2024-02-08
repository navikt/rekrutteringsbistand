import { foresporselApiMock } from './foresporsel-om-deling-av-cv-api/mock.msw';
import { kandidatApiMock } from './kandidat-api/mock.msw';
import { kandidatSokApiMock } from './kandidat-søk-api/mock.msw';
import { statistikkApiMock } from './statistikk-api/mock.msw';

export const apiMockHandlers = [
    ...kandidatApiMock,
    ...foresporselApiMock,
    ...statistikkApiMock,
    ...kandidatSokApiMock,
];
