import { mockArbeidsgiver } from './mockStilling';

export const mockTreffIEnhetsregistersøk = {
    navn: mockArbeidsgiver.name,
    organisasjonsnummer: mockArbeidsgiver.orgnr,
    antallAnsatte: mockArbeidsgiver.employees,
    adresse: {
        adresse: mockArbeidsgiver.location.address,
        postnummer: mockArbeidsgiver.location.postalCode,
        poststed: mockArbeidsgiver.location.city,
        kommunenummer: mockArbeidsgiver.location.municipal,
        kommune: mockArbeidsgiver.location.municipal,
        land: mockArbeidsgiver.location.country,
    },
};

export const mockEnhetsregistersøk = {
    took: 40,
    timed_out: false,
    _shards: { total: 3, successful: 3, skipped: 0, failed: 0 },
    hits: {
        total: { value: 1, relation: 'eq' },
        max_score: 10,
        hits: [
            {
                _index: 'underenhet20191217',
                _type: '_doc',
                _id: '976434099',
                _score: 15.714438,
                _source: mockTreffIEnhetsregistersøk,
            },
        ],
    },
};
