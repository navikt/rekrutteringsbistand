import { forespørselOmDelingAvCvMock } from './foresporsel-om-deling-av-cv-api/mock';
import { kandidatApiMock } from './kandidat-api/mock';
import { kandidatsøkMock } from './kandidatsok-proxy/mock';
import { innloggetBrukerMock } from './meg/mock';
import { modiaMock } from './modia/modia';
import { modiaContextHolderMock } from './modiacontextholder/mock';
import { presenterteKandidaterApiMock } from './presenterte-kandidater-api/mock';
import { smsApiMock } from './sms-api/mock';
import { statistikkApiMock } from './statistikk-api/mock';
import { stillingApiMock } from './stilling-api/mock';
import { stillingssøkMock } from './stillingssok-proxy/mock';
import { synlighetApiMock } from './synlighet-api/mock';

const mswHandlers = [
    ...innloggetBrukerMock,
    ...kandidatApiMock,
    ...statistikkApiMock,
    ...forespørselOmDelingAvCvMock,
    ...stillingApiMock,
    ...presenterteKandidaterApiMock,
    ...smsApiMock,
    ...synlighetApiMock,
    ...modiaContextHolderMock,
    ...kandidatsøkMock,
    ...stillingssøkMock,
    ...modiaMock,
];

export default mswHandlers;
