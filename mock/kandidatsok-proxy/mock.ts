import { EsResponse } from 'felles/domene/elastic/ElasticSearch';
import Kandidat from 'felles/domene/kandidat/Kandidat';
import { rest } from 'msw';
import { api } from '../../src/felles/api';
import { mockKandidat } from './mockKandidat';

export const kandidatsøkMock = [
    rest.post(api.kandidatsøk, async (req, res, ctx) => {
        const skalMockeIngenTreff = false;
        const respons = skalMockeIngenTreff ? ingenTreff : treff;

        return res(ctx.json(respons));
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
            value: 1,
            relation: 'eq',
        },
        max_score: 1,
        hits: [
            {
                _id: mockKandidat.kandidatnr,
                _index: '',
                _score: 1,
                _type: '',
                _source: mockKandidat,
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
