import { setupWorker } from 'msw';
import { modiaContextHolderMock } from './modiaContextHolderMock';
import { innloggetBrukerMock } from './innloggetBrukerMock';
import { kandidatApiMock } from './kandidat-api/kandidatApiMock';
import { kandidatsøkMock } from './kandidatsøk/kandidatsøkMock';

const handlers = [
    ...innloggetBrukerMock,
    ...modiaContextHolderMock,
    ...kandidatApiMock,
    ...kandidatsøkMock,
];

const worker = setupWorker(...handlers);

worker.start({
    onUnhandledRequest: 'bypass',
});
