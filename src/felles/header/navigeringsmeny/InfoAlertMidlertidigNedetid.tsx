import { Alert } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import css from './InfoAlert.module.css';

const InfoAlertMidlertidigNedetid: FunctionComponent = () => {
    return (
        <div className={css.alert}>
            <Alert variant="info" fullWidth className={css.alertinner}>
                Rekrutteringsbistand får nedetid fra 14:30 i dag. Vi håper det er oppe igjen i løpet
                av en halvtime, men vi kan ikke garantere at alt er ferdig innen det. Det er teknisk
                oppdatering.
            </Alert>
        </div>
    );
};

export default InfoAlertMidlertidigNedetid;
