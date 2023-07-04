import { setupWorker } from 'msw';
import { modiaContextHolderMock } from './modiaContextHolderMock';
import { innloggetBrukerMock } from './innloggetBrukerMock';
import { kandidatApiMock } from './kandidat-api/kandidatApiMock';
import { kandidatsøkMock } from './kandidatsøk/kandidatsøkMock';
import { forespørselOmDelingAvCvMock } from './forespørsel-om-deling-av-cv-api/forespørselOmDelingAvCvMock';
import { statistikkApiMock } from './statistikk-api/statistikkApiMock';

const handlers = [
    ...innloggetBrukerMock,
    ...kandidatApiMock,
    ...statistikkApiMock,
    ...forespørselOmDelingAvCvMock,
    ...(import.meta.env.VITE_MOCK_MODIA ? modiaContextHolderMock : []),
    ...(import.meta.env.VITE_MOCK_AIVEN ? kandidatsøkMock : []),
];

const worker = setupWorker(...handlers);

worker.start({
    onUnhandledRequest: 'bypass',
});
