import { kandidatStillingssøkMockMsw } from './kandidatStillingssøk';
import { kandidatsammendragMockMsw } from './kandidatsammendrag';
import { kompetanseforslagMockMsw } from './kompetanseforslag';
import { lookupCvMockMsw } from './lookupCv';
import { kandidatsøkMockMsw } from './kandidatsøk';

export const kandidatSokApiMock = [
    lookupCvMockMsw,
    kandidatStillingssøkMockMsw,
    kandidatsammendragMockMsw,
    kompetanseforslagMockMsw,
    kandidatsøkMockMsw,
];
