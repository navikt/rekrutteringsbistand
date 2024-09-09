import { apiMockHandlers } from '../src/api/api.msw';
import { megMockMsw } from '../src/api/frackend/meg';
import { kandidatvarselMock } from '../src/api/kandidatvarsel-api/kandidatvarsel';
import { stillingsapiMock } from '../src/api/stillings-api/mock.msw';
import { Rolle } from '../src/felles/tilgangskontroll/Roller';
import { forespørselOmDelingAvCvMock } from './foresporsel-om-deling-av-cv-api/mock';
import { gammelKandidatApiMock } from './kandidat-api/mock';
import { modiaMock } from './modia/modia';
import { modiaContextHolderMock } from './modiacontextholder/mock';
import { presenterteKandidaterApiMock } from './presenterte-kandidater-api/mock';
import { stillingApiMock } from './stilling-api/mock';
import { stillingssøkMock } from './stillingssok-proxy/mock';
import { synlighetApiMock } from './synlighet-api/mock';

const mswHandlers = [
    megMockMsw('Z123456', [
        Rolle.AD_GRUPPE_MODIA_GENERELL_TILGANG,
        Rolle.AD_GRUPPE_MODIA_OPPFOLGING,
        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
    ]),
    ...gammelKandidatApiMock,
    ...forespørselOmDelingAvCvMock,
    ...stillingApiMock,
    ...presenterteKandidaterApiMock,
    ...kandidatvarselMock,
    ...synlighetApiMock,
    ...modiaContextHolderMock,
    ...stillingssøkMock,
    ...modiaMock,
    ...apiMockHandlers,
    ...stillingsapiMock,
];

export default mswHandlers;
