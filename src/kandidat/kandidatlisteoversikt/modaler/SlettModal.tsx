import { BodyLong, Button, ErrorMessage, Modal } from '@navikt/ds-react';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { KandidatlisteSammendrag } from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettstatus } from 'felles/nettressurs';
import { deleteKandidatliste } from '../../api/api';
import { VarslingAction, VarslingActionType } from '../../varsling/varslingReducer';
import css from './Modal.module.css';

type Props = {
    kandidatliste: KandidatlisteSammendrag;
    onClose: (refreshKandidatlister?: boolean) => void;
};

const SlettModal: FunctionComponent<Props> = ({ kandidatliste, onClose }) => {
    const dispatch = useDispatch();
    const [status, setStatus] = React.useState<Nettstatus>(Nettstatus.IkkeLastet);

    const handleSlettClick = async () => {
        setStatus(Nettstatus.LasterInn);

        try {
            await deleteKandidatliste(kandidatliste.kandidatlisteId);

            dispatch<VarslingAction>({
                type: VarslingActionType.VisVarsling,
                innhold: `Slettet kandidatlisten «${kandidatliste.tittel}»`,
            });

            onClose(true);
        } catch (e) {
            setStatus(Nettstatus.Feil);
        }
    };

    return (
        <Modal
            header={{ heading: 'Slett kandidatliste' }}
            open
            onBeforeClose={onClose}
            aria-label="Slett kandidatliste"
            className={css.modal}
        >
            <Modal.Body>
                <BodyLong spacing>
                    Er du sikker på at du vil slette kandidatlisten med alt innhold? Du kan ikke
                    angre handlingen.
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSlettClick} loading={status === Nettstatus.LasterInn}>
                    Slett
                </Button>
                <Button onClick={() => onClose()} variant="secondary">
                    Avbryt
                </Button>
            </Modal.Footer>
            {status === Nettstatus.Feil && (
                <ErrorMessage className={css.feilmelding}>
                    Klarte ikke å slette kandidatlisten
                </ErrorMessage>
            )}
        </Modal>
    );
};

export default SlettModal;
