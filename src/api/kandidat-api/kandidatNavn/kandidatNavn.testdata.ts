import { kandidatNavnDTO } from './kandidatNav.dto';

export function kandidatNavnMockGenerator(): kandidatNavnDTO {
    return {
        fornavn: 'PersonForNavn',
        etternavn: 'PersonEtterNavn',
        mellomnavn: 'PersonMellomNavn',
    };
}
