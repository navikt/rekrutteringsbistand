import { Alert } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import css from './InfoAlert.module.css';

const InfoAlertMidlertidigNedetid: FunctionComponent = () => {
    return (
        <div className={css.alert}>
            <Alert variant="info" fullWidth className={css.alertinner}>
                Rekrutteringsbistand vil ha nedetid onsdag 15. januar fra klokken 15:00 og ut dagen
                pga. teknisk oppdatering. Beklager de ulemper dette vil medføre.
            </Alert>
        </div>
    );
};
export default InfoAlertMidlertidigNedetid;
