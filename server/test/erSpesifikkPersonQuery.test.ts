import { describe, expect, test } from '@jest/globals';
import { EsQuery } from '../../src/felles/domene/elastic/ElasticSearch';
import Kandidat from '../../src/felles/domene/kandidat/Kandidat';
import * as kandidatsøk from '../src/kandidatsøk/kandidatsøk';

describe('ES body for søk', () => {
    let queryMock = (bool?: object): EsQuery<Kandidat> => {
        return {
            query: {
                bool: {
                    must: [
                        {
                            bool: bool,
                        },
                    ],
                },
            },
            _source: [
                'fodselsnummer',
                'fornavn',
                'etternavn',
                'arenaKandidatnr',
                'kvalifiseringsgruppekode',
                'yrkeJobbonskerObj',
                'geografiJobbonsker',
            ],
        };
    };

    test('Er ES body med søk på fødselsnummer og aktørId', async () => {
        const resultat = kandidatsøk.erSpesifikkPersonQuery(
            queryMock({
                should: [
                    {
                        term: {
                            aktorId: '21909899211',
                        },
                    },
                    {
                        term: {
                            fodselsnummer: '21909899211',
                        },
                    },
                ],
            })
        );

        expect(resultat).toBeTruthy();
    });

    test('Er ES body med søk på fødselsnummer', async () => {
        const resultat = kandidatsøk.erSpesifikkPersonQuery(
            queryMock({
                should: [
                    {
                        term: {
                            fodselsnummer: '21909899211',
                        },
                    },
                ],
            })
        );
        expect(resultat).toBeTruthy();
    });

    test('Er ES body med søk på aktørId', async () => {
        const resultat = kandidatsøk.erSpesifikkPersonQuery(
            queryMock({
                should: [
                    {
                        term: {
                            aktorId: '21909899211',
                        },
                    },
                ],
            })
        );
        expect(resultat).toBeTruthy();
    });

    test('Er ES body uten søk på fødselsnummer eller aktørId', async () => {
        const resultat = kandidatsøk.erSpesifikkPersonQuery(queryMock());
        expect(resultat).toBeFalsy();
    });

    test('Henter fnr fra ES body når det finnes', async () => {
        const resultat = kandidatsøk.erSpesifikkPersonQuery(
            queryMock({
                should: [
                    {
                        term: {
                            aktorId: '21909899211',
                        },
                    },
                    {
                        term: {
                            fodselsnummer: '10108000398',
                        },
                    },
                ],
            })
        );
        expect(resultat).toBe('10108000398');
    });

    test('Henter aktørid fra ES body når fnr ikke finnes', async () => {
        const resultat = kandidatsøk.erSpesifikkPersonQuery(
            queryMock({
                should: [
                    {
                        term: {
                            aktorId: '21909899211',
                        },
                    },
                ],
            })
        );
        expect(resultat).toBe('21909899211');
    });
});
