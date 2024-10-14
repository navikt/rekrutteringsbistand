import { hentFylkerMockMsw } from './hentFylker';
import { hentKommunerMockMsw } from './hentKommuner';
import { hentLandlisteMockMsw } from './hentLand';
import { stillingsanalyseMockMsw } from './stillingsanalyse';

export const stillingsapiMock = [
    hentKommunerMockMsw,
    hentFylkerMockMsw,
    hentLandlisteMockMsw,
    stillingsanalyseMockMsw,
];
