import { Alert, Button, Modal } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import { useHentArenaKandidatnr } from '../../../api/kandidat-søk-api/hentArenaKandidatnr';
import { KandidatKilde, useHentKandidatnavn } from '../../../api/kandidat-søk-api/hentKandidatnavn';
import FødselsnummerPåKandidat from '../../../felles/komponenter/fnr-på-kandidat/FødselsnummerTekstfelt';
import KandidatNavn from '../../../felles/komponenter/kandidatNavn/KandidatNavnSøk';
import BekreftLeggTilKandidat from '../../../felles/komponenter/legg-til-kandidat/BekreftLeggTilKandidat';
import Knapper from '../../../felles/komponenter/legg-til-kandidat/Knapper';
import KandidatlisteActionType from '../../../kandidat/kandidatliste/reducer/KandidatlisteActionType';
import kandidatStore from '../../../kandidat/state/reduxStore';
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
    const [registrerFormidling, setRegistrerFormidling] = useState<boolean>(false);
    const { navn: kandidatnavn } = useHentKandidatnavn({ fodselsnummer: fnr });
    const { arenaKandidatnr } = useHentArenaKandidatnr({ fodselsnummer: fnr });

    const tilbakestill = () => {
        setFnr(null);
        setVisSynlighetsEvaluering(false);
        setRegistrerFormidling(false);
    };

    const handleBekreft = () => {
        setVisOppsummering(true);
        const kandidatlisteState = kandidatStore.getState().kandidatliste.kandidatliste;
        if (
            kandidatlisteState.kind === 'Suksess' &&
            kandidatlisteState.data.stillingId === stillingsId
        ) {
            kandidatStore.dispatch({
                type: KandidatlisteActionType.HentKandidatlisteMedStillingsId,
                stillingsId,
            });
        }
    };
    if (visOppsummering) {
        return (
            <div style={{ margin: '1rem' }}>
                <Alert variant="success">
                    Kandidat {kandidatnavn?.fornavn} {kandidatnavn?.etternavn} ({fnr}) er lagt til
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
                <div style={{ width: '600px' }}>
                    <FødselsnummerPåKandidat
                        callBack={(fødselsnummer) => {
                            if (fødselsnummer) {
                                tilbakestill();
                                setFnr(fødselsnummer);
                            } else {
                                tilbakestill();
                            }
                        }}
                    />
                    {fnr && !registrerFormidling && <KandidatNavn fnr={fnr} />}

                    {kandidatnavn &&
                        kandidatnavn.kilde === KandidatKilde.REKRUTTERINGSBISTAND &&
                        (registrerFormidling ? (
                            <LeggTilFormidling
                                kilde={KandidatKilde.REKRUTTERINGSBISTAND}
                                handleBekreft={handleBekreft}
                                kandidatSøkResultat={kandidatnavn}
                                fnr={fnr}
                                stillingsId={stillingsId}
                                onClose={onClose}
                                kandidatlisteId={kandidatlisteId}
                            />
                        ) : (
                            <BekreftLeggTilKandidat
                                // @ts-ignore TODO: written before strict-mode enabled
                                kandidatnr={arenaKandidatnr}
                                kandidatlisteId={kandidatlisteId}
                                onAvbryt={onClose}
                                onBekreft={handleBekreft}
                                setRegistrerFormidling={
                                    erEier ? () => setRegistrerFormidling(true) : undefined
                                }
                            />
                        ))}
                    {kandidatnavn && kandidatnavn.kilde === KandidatKilde.PDL && (
                        <>
                            {registrerFormidling ? (
                                <LeggTilFormidling
                                    kilde={KandidatKilde.PDL}
                                    handleBekreft={handleBekreft}
                                    kandidatSøkResultat={kandidatnavn}
                                    fnr={fnr}
                                    stillingsId={stillingsId}
                                    onClose={onClose}
                                    kandidatlisteId={kandidatlisteId}
                                />
                            ) : (
                                <div style={{ marginTop: '1.5rem' }}>
                                    <Alert variant="warning">
                                        Kandidaten er ikke synlig i Rekrutteringsbistand
                                    </Alert>
                                    <br />
                                    {visSynlighetsEvaluering ? (
                                        <SynlighetsEvaluering fødselsnummer={fnr} />
                                    ) : (
                                        <Alert variant="info">
                                            <strong>
                                                Årsaken kan være en eller flere av disse:
                                            </strong>
                                            <ol>
                                                <li>Kandidaten mangler CV eller jobbprofil.</li>
                                                <li>
                                                    Kandidaten har ikke blitt informert om NAVs
                                                    behandlingsgrunnlag for deling av CV.
                                                </li>
                                                <li>
                                                    Kandidat har ikke valgt «Del CV». Kandidaten har
                                                    tidligere registrert CV, men har siden vært ute
                                                    av oppfølging. Kandidaten er igjen under
                                                    oppfølging, men har ikke godkjent deling av CV
                                                    med NAV i dette nye oppfølgingsløpet. Hen må
                                                    logge seg inn på arbeidsplassen.no og velge “Del
                                                    CV”. Husk å be bruker om å oppdatere CV.
                                                </li>
                                                <li>
                                                    Kandidaten har personforholdet «Fritatt for
                                                    kandidatsøk» i Arena.
                                                </li>
                                                <li>
                                                    Kandidaten har formidlingskode «Ikke
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

                                    {erEier && (
                                        <Button
                                            onClick={() => setRegistrerFormidling(true)}
                                            style={{ width: '100%', marginBottom: '1rem' }}
                                        >
                                            Registrer formidling
                                        </Button>
                                    )}
                                    <Knapper leggTilDisabled onAvbrytClick={onClose} />
                                </div>
                            )}
                        </>
                    )}
                    {!kandidatnavn && <Knapper leggTilDisabled onAvbrytClick={onClose} />}
                </div>
            </Modal.Body>
        </div>
    );
};

export default LeggTilKandidat;
