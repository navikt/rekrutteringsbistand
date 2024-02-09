import { kandidatStillingssøkMockMsw } from './kandidatStillingssøk';
import { kandidatsammendragMockMsw } from './kandidatsammendrag';
import { kandidatsøkMockMsw } from './kandidatsøk';
import { lookupCvMockMsw } from './lookupCv';

export const kandidatSokApiMock = [
    lookupCvMockMsw,
    kandidatStillingssøkMockMsw,
    kandidatsammendragMockMsw,
    kandidatsøkMockMsw,
];
