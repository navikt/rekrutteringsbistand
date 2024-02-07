import { foresporselStatistikkMockMsw } from './foresporsel-om-deling-av-cv-api/statistikk';
import { hentKandidatFraPDLMockMsw } from './kandidat-api/hentKandidatFraPDL';
import { statistikkMockMsw } from './statistikk-api/statistikk';

export const apiMockHandlers = [
    hentKandidatFraPDLMockMsw,
    statistikkMockMsw,
    foresporselStatistikkMockMsw,
];
