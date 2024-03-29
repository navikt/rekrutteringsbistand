import { BodyLong, ErrorMessage, Heading } from '@navikt/ds-react';
import { api } from 'felles/api';
import Synlighetsevaluering from 'felles/domene/synlighet/Synlighetsevaluering';
import KandidatenFinnesIkke from 'felles/komponenter/legg-til-kandidat/KandidatenFinnesIkke';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidelaster from '../../../felles/komponenter/sidelaster/Sidelaster';
import css from './InngangFraArbop.module.css';
import { useHentArenaKandidatnr } from '../../../api/kandidat-søk-api/hentArenaKandidatnr';

const InngangFraArbop = () => {
    const navigate = useNavigate();
    const [fnr, setFnr] = useState<string | null>(null);
    const { arenaKandidatnr } = useHentArenaKandidatnr({ fodselsnummer: fnr });

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
            setPersonbruker({ kind: Nettstatus.LasterInn });
            const modiaRespons = await fetch(`${api.modiaContextHolder}/context/aktivbruker`);

            if (!modiaRespons.ok) {
                return setPersonbruker({
                    kind: Nettstatus.Feil,
                    error: { message: 'Klarte ikke å hente fødselsnummer fra Modia-dekoratøren' },
                });
            }

            setFnr((await modiaRespons.json()).aktivBruker);

            if (fnr === null) {
                return setPersonbruker({
                    kind: Nettstatus.Feil,
                    error: { message: 'Ingen person er valgt i Modia-dekoratøren' },
                });
            } else {
                setPersonbruker({
                    kind: Nettstatus.Suksess,
                    data: fnr,
                });
            }

            if (arenaKandidatnr) {
                return navigate(
                    `/stillinger/stillingssok/kandidat/${arenaKandidatnr}?brukKriterierFraKandidat=true`
                );
            }

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
        };

        hentAktivPersonbruker();
    }, [navigate, fnr, setFnr, arenaKandidatnr]);

    if (personbruker.kind === Nettstatus.Feil) {
        return (
            <div className={css.inngangFraArbop}>
                <Heading level="2" size="large">
                    Det skjedde en feil
                </Heading>
                <ErrorMessage>{personbruker.error.message}</ErrorMessage>
            </div>
        );
    }

    if (synlighetsevaluering.kind === Nettstatus.Feil) {
        return (
            <div className={css.inngangFraArbop}>
                <Heading level="2" size="large">
                    Fant ikke kandidaten
                </Heading>
                <ErrorMessage>{synlighetsevaluering.error.message}</ErrorMessage>
            </div>
        );
    }

    if (synlighetsevaluering.kind === Nettstatus.Suksess) {
        return (
            <div className={css.inngangFraArbop}>
                <Heading level="2" size="large">
                    Fant ikke kandidaten
                </Heading>
                <BodyLong>Kandidaten er ikke synlig i Rekrutteringsbistand.</BodyLong>
                {synlighetsevaluering.kind === Nettstatus.Suksess && (
                    <KandidatenFinnesIkke synlighetsevaluering={synlighetsevaluering.data} />
                )}
            </div>
        );
    }

    return <Sidelaster />;
};

export default InngangFraArbop;
