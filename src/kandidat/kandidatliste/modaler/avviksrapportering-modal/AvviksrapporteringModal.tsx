import { Modal } from '@navikt/ds-react';

type Props = {
    vis: boolean;
};

const AvviksrapporteringModal = ({ vis }: Props) => {
    return (
        <Modal open={vis} onClose={() => {}}>
            <Modal.Header>Rapporter avvik</Modal.Header>
        </Modal>
    );
};

export default AvviksrapporteringModal;
