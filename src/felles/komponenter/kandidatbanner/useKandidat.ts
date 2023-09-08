import { api, post } from 'felles/api';
import { EsQuery, EsResponse } from 'felles/domene/elastic/ElasticSearch';
import { KandidatTilBanner } from 'felles/domene/kandidat/Kandidat';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { useEffect, useState } from 'react';

export const byggQuery = (kandidatnr: string): EsQuery<KandidatTilBanner> => ({
    query: {
        term: {
            kandidatnr: kandidatnr,
        },
    },
    size: 1,
    _source: [
        'fornavn',
        'etternavn',
        'arenaKandidatnr',
        'fodselsdato',
        'fodselsnummer',
        'adresselinje1',
        'postnummer',
        'poststed',
        'epostadresse',
        'telefon',
        'veileder',
        'geografiJobbonsker',
        'yrkeJobbonskerObj',
        'kommunenummerstring',
        'kommuneNavn',
        'veilederIdent',
        'veilederVisningsnavn',
        'veilederEpost',
    ],
});

const useKandidat = (kandidatnr: string): Nettressurs<KandidatTilBanner> => {
    const [kandidat, setKandidat] = useState<Nettressurs<KandidatTilBanner>>({
        kind: Nettstatus.LasterInn,
    });

    useEffect(() => {
        const hentKandidat = async () => {
            const response = await post<EsResponse<KandidatTilBanner>>(
                api.kandidatsøk,
                byggQuery(kandidatnr)
            );

            if (response.kind === Nettstatus.Suksess) {
                const kandidat = response.data.hits.hits[0]?._source;

                if (kandidat) {
                    setKandidat({
                        kind: Nettstatus.Suksess,
                        data: kandidat,
                    });
                } else {
                    setKandidat({
                        kind: Nettstatus.FinnesIkke,
                    });
                }
            } else {
                setKandidat({
                    kind: Nettstatus.Feil,
                    error: { message: 'Klarte ikke å hente kandidaten' },
                });
            }
        };

        hentKandidat();
    }, [kandidatnr]);

    return kandidat;
};

export default useKandidat;
