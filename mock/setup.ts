import { setupWorker } from 'msw';
import { modiaContextHolderMock } from './modiacontextholder/mock';
import { innloggetBrukerMock } from './meg/mock';
import { kandidatApiMock } from './kandidat-api/mock';
import { kandidatsøkMock } from './kandidatsok-proxy/mock';
import { forespørselOmDelingAvCvMock } from './foresporsel-om-deling-av-cv-api/mock';
import { statistikkApiMock } from './statistikk-api/mock';
import { stillingApiMock } from './stilling-api/mock';
import { stillingssøkMock } from './stillingssok-proxy/mock';
import { presenterteKandidaterApiMock } from './presenterte-kandidater-api/mock';

const handlers = [
    ...innloggetBrukerMock,
    ...kandidatApiMock,
    ...statistikkApiMock,
    ...forespørselOmDelingAvCvMock,
    ...stillingApiMock,
    ...(import.meta.env.VITE_MOCK_MODIA ? modiaContextHolderMock : []),
    ...(import.meta.env.VITE_MOCK_AIVEN ? kandidatsøkMock : []),
    ...(import.meta.env.VITE_MOCK_AIVEN ? stillingssøkMock : []),
    ...presenterteKandidaterApiMock,
];

const worker = setupWorker(...handlers);

worker.start({
    onUnhandledRequest: 'bypass',
});
