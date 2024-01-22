import { Alert, Button, Loader, Modal } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { sendEvent } from 'felles/amplitude';
import { KandidatLookup } from 'felles/domene/kandidat/Kandidat';
import { Nettressurs, Nettstatus, ikkeLastet } from 'felles/nettressurs';
import FødselsnummerPåKandidat from '../../../felles/komponenter/fnr-på-kandidat/FødselsnummerTekstfelt';
import BekreftMedNotat from '../../../felles/komponenter/legg-til-kandidat/BekreftMedNotat';
import Knapper from '../../../felles/komponenter/legg-til-kandidat/Knapper';
import { VarslingAction, VarslingActionType } from '../../common/varsling/varslingReducer';
import LeggTilFormidling from '../legg-til-formidling/LeggTilFormidling';
import css from './LeggTilKandidatModal.module.css';
import SynlighetsEvaluering from './SynlighetsEvaluering';
import { fetchKandidatMedFnr } from './kandidatApi';

type ILeggTilKandidat = {
    onClose: () => void;
    kandidatlisteId: string;
    stillingsId: string;
    erEier?: boolean;
};

const LeggTilKandidat: FunctionComponent<ILeggTilKandidat> = ({
    kandidatlisteId,
    onClose,
    erEier,
    stillingsId,
}) => {
    const dispatch = useDispatch();
    const [visSynlighetsEvaluering, setVisSynlighetsEvaluering] = useState<boolean>(false);
    const [fnr, setFnr] = useState<string | null>(null);
    const [feilmelding, setFeilmelding] = useState<string | null>(null);
    const [fnrSøk, setFnrSøk] = useState<Nettressurs<KandidatLookup>>(ikkeLastet());
    const [registrerFormidling, setRegistrerFormidling] = useState<boolean>(false);

    const tilbakestill = (medFeilmelding: string | null = null) => {
        setFeilmelding(medFeilmelding);
        setFnrSøk(ikkeLastet());
        setFnr(null);
        setVisSynlighetsEvaluering(false);
        setRegistrerFormidling(false);
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
                <FødselsnummerPåKandidat
                    callBack={(fødselsnummer) => {
                        if (fødselsnummer) {
                            hentKandidatMedFødselsnummer(fødselsnummer);
                            setFnr(fødselsnummer);
                        } else {
                            tilbakestill();
                        }
                    }}
                />

                {fnrSøk.kind === Nettstatus.LasterInn && (
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

                {registrerFormidling && (
                    <LeggTilFormidling
                        fnr={fnr}
                        stillingsId={stillingsId}
                        onClose={onClose}
                        kandidatlisteId={kandidatlisteId}
                    />
                )}
                {fnrSøk.kind === Nettstatus.FinnesIkke && !registrerFormidling && (
                    <>
                        <div style={{ marginTop: '1.5rem' }}>
                            <Alert inline variant="warning">
                                {feilmelding}
                            </Alert>
                            <br />
                            {visSynlighetsEvaluering ? (
                                <SynlighetsEvaluering fødselsnummer={fnr} />
                            ) : (
                                <Alert variant="info">
                                    <strong>
                                        Årsaken kan være en eller flere av disse: ​​​​​​​
                                    </strong>
                                    <ol>
                                        <li>Kandidaten mangler CV eller jobbprofil.</li>
                                        <li>
                                            Kandidaten har ikke blitt informert om NAVs
                                            behandlingsgrunnlag for deling av CV.
                                        </li>
                                        <li>
                                            Kandidaten har personforholdet «Fritatt for kandidatsøk»
                                            i Arena.
                                        </li>
                                        <li>
                                            ​​​​​​​Kandidaten har formidlingskode «Ikke servicebehov
                                            (ISERV)» i Arena.
                                        </li>
                                        <li>Kandidaten har status "Egen ansatt".</li>
                                        <li>Kandidaten har diskresjonskode (kode 6 og 7).</li>
                                        <li>
                                            Kandidaten er deltager i kommunalt kvalifiseringsprogram
                                            (KVP)
                                        </li>
                                    </ol>
                                    <Button
                                        onClick={() => setVisSynlighetsEvaluering(true)}
                                        variant="secondary"
                                    >
                                        Se hvorfor kandidaten ikke er synlig (punkt 1-5)
                                    </Button>
                                </Alert>
                            )}
                            <br />

                            {erEier ? (
                                <Button onClick={() => setRegistrerFormidling(true)}>
                                    Registrer formidling for usynlig kandidat
                                </Button>
                            ) : (
                                <span>
                                    Du må være eier av stillingen for å registrere formidling
                                </span>
                            )}
                        </div>
                    </>
                )}
            </Modal.Body>
            {!registrerFormidling && <Knapper leggTilDisabled onAvbrytClick={onClose} />}
        </>
    );
};

export default LeggTilKandidat;
