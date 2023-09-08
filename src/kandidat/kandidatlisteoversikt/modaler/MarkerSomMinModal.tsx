import { Alert, BodyLong, Button, Modal } from '@navikt/ds-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { KandidatlisteSammendrag } from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettstatus } from 'felles/nettressurs';
import { markerKandidatlisteUtenStillingSomMin } from '../../api/api';
import { lenkeTilStilling } from '../../app/paths';
import { VarslingAction, VarslingActionType } from '../../varsling/varslingReducer';
import css from './Modal.module.css';

type Props = {
    kandidatliste: KandidatlisteSammendrag;
    stillingsId: string | null;
    onClose: (refreshKandidatlister?: boolean) => void;
};

const MarkerSomMinModal = ({ stillingsId, kandidatliste, onClose }: Props) => {
    const dispatch = useDispatch();
    const [status, setStatus] = useState<Nettstatus>(Nettstatus.IkkeLastet);

    const handleMarkerClick = async () => {
        setStatus(Nettstatus.LasterInn);

        try {
            await markerKandidatlisteUtenStillingSomMin(kandidatliste.kandidatlisteId);

            dispatch<VarslingAction>({
                type: VarslingActionType.VisVarsling,
                innhold: `Markerte kandidatlisten «${kandidatliste.tittel}» som min`,
            });

            onClose(true);
        } catch (e) {
            setStatus(Nettstatus.Feil);
        }
    };

    return (
        <Modal
            open
            onClose={() => onClose}
            header={{ heading: 'Marker som min', closeButton: true }}
            aria-label="Marker som min"
            className={css.modal}
        >
            {stillingsId ? (
                <Modal.Body>
                    <BodyLong spacing>
                        Kandidatlisten er knyttet til en stilling. Hvis du markerer stillingen som
                        din, blir du eier av stillingen og listen. Du vil ha mulighet til å redigere
                        stillingen, endre status, dele kandidater med arbeidsgiver og sende sms til
                        kandidatene.
                    </BodyLong>
                    <BodyLong spacing>
                        For å markere stillingen og kandidatlisten som din må du{' '}
                        <Link className="navds-link" to={lenkeTilStilling(stillingsId)}>
                            gå til stillingen.
                        </Link>
                    </BodyLong>
                </Modal.Body>
            ) : (
                <>
                    <Modal.Body>
                        <BodyLong spacing>
                            Hvis du markerer kandidatlisten som din, blir du eier av listen og du
                            vil da ha mulighet til å endre status.
                        </BodyLong>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={handleMarkerClick}
                            loading={status === Nettstatus.LasterInn}
                        >
                            Marker som min
                        </Button>
                        <Button variant="secondary" onClick={() => onClose()}>
                            Avbryt
                        </Button>
                    </Modal.Footer>
                    {status === Nettstatus.Feil && (
                        <Alert fullWidth variant="error" size="small">
                            Klarte ikke å markere kandidatlisten som din
                        </Alert>
                    )}
                </>
            )}
        </Modal>
    );
};

export default MarkerSomMinModal;
