import { Alert } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import css from './InfoAlert.module.css';

const InfoAlert2: FunctionComponent = () => {
    return (
        <div className={css.alert}>
            <Alert variant="info" fullWidth className={css.alertinner}>
                Vi legger ut en ny versjon av rekrutteringsbistand fredag 21.2 klokken 15.30. Det
                kan føre til feilmeldinger i kandidatsøket en periode. Vi tar sikte på å være ferdig
                med dette innen 16.30
            </Alert>
        </div>
    );
};

export default InfoAlert2;
