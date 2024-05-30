import { hentArenaKandidatnrMockMsw } from './hentArenaKandidatnr';
import { hentKandidatnavnMockMsw } from './hentKandidatnavn';
import { kandidatStillingssøkMockMsw } from './kandidatStillingssøk';
import { kandidatsammendragMockMsw } from './kandidatsammendrag';
import { kandidatsøkMockMsw } from './kandidatsøk';
import { kompetanseforslagMockMsw } from './kompetanseforslag';
import { lookupCvMockMsw } from './lookupCv';
import { suggestMockMsw } from './suggest';
import { suggestKontorMockMsw } from './suggestKontor';
import { suggestStedMockMsw } from './suggestSted';

export const kandidatSokApiMock = [
    lookupCvMockMsw,
    kandidatStillingssøkMockMsw,
    kandidatsammendragMockMsw,
    kompetanseforslagMockMsw,
    kandidatsøkMockMsw,
    suggestMockMsw,
    suggestStedMockMsw,
    suggestKontorMockMsw,
    hentKandidatnavnMockMsw,
    hentArenaKandidatnrMockMsw,
];
