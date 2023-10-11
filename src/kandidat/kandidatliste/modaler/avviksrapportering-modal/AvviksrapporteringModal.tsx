import { BodyLong, Button, Modal } from '@navikt/ds-react';
import css from './AvviksrapporteringModal.module.css';

type Props = {
    vis: boolean;
    onClose: () => void;
};

const AvviksrapporteringModal = ({ vis, onClose }: Props) => {
    return (
        <Modal
            className={css.avviksrapportering}
            open={vis}
            onClose={onClose}
            header={{
                heading: 'Rapporter avvik',
            }}
        >
            <Modal.Body>
                <BodyLong>Har du oppdaget et avvik? ...</BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose} variant="secondary">
                    Avbryt
                </Button>
                <Button>Lagre og send</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AvviksrapporteringModal;
