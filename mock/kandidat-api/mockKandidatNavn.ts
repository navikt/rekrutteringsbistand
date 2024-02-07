import { KandidatNavnDTO } from '../../src/api/kandidat-api/useKandidatNavn';

export function kandidatNavnMockGenerator(): KandidatNavnDTO {
    return {
        fornavn: 'PersonForNavn',
        etternavn: 'PersonEtterNavn',
        mellomnavn: 'PersonMellomNavn',
        kandidatnr: '123456789',
    };
}
