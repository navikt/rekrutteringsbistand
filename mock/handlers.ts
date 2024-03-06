import { apiMockHandlers } from '../src/api/api.msw';
import { megMockMsw } from '../src/api/frackend/meg';
import { Rolle } from '../src/felles/tilgangskontroll/TilgangskontrollForInnhold';
import { forespørselOmDelingAvCvMock } from './foresporsel-om-deling-av-cv-api/mock';
import { gammelKandidatApiMock } from './kandidat-api/mock';
import { kandidatsøkMock } from './kandidatsok-proxy/mock';
import { modiaMock } from './modia/modia';
import { modiaContextHolderMock } from './modiacontextholder/mock';
import { presenterteKandidaterApiMock } from './presenterte-kandidater-api/mock';
import { smsApiMock } from '../src/api/sms-api/sms';
import { stillingApiMock } from './stilling-api/mock';
import { stillingssøkMock } from './stillingssok-proxy/mock';
import { synlighetApiMock } from './synlighet-api/mock';

const mswHandlers = [
    megMockMsw('Z994161', [
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
    ...smsApiMock,
    ...synlighetApiMock,
    ...modiaContextHolderMock,
    ...kandidatsøkMock,
    ...stillingssøkMock,
    ...modiaMock,
    ...apiMockHandlers,
];

export default mswHandlers;
