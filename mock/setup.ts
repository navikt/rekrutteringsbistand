import { setupWorker } from 'msw';
import mswHandlers from './handlers';

const handlers = [
    ...innloggetBrukerMock,
    ...kandidatApiMock,
    ...statistikkApiMock,
    ...forespørselOmDelingAvCvMock,
    ...stillingApiMock,
    ...presenterteKandidaterApiMock,
    ...smsApiMock,
    ...synlighetApiMock,
    ...modiaContextHolderMock,
    ...(import.meta.env.VITE_MOCK_AIVEN ? kandidatsøkMock : []),
    ...(import.meta.env.VITE_MOCK_AIVEN ? stillingssøkMock : []),
];

const worker = setupWorker(...handlers);

worker.start({
    onUnhandledRequest: 'warn',
});
