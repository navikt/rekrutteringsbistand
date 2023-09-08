import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_PUBLISH_ERROR_MODAL } from '../../adReducer';

const PublishErrorModal = () => {
    const dispatch = useDispatch();

    const validation = useSelector((state: any) => state.adValidation.errors);
    const showPublishErrorModal = useSelector((state: any) => state.ad.showPublishErrorModal);

    const onClose = () => {
        dispatch({ type: HIDE_PUBLISH_ERROR_MODAL });
    };

    return (
        showPublishErrorModal && (
            <Modal
                header={{ heading: 'Kan ikke publisere stillingen', closeButton: true }}
                open={showPublishErrorModal}
                aria-label="Fortsett"
                onClose={onClose}
            >
                <Modal.Body>
                    <BodyLong spacing>
                        Stillingen kan ikke publiseres før følgende feil er rettet:
                    </BodyLong>
                    <BodyLong as="ul" spacing>
                        {Object.keys(validation).map(
                            (key) => validation[key] && <li key={key}>{validation[key]}</li>
                        )}
                    </BodyLong>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose}>Lukk</Button>
                </Modal.Footer>
            </Modal>
        )
    );
};

export default PublishErrorModal;
