import { useDispatch, useSelector } from 'react-redux';
import { HIDE_STOP_AD_MODAL, STOP_AD, STOP_AD_FROM_MY_ADS } from '../../adReducer';
import { BodyLong, Button, Heading } from '@navikt/ds-react';

import { State } from '../../../redux/store';
import Modal from '../../../common/modal/Modal';
import Notat from '../notat/Notat';
import css from './StopAdModal.module.css';

const StopAdModal = ({ fromMyAds }: { fromMyAds?: boolean }) => {
    const dispatch = useDispatch();

    const showStopAdModal = useSelector((state: State) => state.ad.showStopAdModal);
    const validation = useSelector((state: State) => state.adValidation.errors);
    const title = useSelector((state: State) => state.adData?.title);

    const onClose = () => {
        dispatch({ type: HIDE_STOP_AD_MODAL });
    };

    const onStopAdClick = () => {
        if (validation.notat === undefined) {
            onClose();

            if (fromMyAds) {
                dispatch({ type: STOP_AD_FROM_MY_ADS });
            } else {
                dispatch({ type: STOP_AD });
            }
        }
    };

    return (
        <Modal open={showStopAdModal} onClose={onClose} closeButton>
            <Heading level="2" size="small" spacing>
                Stopp stillingen
            </Heading>
            <BodyLong spacing>
                {`Er du sikker på at du ønsker å stoppe "${title}"? Stopper du stillingen
                    vil den ikke lenger være tilgjengelig for søk.`}
            </BodyLong>
            <Notat />
            <div className={css.knapper}>
                <Button variant="primary" onClick={onStopAdClick}>
                    Stopp stillingen
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Avbryt
                </Button>
            </div>
        </Modal>
    );
};

export default StopAdModal;
