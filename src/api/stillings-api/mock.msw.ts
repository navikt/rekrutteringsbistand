import { hentFylkerMockMsw } from './hentFylker';
import { hentKommunerMockMsw } from './hentKommuner';

export const stillingsapiMock = [hentKommunerMockMsw, hentFylkerMockMsw];
