import { FunctionComponent } from 'react';
import { Alert } from '@navikt/ds-react';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
import css from './Varsling.module.css';

const Varsling: FunctionComponent = () => {
    const { innhold, alertType } = useSelector((state: State) => state.varsling);

    if (innhold === null) {
        return null;
    }

    return (
        <Alert fullWidth className={css.varsling} variant={alertType} aria-live="assertive">
            {innhold}
        </Alert>
    );
};

export default Varsling;
