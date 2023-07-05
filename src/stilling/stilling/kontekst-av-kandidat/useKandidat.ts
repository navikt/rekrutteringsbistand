import { useState, useEffect } from 'react';
import { api } from 'felles/api';
import { ForenkletKandidatISøk } from 'felles/domene/kandidat-i-søk/KandidatISøk';

export type EsRespons = {
    hits: {
        hits: Array<{
            _source: ForenkletKandidatISøk;
        }>;
    };
};

const byggQuery = (fodselsnummer: string) => ({
    query: {
        term: {
            fodselsnummer,
        },
    },
    size: 1,

    // Feltene fra 'ForenkletKandidatISøk'-typen
    _source: [
        'adresselinje1',
        'aktorId',
        'arenaKandidatnr',
        'epostadresse',
        'etternavn',
        'fodselsdato',
        'fodselsnummer',
        'fornavn',
        'kandidatnr',
        'kommunenummer',
        'kommunenummerstring',
        'postnummer',
        'poststed',
        'telefon',
        'veileder',
    ],
});

const useKandidat = (fnr: string) => {
    const [kandidat, setKandidat] = useState<ForenkletKandidatISøk>();
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
