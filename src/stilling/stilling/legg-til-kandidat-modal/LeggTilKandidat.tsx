import { Loader, Modal, TextField } from '@navikt/ds-react';
import fnrValidator from '@navikt/fnrvalidator';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { sendEvent } from 'felles/amplitude';
import { KandidatLookup } from 'felles/domene/kandidat/Kandidat';
import Synlighetsevaluering from 'felles/domene/synlighet/Synlighetsevaluering';
import KandidatenFinnesIkke from 'felles/komponenter/legg-til-kandidat/KandidatenFinnesIkke';
import Knapper from 'felles/komponenter/legg-til-kandidat/Knapper';
import { Nettressurs, Nettstatus, ikkeLastet, lasterInn } from 'felles/nettressurs';
import BekreftMedNotat from '../../../felles/komponenter/legg-til-kandidat/BekreftMedNotat';
import { VarslingAction, VarslingActionType } from '../../common/varsling/varslingReducer';
import css from './LeggTilKandidatModal.module.css';
import { fetchKandidatMedFnr, fetchSynlighetsevaluering } from './kandidatApi';

type Props = {
    onClose: () => void;
    kandidatlisteId: string;
};

const LeggTilKandidat: FunctionComponent<Props> = ({ kandidatlisteId, onClose }) => {
    const dispatch = useDispatch();

    const [fnr, setFnr] = useState<string>('');
    const [feilmelding, setFeilmelding] = useState<string | null>(null);
    const [fnrSøk, setFnrSøk] = useState<Nettressurs<KandidatLookup>>(ikkeLastet());
    const [synlighetsevaluering, setSynlighetsevaluering] = useState<
        Nettressurs<Synlighetsevaluering>
    >(ikkeLastet());

    const tilbakestill = (medFeilmelding: string | null = null) => {
        setFeilmelding(medFeilmelding);
        setFnrSøk(ikkeLastet());
        setSynlighetsevaluering(ikkeLastet());
    };

    const handleFnrChange = (event: ChangeEvent<HTMLInputElement>) => {
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

                hentKandidatMedFødselsnummer(fnr);
            } else {
                tilbakestill('Fødselsnummeret er ikke gyldig');
            }
        }
    };

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
                error: {
                    message: 'Klarte ikke å hente kandidat med fødselsnummer',
                },
            });
        }
    };

    const handleBekreft = () => {
        onClose();

        if (fnrSøk.kind === Nettstatus.Suksess) {
            dispatch<VarslingAction>({
                type: VarslingActionType.VisVarsling,
                innhold: `Kandidat ${fnrSøk.data.fornavn} ${fnrSøk.data.etternavn} (${fnr}) er lagt til`,
            });
        }
    };

    return (
        <>
            <Modal.Body>
                <TextField
                    autoFocus
                    value={fnr}
                    size="medium"
                    id="legg-til-kandidat-fnr"
                    onChange={handleFnrChange}
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
                        kandidatlisteId={kandidatlisteId}
                        onAvbryt={onClose}
                        onBekreft={handleBekreft}
                    />
                )}

                {fnrSøk.kind === Nettstatus.FinnesIkke &&
                    synlighetsevaluering.kind === Nettstatus.Suksess && (
                        <KandidatenFinnesIkke synlighetsevaluering={synlighetsevaluering.data} />
                    )}
            </Modal.Body>

            {fnrSøk.kind !== Nettstatus.Suksess && (
                <Knapper leggTilDisabled onAvbrytClick={onClose} />
            )}
        </>
    );
};

const validerFnr = (fnr: string): boolean => fnrValidator.idnr(fnr).status === 'valid';

export default LeggTilKandidat;
