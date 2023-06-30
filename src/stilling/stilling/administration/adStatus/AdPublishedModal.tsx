import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BodyLong, Heading } from '@navikt/ds-react';
import { MagnifyingGlassIcon, BriefcaseIcon } from '@navikt/aksel-icons';

import { HIDE_AD_PUBLISHED_MODAL } from '../../adReducer';
import { formatISOString } from '../../../utils/datoUtils';
import { Status } from '../../../domene/Stilling';
import css from './AdPublishedModal.module.css';
import Modal from '../../../common/modal/Modal';

const AdPublishedModal = ({ stillingId }) => {
    const dispatch = useDispatch();

    const showAdPublishedModal = useSelector((state: any) => state.ad.showAdPublishedModal);
    const adStatus = useSelector((state: any) => state.adData?.status);
    const activationOnPublishingDate = useSelector(
        (state: any) => state.adData?.activationOnPublishingDate
    );
    const published = useSelector((state: any) => state.adData?.published);
    const isSavingAd = useSelector((state: any) => state.ad.isSavingAd);

    const onClose = () => {
        dispatch({ type: HIDE_AD_PUBLISHED_MODAL });
    };

    return isSavingAd ? null : (
        <Modal closeButton open={showAdPublishedModal} onClose={onClose}>
            {adStatus === Status.Inaktiv && activationOnPublishingDate && published ? (
                <Heading level="2" size="small" spacing>
                    Stillingen blir publisert {formatISOString(published)}
                </Heading>
            ) : (
                <Heading level="2" size="small" spacing>
                    Stillingen er publisert
                </Heading>
            )}
            <div>
                <BodyLong spacing>
                    Ønsker du å finne kandidater til stillingen du publiserte?
                </BodyLong>
                <div className={css.lenker}>
                    <Link
                        to={`/kandidatsok?stilling=${stillingId}&brukKriterierFraStillingen=true`}
                        className="navds-link"
                        onClick={onClose}
                    >
                        <MagnifyingGlassIcon />
                        Finn kandidater
                    </Link>
                    <Link to="/stillinger/minestillinger" className="navds-link" onClick={onClose}>
                        <BriefcaseIcon />
                        Til mine stillinger
                    </Link>
                </div>
            </div>
        </Modal>
    );
};

export default AdPublishedModal;
