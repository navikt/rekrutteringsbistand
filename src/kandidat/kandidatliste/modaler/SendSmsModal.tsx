import { Button, Modal } from '@navikt/ds-react';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Alert, BodyShort, Label, Link, Select } from '@navikt/ds-react';
import { KandidatIKandidatliste } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { Meldingsmal } from '../../../api/sms-api/sms';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import AppState from '../../state/AppState';
import { Kandidatmeldinger } from '../domene/Kandidatressurser';
import useMarkerteKandidater from '../hooks/useMarkerteKandidater';
import KandidatlisteAction from '../reducer/KandidatlisteAction';
import KandidatlisteActionType from '../reducer/KandidatlisteActionType';
import css from './SendSmsModal.module.css';
import { SmsStatus } from '../reducer/kandidatlisteReducer';

type Props = {
    vis: boolean;
    onClose: () => void;
    kandidater: KandidatIKandidatliste[];
    stillingId: string;
    sendteMeldinger: Kandidatmeldinger;
    stillingskategori: Stillingskategori | null;
};

const SendSmsModal: FunctionComponent<Props> = (props) => {
    const { vis, onClose, kandidater, stillingId, sendteMeldinger, stillingskategori } = props;

    const dispatch: Dispatch<KandidatlisteAction> = useDispatch();
    const { sendStatus } = useSelector((state: AppState) => state.kandidatliste.sms);
    const markerteKandidater = useMarkerteKandidater(kandidater);

    const sendSmsTilKandidater = ({
        mal,
        fnr,
        stillingId,
    }: {
        mal: Meldingsmal;
        fnr: string[];
        stillingId: string;
    }) => {
        dispatch({
            type: KandidatlisteActionType.SendSms,
            mal,
            fnr,
            stillingId,
        });
    };

    const kandidaterSomHarFåttSms = markerteKandidater.filter(
        (kandidat) => kandidat.fodselsnr && sendteMeldinger[kandidat.fodselsnr]
    );
    const kandidaterSomIkkeHarFåttSms = markerteKandidater.filter(
        (kandidat) => !(kandidat.fodselsnr && sendteMeldinger[kandidat.fodselsnr])
    );
    const harInaktiveKandidater = markerteKandidater.some(
        (kandidat) => kandidat.fodselsnr === null
    );

    const lenkeTilStilling = genererLenkeTilStilling(stillingId);
    const lenkeMedPrefiks = `https://www.${lenkeTilStilling}`;

    const [valgtMal, setValgtMal] = useState<Meldingsmal>(
        stillingskategori === Stillingskategori.Jobbmesse
            ? Meldingsmal.Jobbarrangement
            : Meldingsmal.VurdertSomAktuell
    );

    const onSendSms = () => {
        const korrektLengdeFødselsnummer = 11;

        sendSmsTilKandidater({
            mal: valgtMal,
            fnr: kandidaterSomIkkeHarFåttSms
                .map((kandidat) => kandidat.fodselsnr || '')
                .filter((fnr) => fnr && fnr.length === korrektLengdeFødselsnummer),
            stillingId,
        });
    };

    return (
        <Modal
            open={vis}
            className={css.sendSmsModal}
            onClose={onClose}
            aria-label={`Send SMS til ${kandidater.length} kandidater`}
            header={{
                heading: 'Send SMS',
            }}
        >
            <Modal.Body>
                {(kandidaterSomHarFåttSms.length > 0 || harInaktiveKandidater) && (
                    <Alert variant="warning" size="small" className={css.alleredeSendtAdvarsel}>
                        Ikke alle kandidatene vil motta SMS-en
                        <ul className={css.alleredeSendtAdvarselListe}>
                            {kandidaterSomHarFåttSms.length > 0 && (
                                <li>
                                    {kandidaterSomHarFåttSms.length === 1 ? (
                                        <>Du har allerede sendt SMS til én av kandidatene.</>
                                    ) : (
                                        <>
                                            Du har allerede sendt SMS til{' '}
                                            {kandidaterSomHarFåttSms.length} av de{' '}
                                            {markerteKandidater.length} valgte kandidatene.
                                        </>
                                    )}
                                </li>
                            )}
                            {harInaktiveKandidater && (
                                <li>Én eller flere av kandidatene er inaktive.</li>
                            )}
                        </ul>
                    </Alert>
                )}
                <div className="send-sms-modal__innhold">
                    <BodyShort>
                        Det vil bli sendt SMS til <b>{kandidaterSomIkkeHarFåttSms.length}</b>{' '}
                        {kandidaterSomIkkeHarFåttSms.length === 1 ? 'kandidat' : 'kandidater'}
                    </BodyShort>
                    <BodyShort size="small">
                        Telefonnummerene blir hentet fra Kontakt- og reservasjonsregisteret.
                    </BodyShort>
                    <Alert variant="info" className={css.kontortidAdvarsel}>
                        <Label size="small">
                            SMS sendes ut mellom 09:00 og 17:15 hver dag. Det kan oppstå
                            forsinkelser.
                        </Label>
                    </Alert>

                    {stillingskategori !== Stillingskategori.Jobbmesse && (
                        <Select
                            className={css.velgMal}
                            label="Velg beskjed som skal vises i SMS-en*"
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                setValgtMal(e.target.value as Meldingsmal);
                            }}
                        >
                            <option value={Meldingsmal.VurdertSomAktuell}>
                                Send stilling til en aktuell kandidat
                            </option>
                            <option value={Meldingsmal.FunnetPassendeStilling}>
                                Oppfordre kandidat til å søke på stilling
                            </option>
                        </Select>
                    )}
                    <Label htmlFor="forhåndsvisning">
                        Meldingen som vil bli sendt til kandidatene
                    </Label>
                    <div id="forhåndsvisning" className={css.forhåndsvisning}>
                        <BodyShort>
                            <span>{genererMeldingUtenLenke(valgtMal)} </span>
                            <Link href={lenkeMedPrefiks} target="_blank" rel="noopener noreferrer">
                                {lenkeTilStilling}
                            </Link>
                        </BodyShort>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="primary"
                    loading={sendStatus === SmsStatus.UnderUtsending}
                    onClick={onSendSms}
                >
                    Send SMS
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const genererLenkeTilStilling = (stillingId: string) => {
    return `nav.no/arbeid/stilling/${stillingId}`;
};

/* nb: Det er ikke lenger frontend som styrer teksten. Så disse
 * tekstene kan være ute av sync med backend.
 */
const genererMeldingUtenLenke = (valgtMal: Meldingsmal) => {
    if (valgtMal === Meldingsmal.VurdertSomAktuell) {
        return `Hei, vi har vurdert at kompetansen din kan passe til denne stillingen, hilsen NAV`;
    } else if (valgtMal === Meldingsmal.FunnetPassendeStilling) {
        return `Hei! Vi har funnet en stilling som kan passe deg. Interessert? Søk via lenka i annonsen. Hilsen NAV`;
    } else if (valgtMal === Meldingsmal.Jobbarrangement) {
        return `Hei, vi har et jobbarrangement som kan passe for deg, hilsen NAV. Se mer info:`;
    }
};

export default SendSmsModal;
