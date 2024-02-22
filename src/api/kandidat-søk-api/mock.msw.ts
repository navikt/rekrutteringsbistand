import { enkelAutocompleteMockMsw } from './enkelautocomplete';
import { kandidatStillingssøkMockMsw } from './kandidatStillingssøk';
import { kandidatsammendragMockMsw } from './kandidatsammendrag';
import { kompetanseforslagMockMsw } from './kompetanseforslag';
import { lookupCvMockMsw } from './lookupCv';

export const kandidatSokApiMock = [
    lookupCvMockMsw,
    kandidatStillingssøkMockMsw,
    kandidatsammendragMockMsw,
    kompetanseforslagMockMsw,
    enkelAutocompleteMockMsw,
];
