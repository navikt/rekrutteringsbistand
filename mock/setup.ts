import { setupWorker } from 'msw';
import { forespørselOmDelingAvCvMock } from './foresporsel-om-deling-av-cv-api/mock';
import { kandidatApiMock } from './kandidat-api/mock';
import { kandidatsøkMock } from './kandidatsok-proxy/mock';
import { innloggetBrukerMock } from './meg/mock';
import { modiaContextHolderMock } from './modiacontextholder/mock';
import { presenterteKandidaterApiMock } from './presenterte-kandidater-api/mock';
import { smsApiMock } from './sms-api/mock';
import { statistikkApiMock } from './statistikk-api/mock';
import { stillingApiMock } from './stilling-api/mock';
import { stillingssøkMock } from './stillingssok-proxy/mock';
import { synlighetApiMock } from './synlighet-api/mock';

const handlers = [
    ...innloggetBrukerMock,
    ...kandidatApiMock,
    ...statistikkApiMock,
    ...forespørselOmDelingAvCvMock,
    ...stillingApiMock,
    ...presenterteKandidaterApiMock,
    ...smsApiMock,
    ...synlighetApiMock,
    ...(import.meta.env.VITE_MOCK_MODIA ? modiaContextHolderMock : []),
    ...(import.meta.env.VITE_MOCK_AIVEN ? kandidatsøkMock : []),
    ...(import.meta.env.VITE_MOCK_AIVEN ? stillingssøkMock : []),
];

const worker = setupWorker(...handlers);

worker.start({
    onUnhandledRequest: 'warn',
});
