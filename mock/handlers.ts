import { apiMockHandlers } from '../src/api/api.msw';
import { megMockMsw } from '../src/api/frackend/meg';
import { forespørselOmDelingAvCvMock } from './foresporsel-om-deling-av-cv-api/mock';
import { kandidatApiMock } from './kandidat-api/mock';
import { kandidatsøkMock } from './kandidatsok-proxy/mock';
import { modiaMock } from './modia/modia';
import { modiaContextHolderMock } from './modiacontextholder/mock';
import { presenterteKandidaterApiMock } from './presenterte-kandidater-api/mock';
import { smsApiMock } from './sms-api/mock';
import { stillingApiMock } from './stilling-api/mock';
import { stillingssøkMock } from './stillingssok-proxy/mock';
import { synlighetApiMock } from './synlighet-api/mock';

const mswHandlers = [
    megMockMsw,
    ...kandidatApiMock,
    ...forespørselOmDelingAvCvMock,
    ...stillingApiMock,
    ...presenterteKandidaterApiMock,
    ...smsApiMock,
    ...synlighetApiMock,
    ...modiaContextHolderMock,
    ...kandidatsøkMock,
    ...stillingssøkMock,
    ...modiaMock,
    ...apiMockHandlers,
];

export default mswHandlers;
