import { Alert, BodyShort, Button, Label, Modal, Select } from '@navikt/ds-react';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { KandidatIKandidatliste } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import {
    Meldingsmal,
    usePostSmsTilKandidater,
    useSmserForStilling,
} from '../../../api/kandidatvarsel-api/kandidatvarsel';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import useMarkerteKandidater from '../hooks/useMarkerteKandidater';
import css from './SendSmsModal.module.css';
import { useVisVarsling } from 'felles/varsling/Varsling';

type Props = {
    vis: boolean;
    onClose: () => void;
    fjernAllMarkering: () => void;
    kandidater: KandidatIKandidatliste[];
    stillingId: string;
    stillingskategori: Stillingskategori | null;
};

const SendSmsModal: FunctionComponent<Props> = (props) => {
    const { vis, onClose, kandidater, stillingId, stillingskategori, fjernAllMarkering } = props;
    const visVarsling = useVisVarsling();

    const { data: smser = {} } = useSmserForStilling(stillingId);

    const markerteKandidater = useMarkerteKandidater(kandidater);
    const postSmsTilKandidater = usePostSmsTilKandidater();
    const [sendSmsLoading, setSendSmsLoading] = useState(false);

    const kandidaterSomHarFåttSms = markerteKandidater.filter(
        (kandidat) => kandidat.fodselsnr && smser[kandidat.fodselsnr]
    );
    const kandidaterSomIkkeHarFåttSms = markerteKandidater.filter(
        (kandidat) => !(kandidat.fodselsnr && smser[kandidat.fodselsnr])
    );
    const harInaktiveKandidater = markerteKandidater.some(
        (kandidat) => kandidat.fodselsnr === null
    );

    const [valgtMal, setValgtMal] = useState<Meldingsmal>(
        stillingskategori === Stillingskategori.Jobbmesse
            ? Meldingsmal.Jobbarrangement
            : Meldingsmal.VurdertSomAktuell
    );

    const onSendSms = async () => {
        const korrektLengdeFødselsnummer = 11;
        setSendSmsLoading(true);
        const result = await postSmsTilKandidater({
            mal: valgtMal,
            fnr: kandidaterSomIkkeHarFåttSms
                .map((kandidat) => kandidat.fodselsnr || '')
                .filter((fnr) => fnr && fnr.length === korrektLengdeFødselsnummer),
            stillingId,
        });

        setSendSmsLoading(false);
        if (result === 'ok') {
            visVarsling({
                innhold: 'Beskjed er sendt',
            });
            fjernAllMarkering();
        } else if (result === 'error') {
            visVarsling({
                innhold: 'Det skjedde en feil',
                alertType: 'error',
            });
        }
        onClose();
    };

    return (
        <Modal
            open={vis}
            className={css.sendSmsModal}
            onClose={onClose}
            aria-label={`Send beskjed til ${kandidater.length} kandidater`}
            header={{
                heading: 'Send beskjed',
            }}
        >
            <Modal.Body>
                {(kandidaterSomHarFåttSms.length > 0 || harInaktiveKandidater) && (
                    <Alert variant="warning" size="small" className={css.alleredeSendtAdvarsel}>
                        Ikke alle kandidatene vil motta beskjeden
                        <ul className={css.alleredeSendtAdvarselListe}>
                            {kandidaterSomHarFåttSms.length > 0 && (
                                <li>
                                    {kandidaterSomHarFåttSms.length === 1 ? (
                                        <>Du har allerede sendt beskjed til én av kandidatene.</>
                                    ) : (
                                        <>
                                            Du har allerede sendt beskjed til{' '}
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
                        Det vil bli sendt beskjed til <b>{kandidaterSomIkkeHarFåttSms.length}</b>{' '}
                        {kandidaterSomIkkeHarFåttSms.length === 1 ? 'kandidat' : 'kandidater'}
                    </BodyShort>
                    <BodyShort size="small">
                        Telefonnummerene/e-postene blir hentet fra Kontakt- og
                        reservasjonsregisteret.
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
                            label="Velg hva som skal vises i beskjeden"
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
                        </BodyShort>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" loading={sendSmsLoading} onClick={onSendSms}>
                    Send beskjed
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

/* nb: Det er ikke lenger frontend som styrer teksten. Så disse
 * tekstene kan være ute av sync med backend.
 */
const genererMeldingUtenLenke = (valgtMal: Meldingsmal) => {
    if (valgtMal === Meldingsmal.VurdertSomAktuell) {
        return `Hei! Vi har vurdert at kompetansen din kan passe til en stilling. Logg inn på NAV 
        for å se stillingen. Vennlig hilsen NAV`;
    } else if (valgtMal === Meldingsmal.FunnetPassendeStilling) {
        return `Hei! Vi har funnet en stilling som kan passe deg. Logg inn på NAV for å se 
        stillingen. Vennlig hilsen NAV`;
    } else if (valgtMal === Meldingsmal.Jobbarrangement) {
        return `Hei! Vi har funnet et jobbarrangement som kanskje passer for deg. Logg inn på NAV 
        for å se arrangementet. Vennlig hilsen NAV`;
    }
};

export default SendSmsModal;
