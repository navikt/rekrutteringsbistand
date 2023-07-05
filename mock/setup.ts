import { setupWorker } from 'msw';
import { modiaContextHolderMock } from './modiaContextHolderMock';
import { innloggetBrukerMock } from './innloggetBrukerMock';
import { kandidatApiMock } from './kandidat-api/kandidatApiMock';
import { kandidatsøkMock } from './kandidatsok-proxy/kandidatsøkMock';
import { forespørselOmDelingAvCvMock } from './forespørsel-om-deling-av-cv-api/forespørselOmDelingAvCvMock';
import { statistikkApiMock } from './statistikk-api/statistikkApiMock';
import { stillingApiMock } from './stilling-api/stillingApiMock';
import { stillingssøkMock } from './stillingssok-proxy/stillingssøkMock';

const handlers = [
    ...innloggetBrukerMock,
    ...kandidatApiMock,
    ...statistikkApiMock,
    ...forespørselOmDelingAvCvMock,
    ...stillingApiMock,
    ...(import.meta.env.VITE_MOCK_MODIA ? modiaContextHolderMock : []),
    ...(import.meta.env.VITE_MOCK_AIVEN ? kandidatsøkMock : []),
    ...(import.meta.env.VITE_MOCK_AIVEN ? stillingssøkMock : []),
];

const worker = setupWorker(...handlers);

worker.start({
    onUnhandledRequest: 'bypass',
});
