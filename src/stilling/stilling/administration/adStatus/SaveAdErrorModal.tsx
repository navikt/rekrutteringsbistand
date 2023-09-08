import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_AD_SAVED_ERROR_MODAL } from '../../adReducer';

const SaveAdErrorModal = () => {
    const dispatch = useDispatch();

    const validation = useSelector((state: any) => state.adValidation.errors);
    const showAdSavedErrorModal = useSelector((state: any) => state.ad.showAdSavedErrorModal);

    const onClose = () => {
        dispatch({ type: HIDE_AD_SAVED_ERROR_MODAL });
    };

    return (
        showAdSavedErrorModal && (
            <Modal
                open={showAdSavedErrorModal}
                onBeforeClose={onClose}
                header={{
                    heading: 'Kan ikke lagre stillingen',
                    closeButton: true,
                }}
            >
                <Modal.Body>
                    <BodyLong>Stillingen kan ikke lagres før følgende feil er rettet:</BodyLong>
                    <BodyLong as="ul" spacing>
                        {validation.title && (
                            <li className="skjemaelement__feilmelding">{validation.title}</li>
                        )}
                        {validation.notat && (
                            <li className="skjemaelement__feilmelding">{validation.notat}</li>
                        )}
                        {validation.styrk && (
                            <li className="skjemaelement__feilmelding">{validation.styrk}</li>
                        )}
                        {validation.applicationEmail && (
                            <li className="skjemaelement__feilmelding">
                                {validation.applicationEmail}
                            </li>
                        )}
                        {validation.contactPersonEmail && (
                            <li className="skjemaelement__feilmelding">
                                {validation.contactPersonEmail}
                            </li>
                        )}
                        {validation.contactPersonPhone && (
                            <li className="skjemaelement__feilmelding">
                                {validation.contactPersonPhone}
                            </li>
                        )}
                        {validation.postalCode && (
                            <li className="skjemaelement__feilmelding">{validation.postalCode}</li>
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

export default SaveAdErrorModal;
