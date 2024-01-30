import { EsResponse } from 'felles/domene/elastic/ElasticSearch';
import Kandidat from 'felles/domene/kandidat/Kandidat';
import { HttpResponse, http } from 'msw';
import { devFnr } from '../../src/dev/DevUtil';
import { api } from '../../src/felles/api';
import { mockKandidat } from './mockKandidat';

export const kandidatsøkMock = [
    http.post(api.kandidatsøk, async ({ request }) => {
        const data = await request.json();

        //@ts-ignore
        const fnrRequest = data?.query?.term?.fodselsnummer;

        const respons =
            fnrRequest === devFnr.ingentreff || fnrRequest === devFnr.finnesIkke
                ? ingenTreff
                : treff;

        return HttpResponse.json(respons);
    }),
];

const metainformasjon = {
    took: 20,
    _shards: {
        total: 3,
        successful: 3,
        skipped: 0,
        failed: 0,
    },
    timed_out: false,
};

const treff: EsResponse<Kandidat> = {
    ...metainformasjon,
    hits: {
        total: {
            value: 2,
            relation: 'eq',
        },
        max_score: 2,
        hits: [
            {
                _id: mockKandidat.kandidatnr,
                _index: '',
                _score: 1,
                _type: '',
                _source: mockKandidat,
            },
            {
                _id: '1337',
                _index: '',
                _score: 1,
                _type: '',
                _source: {
                    ...mockKandidat,
                    arenaKandidatnr: '1337',
                    kandidatnr: '1337',
                    fornavn: 'Ola',
                    aktorId: '1337',
                    fodselsnummer: '1337',
                },
            },
        ],
    },
};

const ingenTreff: EsResponse<Kandidat> = {
    ...metainformasjon,
    hits: {
        total: {
            value: 0,
            relation: 'eq',
        },
        max_score: null,
        hits: [],
    },
};
