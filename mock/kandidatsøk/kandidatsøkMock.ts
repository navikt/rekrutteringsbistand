import { rest } from 'msw';
import { Respons } from '../../src/kandidatsok/kandidater/elasticSearchTyper';
import { Innsatsgruppe } from '../../src/kandidatsok/filter/Jobbmuligheter';

export const kandidatsøkMock = [
    rest.post(`/kandidatsok-proxy`, (_, res, ctx) => {
        const respons: Respons = {
            _shards: {
                total: 0,
                failed: 0,
                skipped: 0,
                successful: 0,
            },
            took: 23,
            timed_out: false,
            hits: {
                total: {
                    value: 1,
                    relation: 'eq',
                },
                max_score: 1,
                hits: [
                    {
                        _id: '',
                        _index: '',
                        _score: 1,
                        _type: '',
                        _source: {
                            aktorId: '123',
                            arenaKandidatnr: 'AB123456',
                            fornavn: 'Joar',
                            etternavn: 'Giil',
                            fodselsnummer: '01010101006',
                            geografiJobbonsker: [
                                {
                                    geografiKodeTekst: 'Geiranger',
                                    geografiKode: '1000',
                                },
                            ],
                            kvalifiseringsgruppekode: Innsatsgruppe.SituasjonsbestemtInnsats,
                            yrkeJobbonskerObj: [
                                {
                                    primaertJobbonske: true,
                                    sokeTitler: [],
                                    styrkBeskrivelse: 'Gartner',
                                    styrkKode: '01',
                                },
                            ],
                        },
                    },
                ],
            },
        };

        return res(ctx.json(respons));
    }),
];
