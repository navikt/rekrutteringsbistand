import { hentFylkerMockMsw } from './hentFylker';
import { hentKommunerMockMsw } from './hentKommuner';
import { hentLandlisteMockMsw } from './hentLand';

export const stillingsapiMock = [hentKommunerMockMsw, hentFylkerMockMsw, hentLandlisteMockMsw];
