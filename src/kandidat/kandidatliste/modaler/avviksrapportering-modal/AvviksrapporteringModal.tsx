import { Button, Modal } from '@navikt/ds-react';
import css from './AvviksrapporteringModal.module.css';

type Props = {
    vis: boolean;
};

const AvviksrapporteringModal = ({ vis }: Props) => {
    return (
        <Modal className={css.avviksrapportering} open={vis} onClose={() => {}}>
            <Modal.Header>Rapporter avvik</Modal.Header>
            <Modal.Body>
                <div className={css.knapperad}>
                    <div className={css.knapper}>
                        <Button variant="secondary">Avbryt</Button>
                        <Button>Lagre og send</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AvviksrapporteringModal;
