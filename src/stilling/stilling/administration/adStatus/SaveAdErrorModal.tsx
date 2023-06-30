import { useDispatch, useSelector } from 'react-redux';
import { BodyLong, Button, Heading } from '@navikt/ds-react';
import { HIDE_AD_SAVED_ERROR_MODAL } from '../../adReducer';
import Modal from '../../../common/modal/Modal';

const SaveAdErrorModal = () => {
    const dispatch = useDispatch();

    const validation = useSelector((state: any) => state.adValidation.errors);
    const showAdSavedErrorModal = useSelector((state: any) => state.ad.showAdSavedErrorModal);

    const onClose = () => {
        dispatch({ type: HIDE_AD_SAVED_ERROR_MODAL });
    };

    return (
        showAdSavedErrorModal && (
            <Modal open={showAdSavedErrorModal} onClose={onClose} closeButton>
                <Heading level="2" size="small" spacing>
                    Kan ikke lagre stillingen
                </Heading>
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
                <Button onClick={onClose}>Lukk</Button>
            </Modal>
        )
    );
};

export default SaveAdErrorModal;
