import { kandidatNavnDTO } from '../../src/api/kandidat-api/kandidat.dto';

export function kandidatNavnMockGenerator(): kandidatNavnDTO {
    return {
        fornavn: 'PersonForNavn',
        etternavn: 'PersonEtterNavn',
        mellomnavn: 'PersonMellomNavn',
        kandidatnr: '123456789',
    };
}
