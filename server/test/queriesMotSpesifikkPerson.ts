import { EsQuery } from '../../src/felles/domene/elastic/ElasticSearch';
import Kandidat from '../../src/felles/domene/kandidat/Kandidat';

export const queryTilKandidatsøkMedAktørIdOgFødselsnummer = (
    personId: string
): EsQuery<Kandidat> => ({
    query: {
        bool: {
            must: [
                {
                    bool: {
                        should: [
                            { term: { aktorId: personId } },
                            { term: { fodselsnummer: personId } },
                        ],
                    },
                },
                { terms: { kvalifiseringsgruppekode: ['BATT', 'BFORM', 'IKVAL', 'VARIG'] } },
            ],
        },
    },
    size: 25,
    from: 0,
    track_total_hits: true,
    sort: { tidsstempel: { order: 'desc' } },
    _source: [
        'fodselsnummer',
        'fornavn',
        'etternavn',
        'arenaKandidatnr',
        'kvalifiseringsgruppekode',
        'yrkeJobbonskerObj',
        'geografiJobbonsker',
        'kommuneNavn',
        'postnummer',
    ],
});

export const queryTilHentKandidat = (kandidatnr: string): EsQuery<Kandidat> => ({
    size: 1,
    query: { term: { kandidatnr: kandidatnr } },
});

export const responseJsonTilHentKandidat = (fodselsnummer: string) => ({
    hits: {
        hits: [
            {
                _source: {
                    aktorId: '2681869303229',
                    fodselsnummer: '41928601194',
                },
            },
        ],
    },
});
