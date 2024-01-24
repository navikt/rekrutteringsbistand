import { Alert, Button, Loader, Modal } from '@navikt/ds-react';
import { KandidatLookup } from 'felles/domene/kandidat/Kandidat';
import { Nettressurs, Nettstatus, ikkeLastet } from 'felles/nettressurs';
import { FunctionComponent, useCallback, useState } from 'react';
import { IuseKandidatNavnSøk, KandidatKilde } from '../../../felles/hooks/useKandidatNavn';
import FødselsnummerPåKandidat from '../../../felles/komponenter/fnr-på-kandidat/FødselsnummerTekstfelt';
import KandidatNavn from '../../../felles/komponenter/kandidatNavn/KandidatNavnSøk';
import BekreftLeggTilKandidat from '../../../felles/komponenter/legg-til-kandidat/BekreftLeggTilKandidat';
import Knapper from '../../../felles/komponenter/legg-til-kandidat/Knapper';
import LeggTilFormidling from '../legg-til-formidling/LeggTilFormidling';
import css from './LeggTilKandidat.module.css';
import SynlighetsEvaluering from './SynlighetsEvaluering';

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
    const [visOppsummering, setVisOppsummering] = useState<boolean>(false);
    const [visSynlighetsEvaluering, setVisSynlighetsEvaluering] = useState<boolean>(false);
    const [fnr, setFnr] = useState<string | null>(null);
    const [fnrSøk, setFnrSøk] = useState<Nettressurs<KandidatLookup>>(ikkeLastet());
    const [registrerFormidling, setRegistrerFormidling] = useState<boolean>(false);

    const [kandidatSøkResultat, setKandidatSøkResultat] = useState<IuseKandidatNavnSøk | null>(
        null
    );

    const kandidatSøkResultatCallback = useCallback(
        (resultat: IuseKandidatNavnSøk) => {
            setKandidatSøkResultat((prevResultat) => {
                // Only update if resultat has actually changed
                if (JSON.stringify(prevResultat) !== JSON.stringify(resultat)) {
                    return resultat ?? null;
                }
                return prevResultat;
            });
        },
        [setKandidatSøkResultat]
    );

    const tilbakestill = () => {
        setFnrSøk(ikkeLastet());
        setFnr(null);
        setVisSynlighetsEvaluering(false);
        setRegistrerFormidling(false);
        setKandidatSøkResultat(null);
    };

    // const hentKandidatMedFødselsnummer = async (fnr: string) => {
    //     setFnrSøk({
    //         kind: Nettstatus.LasterInn,
    //     });

    //     try {
    //         const fnrSøkResponse = await fetchKandidatMedFnr(fnr);
    //         setFnrSøk(fnrSøkResponse);

    //         if (fnrSøkResponse.kind === Nettstatus.FinnesIkke) {
    //             setFeilmelding('Kandidaten er ikke synlig i Rekrutteringsbistand');

    //             sendEvent('legg_til_kandidat', 'fant_ingen_kandidat', {
    //                 kontekst: 'stilling',
    //             });
    //         }
    //     } catch (e) {
    //         setFnrSøk({
    //             kind: Nettstatus.Feil,
    //             error: {
    //                 message: 'Klarte ikke å hente kandidat med fødselsnummer',
    //             },
    //         });
    //     }
    // };

    const handleBekreft = () => {
        setVisOppsummering(true);
    };

    if (visOppsummering) {
        return (
            <div style={{ margin: '1rem' }}>
                <Alert variant="success">
                    Kandidat {kandidatSøkResultat?.fornavn} {kandidatSøkResultat?.etternavn} ({fnr})
                    er lagt til
                </Alert>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <Button variant="secondary" onClick={onClose}>
                        Lukk
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={css.leggTilKandidat}>
            <Modal.Body>
                <Alert variant="warning" style={{ marginBottom: '1rem' }}>
                    Før du legger en kandidat på kandidatlisten må du undersøke om personen
                    oppfyller kravene som er nevnt i stillingen.
                </Alert>
                <FødselsnummerPåKandidat
                    callBack={(fødselsnummer) => {
                        if (fødselsnummer) {
                            setFnr(fødselsnummer);
                        } else {
                            tilbakestill();
                        }
                    }}
                />

                {fnr && <KandidatNavn fnr={fnr} callback={kandidatSøkResultatCallback} />}

                {kandidatSøkResultat &&
                    kandidatSøkResultat.kilde === KandidatKilde.REKRUTTERINGSBISTAND && (
                        <BekreftLeggTilKandidat
                            kandidatnr={kandidatSøkResultat.kandidatnr}
                            kandidatlisteId={kandidatlisteId}
                            onAvbryt={onClose}
                            onBekreft={handleBekreft}
                        />
                    )}

                {kandidatSøkResultat &&
                    (kandidatSøkResultat.kilde === KandidatKilde.FINNES_IKKE ||
                        kandidatSøkResultat.kilde === KandidatKilde.PDL) && (
                        <>
                            {registrerFormidling ? (
                                <LeggTilFormidling
                                    handleBekreft={handleBekreft}
                                    kandidatSøkResultat={kandidatSøkResultat}
                                    fnr={fnr}
                                    stillingsId={stillingsId}
                                    onClose={onClose}
                                    kandidatlisteId={kandidatlisteId}
                                />
                            ) : (
                                <div style={{ marginTop: '1.5rem' }}>
                                    <Alert inline variant="warning">
                                        Kandidaten er ikke synlig i Rekrutteringsbistand
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
                                                    Kandidaten har personforholdet «Fritatt for
                                                    kandidatsøk» i Arena.
                                                </li>
                                                <li>
                                                    ​​​​​​​Kandidaten har formidlingskode «Ikke
                                                    servicebehov (ISERV)» i Arena.
                                                </li>
                                                <li>Kandidaten har status "Egen ansatt".</li>
                                                <li>
                                                    Kandidaten har diskresjonskode (kode 6 og 7).
                                                </li>
                                                <li>
                                                    Kandidaten er deltager i kommunalt
                                                    kvalifiseringsprogram (KVP)
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
                                            Du må være eier av stillingen for å registrere
                                            formidling
                                        </span>
                                    )}
                                    <Knapper leggTilDisabled onAvbrytClick={onClose} />
                                </div>
                            )}
                        </>
                    )}

                {fnrSøk.kind === Nettstatus.LasterInn && (
                    <Loader size="medium" className={css.spinner} />
                )}

                {!kandidatSøkResultat && <Knapper leggTilDisabled onAvbrytClick={onClose} />}
            </Modal.Body>
        </div>
    );
};

export default LeggTilKandidat;
