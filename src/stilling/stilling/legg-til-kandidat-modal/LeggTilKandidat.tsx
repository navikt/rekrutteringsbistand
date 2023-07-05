import { ChangeEvent, FunctionComponent, useState } from 'react';
import { Loader, TextField } from '@navikt/ds-react';
import fnrValidator from '@navikt/fnrvalidator';

import { ApiError } from '../../api/apiUtils';
import { fetchKandidatMedFnr } from './kandidatApi';
import { fetchSynlighetsevaluering } from './kandidatApi';
import { Kandidat, Kandidatliste } from './kandidatlistetyper';
import { Nettressurs, ikkeLastet, Nettstatus, lasterInn } from '../../api/Nettressurs';
import { Synlighetsevaluering } from './kandidaten-finnes-ikke/Synlighetsevaluering';
import BekreftMedNotat from './BekreftMedNotat';
import KandidatenFinnesIkke from './kandidaten-finnes-ikke/KandidatenFinnesIkke';
import LeggTilEllerAvbryt from './LeggTilEllerAvbryt';
import css from './LeggTilKandidatModal.module.css';
import { sendEvent } from 'felles/amplitude';

type Props = {
    kandidatliste: Kandidatliste;
    onClose: () => void;
};

const LeggTilKandidat: FunctionComponent<Props> = ({ kandidatliste, onClose }) => {
    const [fnr, setFnr] = useState<string>('');
    const [feilmelding, setFeilmelding] = useState<string | null>(null);
    const [fnrSøk, setFnrSøk] = useState<Nettressurs<Kandidat>>(ikkeLastet());
    const [synlighetsevaluering, setSynlighetsevaluering] = useState<
        Nettressurs<Synlighetsevaluering>
    >(ikkeLastet());

    const tilbakestill = (medFeilmelding: string | null = null) => {
        setFeilmelding(medFeilmelding);
        setFnrSøk(ikkeLastet());
        setSynlighetsevaluering(ikkeLastet());
    };

    const onFnrChange = (event: ChangeEvent<HTMLInputElement>) => {
        const fnr = event.target.value;

        setFnr(fnr);

        if (fnr.length < 11) {
            tilbakestill();
        } else if (fnr.length > 11) {
            tilbakestill('Fødselsnummeret er for langt');
        } else {
            const erGyldig = validerFnr(fnr);

            if (erGyldig) {
                setFeilmelding(null);

                if (erFnrAlleredeIListen(fnr)) {
                    setFeilmelding('Kandidaten er allerede lagt til i listen');
                } else {
                    hentKandidatMedFødselsnummer(fnr);
                }
            } else {
                tilbakestill('Fødselsnummeret er ikke gyldig');
            }
        }
    };

    const erFnrAlleredeIListen = (fnr: string) =>
        kandidatliste.kandidater.some((kandidat) => kandidat.fodselsnr === fnr);

    const hentKandidatMedFødselsnummer = async (fnr: string) => {
        setFnrSøk({
            kind: Nettstatus.LasterInn,
        });

        try {
            const fnrSøkResponse = await fetchKandidatMedFnr(fnr);
            setFnrSøk(fnrSøkResponse);

            if (fnrSøkResponse.kind === Nettstatus.FinnesIkke) {
                setFeilmelding('Kandidaten er ikke synlig i Rekrutteringsbistand');

                sendEvent('legg_til_kandidat', 'fant_ingen_kandidat', {
                    kontekst: 'stilling',
                });

                setSynlighetsevaluering(lasterInn());
                const synlighetPromise = fetchSynlighetsevaluering(fnr);

                setSynlighetsevaluering(await synlighetPromise);
            }
        } catch (e) {
            setFnrSøk({
                kind: Nettstatus.Feil,
                error: new ApiError('Klarte ikke å hente kandidat med fødselsnummer', 0),
            });
        }
    };

    return (
        <>
            <TextField
                autoFocus
                value={fnr}
                size="medium"
                id="legg-til-kandidat-fnr"
                onChange={onFnrChange}
                placeholder="11 siffer"
                className={css.input}
                label="Fødselsnummer på kandidaten"
                error={feilmelding}
            />

            {(fnrSøk.kind === Nettstatus.LasterInn ||
                synlighetsevaluering.kind === Nettstatus.LasterInn) && (
                <Loader size="medium" className={css.spinner} />
            )}

            {fnrSøk.kind === Nettstatus.Suksess && (
                <BekreftMedNotat
                    fnr={fnr}
                    kandidat={fnrSøk.data}
                    kandidatliste={kandidatliste}
                    onClose={onClose}
                />
            )}

            {fnrSøk.kind === Nettstatus.FinnesIkke &&
                synlighetsevaluering.kind === Nettstatus.Suksess && (
                    <KandidatenFinnesIkke synlighetsevaluering={synlighetsevaluering.data} />
                )}

            {fnrSøk.kind !== Nettstatus.Suksess && (
                <LeggTilEllerAvbryt leggTilDisabled onAvbrytClick={onClose} />
            )}
        </>
    );
};

const validerFnr = (fnr: string): boolean => fnrValidator.idnr(fnr).status === 'valid';

export default LeggTilKandidat;
