import { kandidatStillingssøkMockMsw } from './kandidatStillingssøk';
import { kandidatsammendragMockMsw } from './kandidatsammendrag';
import { kompetanseforslagMockMsw } from './kompetanseforslag';
import { lookupCvMockMsw } from './lookupCv';
import { kandidatsøkMockMsw } from './kandidatsøk';
import { kandidatsøkNavigeringMockMsw } from './kandidatsøk-navigering';
import { suggestMockMsw } from './suggest';
import { suggestStedMockMsw } from './suggestSted';
import { suggestKontorMockMsw } from './suggestKontor';
import { hentKandidatnavnMockMsw } from './hentKandidatnavn';
import { hentArenaKandidatnrMockMsw } from './hentArenaKandidatnr';

export const kandidatSokApiMock = [
    lookupCvMockMsw,
    kandidatStillingssøkMockMsw,
    kandidatsammendragMockMsw,
    kompetanseforslagMockMsw,
    kandidatsøkMockMsw,
    kandidatsøkNavigeringMockMsw,
    suggestMockMsw,
    suggestStedMockMsw,
    suggestKontorMockMsw,
    hentKandidatnavnMockMsw,
    hentArenaKandidatnrMockMsw,
];
