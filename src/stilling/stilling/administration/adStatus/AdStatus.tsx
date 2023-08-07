import { useSelector } from 'react-redux';

import { Alert } from '@navikt/ds-react';
import { Status } from 'felles/domene/stilling/Stilling';
import PrivacyStatusEnum from '../../../common/enums/PrivacyStatusEnum';
import { formatISOString } from '../../../utils/datoUtils';

const AdStatus = () => {
    const adStatus = useSelector((state: any) => state.adData?.status);
    const originalData = useSelector((state: any) => state.ad.originalData);
    const deactivatedByExpiry = useSelector((state: any) => state.adData?.deactivatedByExpiry);
    const activationOnPublishingDate = useSelector(
        (state: any) => state.adData?.activationOnPublishingDate
    );
    const isSavingAd = useSelector((state: any) => state.ad.isSavingAd);

    return isSavingAd ? (
        <Alert variant="info">Stillingen er lagret</Alert>
    ) : (
        <>
            {adStatus === Status.Inaktiv && deactivatedByExpiry && (
                <Alert fullWidth variant="warning">
                    Stillingen er utløpt
                </Alert>
            )}
            {adStatus === Status.Inaktiv && activationOnPublishingDate && (
                <Alert fullWidth variant="info">
                    Stillingen blir publisert {formatISOString(originalData.published)}
                </Alert>
            )}
            {adStatus === Status.Inaktiv && !deactivatedByExpiry && !activationOnPublishingDate && (
                <Alert fullWidth variant="info">
                    Stillingen er ikke publisert
                </Alert>
            )}
            {adStatus === Status.Aktiv &&
                originalData.privacy === PrivacyStatusEnum.INTERNAL_NOT_SHOWN && (
                    <Alert fullWidth variant="success">
                        Stillingen er publisert internt i NAV |{' '}
                        {originalData.published ? formatISOString(originalData.published) : ''}
                    </Alert>
                )}
            {adStatus === Status.Aktiv && originalData.privacy === PrivacyStatusEnum.SHOW_ALL && (
                <Alert fullWidth variant="success">
                    Stillingen er publisert på Arbeidsplassen |{' '}
                    {originalData.published ? formatISOString(originalData.published) : ''}
                </Alert>
            )}
            {adStatus === Status.Stoppet && (
                <Alert fullWidth variant="warning">
                    Stillingen er stoppet
                </Alert>
            )}
        </>
    );
};

export default AdStatus;
