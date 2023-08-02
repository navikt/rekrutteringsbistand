import { useState, useEffect } from 'react';
import { api } from 'felles/api';
import { KandidatTilStillingssøk } from 'felles/domene/kandidat/Kandidat';

export type EsRespons = {
    hits: {
        hits: Array<{
            _source: KandidatTilStillingssøk;
        }>;
    };
};

type EsQuery = {
    query: object;
    size: number;
    _source: Array<keyof KandidatTilStillingssøk>;
};

const byggQuery = (fodselsnummer: string): EsQuery => ({
    query: {
        term: {
            fodselsnummer,
        },
    },
    size: 1,
    _source: [
        'fornavn',
        'etternavn',
        'arenaKandidatnr',
        'fodselsdato',
        'adresselinje1',
        'postnummer',
        'poststed',
        'epostadresse',
        'telefon',
        'veileder',
        'geografiJobbonsker',
        'yrkeJobbonskerObj',
    ],
});

const useKandidat = (fnr: string) => {
    const [kandidat, setKandidat] = useState<KandidatTilStillingssøk>();
    const [feilmelding, setFeilmelding] = useState<string | undefined>();

    useEffect(() => {
        const hentKandidat = async (fnr: string) => {
            try {
                const respons = await fetch(api.kandidatsøk, {
                    method: 'POST',
                    body: JSON.stringify(byggQuery(fnr)),
                    headers: { 'Content-Type': 'application/json' },
                });

                const esRespons = (await respons.json()) as EsRespons;
                const kandidat = esRespons.hits.hits.at(0)?._source;

                if (kandidat) {
                    setKandidat(kandidat);
                } else {
                    setFeilmelding('Fant ikke kandidat med fødselsnummer ' + fnr);
                }
            } catch (e) {
                setFeilmelding('Klarte ikke å hente kandidat');
            }
        };

        hentKandidat(fnr);
    }, [fnr]);

    return {
        kandidat,
        feilmelding,
    };
};

export default useKandidat;
