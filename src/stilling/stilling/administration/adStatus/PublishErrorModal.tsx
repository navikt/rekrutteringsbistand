import { useDispatch, useSelector } from 'react-redux';
import { BodyLong, Button, Heading } from '@navikt/ds-react';
import { HIDE_PUBLISH_ERROR_MODAL } from '../../adReducer';
import Modal from '../../../common/modal/Modal';

const PublishErrorModal = () => {
    const dispatch = useDispatch();

    const validation = useSelector((state: any) => state.adValidation.errors);
    const showPublishErrorModal = useSelector((state: any) => state.ad.showPublishErrorModal);

    const onClose = () => {
        dispatch({ type: HIDE_PUBLISH_ERROR_MODAL });
    };

    return (
        showPublishErrorModal && (
            <Modal closeButton open={showPublishErrorModal} aria-label="Fortsett" onClose={onClose}>
                <Heading level="2" size="small" spacing>
                    Kan ikke publisere stillingen
                </Heading>
                <BodyLong spacing>
                    Stillingen kan ikke publiseres før følgende feil er rettet:
                </BodyLong>
                <BodyLong as="ul" spacing>
                    {Object.keys(validation).map(
                        (key) => validation[key] && <li key={key}>{validation[key]}</li>
                    )}
                </BodyLong>
                <Button onClick={onClose}>Lukk</Button>
            </Modal>
        )
    );
};

export default PublishErrorModal;
