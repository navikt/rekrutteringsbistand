import { kandidatStillingssøkMockMsw } from './kandidatStillingssøk';
import { kandidatsammendragMockMsw } from './kandidatsammendrag';
import { kompetanseforslagMockMsw } from './kompetanseforslag';
import { kandidatsøkMockMsw } from './kandidatsøk';
import { lookupCvMockMsw } from './lookupCv';

export const kandidatSokApiMock = [
    lookupCvMockMsw,
    kandidatStillingssøkMockMsw,
    kandidatsammendragMockMsw,
    kompetanseforslagMockMsw,
    kandidatsøkMockMsw,
];
