import { BriefcaseIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { BodyLong, Modal } from '@navikt/ds-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Status } from 'felles/domene/stilling/Stilling';
import { formatISOString } from '../../../utils/datoUtils';
import { HIDE_AD_PUBLISHED_MODAL } from '../../adReducer';

const AdPublishedModal = ({ stillingId }: { stillingId: string }) => {
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
        <Modal
            open={showAdPublishedModal}
            onClose={onClose}
            header={{
                heading:
                    adStatus === Status.Inaktiv && activationOnPublishingDate && published
                        ? `Stillingen blir publisert ${formatISOString(published)}`
                        : 'Stillingen er publisert',
                closeButton: true,
            }}
        >
            <Modal.Body>
                <BodyLong spacing>
                    Ønsker du å finne kandidater til stillingen du publiserte?
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Link
                    to={`/kandidatsok?stilling=${stillingId}&brukKriterierFraStillingen=true`}
                    className="navds-link"
                    onClick={onClose}
                >
                    <MagnifyingGlassIcon />
                    Finn kandidater
                </Link>
                <Link
                    to="/stillinger/stillingssok?portefolje=visMine"
                    className="navds-link"
                    onClick={onClose}
                >
                    <BriefcaseIcon />
                    Til mine stillinger
                </Link>
            </Modal.Footer>
        </Modal>
    );
};

export default AdPublishedModal;
