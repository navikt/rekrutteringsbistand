import { ErrorMessage, Heading, Loader } from '@navikt/ds-react';
import { api, post } from 'felles/api';
import { EsQuery, EsResponse } from 'felles/domene/elastic/ElasticSearch';
import Kandidat from 'felles/domene/kandidat/Kandidat';
import Synlighetsevaluering from 'felles/domene/synlighet/Synlighetsevaluering';
import KandidatenFinnesIkke from 'felles/komponenter/legg-til-kandidat/KandidatenFinnesIkke';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import css from './InngangFraArbop.module.css';

type KunKandidatnr = {
    arenaKandidatnr: Kandidat['arenaKandidatnr'];
};

const InngangFraArbop = () => {
    const [personbruker, setPersonbruker] = useState<Nettressurs<string>>({
        kind: Nettstatus.IkkeLastet,
    });
    const [synlighetsevaluering, setSynlighetsevaluering] = useState<
        Nettressurs<Synlighetsevaluering>
    >({
        kind: Nettstatus.IkkeLastet,
    });

    useEffect(() => {
        const hentAktivPersonbruker = async () => {
            const modiaRespons = await fetch(`${api.modiaContextHolder}`);

            if (!modiaRespons.ok) {
                setPersonbruker({
                    kind: Nettstatus.Feil,
                    error: { message: 'Fødselsnummer er ikke valgt i Modia' },
                });
            }

            const fnr: string = (await modiaRespons.json()).aktivBruker;

            const esQuery: EsQuery<KunKandidatnr> = {
                query: {
                    term: {
                        fodselsnummer: fnr,
                    },
                },
                size: 1,
                _source: ['arenaKandidatnr'],
            };

            const esRespons = await post<EsResponse<KunKandidatnr>>(api.kandidatsøk, esQuery);

            if (esRespons.kind === Nettstatus.Suksess) {
                const kandidatnr = esRespons.data.hits.hits[0]?._source?.arenaKandidatnr;

                if (kandidatnr) {
                    redirect(`/stillingssok/${kandidatnr}?brukKriterierFraKandidat=true`);
                }
            } else {
                const response = await fetch(`${api.synlighet}/evaluering/${fnr}`);

                if (response.ok) {
                    setSynlighetsevaluering({
                        kind: Nettstatus.Suksess,
                        data: await response.json(),
                    });
                } else {
                    setSynlighetsevaluering({
                        kind: Nettstatus.Feil,
                        error: { message: 'Kunne ikke hente synlighetsevaluering' },
                    });
                }
            }
        };

        hentAktivPersonbruker();
    }, []);

    if (personbruker.kind === Nettstatus.Feil) {
        return (
            <div className={css.inngangFraArbop}>
                <Heading level="2" size="large">
                    Det skjedde en feil
                </Heading>
                <ErrorMessage>{personbruker.error.message}</ErrorMessage>
                {synlighetsevaluering.kind === Nettstatus.Suksess && (
                    <KandidatenFinnesIkke synlighetsevaluering={synlighetsevaluering.data} />
                )}
            </div>
        );
    }

    return <Loader size="2xlarge" />;
};

export default InngangFraArbop;
