import { rest } from 'msw';
import { api } from '../../src/felles/api';
import { Respons } from '../../src/kandidatsok/kandidater/elasticSearchTyper';
import { mockKandidat } from './mockKandidat';
import { Innsatsgruppe } from 'felles/domene/kandidat/Oppfølgingsinformasjon';

export const kandidatsøkMock = [
    rest.post(api.kandidatsøk, async (req, res, ctx) => {
        const treff: Respons = (await req.text()).includes('09043826678')
            ? {
                  took: 1,
                  timed_out: false,
                  _shards: {
                      total: 3,
                      successful: 3,
                      skipped: 0,
                      failed: 0,
                  },
                  hits: {
                      total: {
                          value: 0,
                          relation: 'eq',
                      },
                      max_score: null,
                      hits: [],
                  },
              }
            : {
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
                                  adresselinje1: 'Storgata 123',
                                  postnummer: '1234',
                                  poststed: 'Stedet',
                                  telefon: '12345678',
                                  epostadresse: 'e@post.no',
                                  fodselsdato: '2000.01.01',
                                  veileder: 'A100000',
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
        const skalMockeIngenTreff = (await req.text()).includes('09043826678');

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

const treff: Respons = {
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

const ingenTreff: Respons = {
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
