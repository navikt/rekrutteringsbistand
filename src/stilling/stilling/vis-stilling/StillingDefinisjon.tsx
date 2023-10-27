import * as React from 'react';
import css from './StillingDefinisjon.module.css';

export interface IStillingDefinisjon {
    tekst: string;
    verdi?: string;
}

const StillingDefinisjon: React.FC<IStillingDefinisjon> = ({ tekst, verdi }) => {
    return (
        <dl className={css.definitionList}>
            <dt>{tekst}</dt>
            <dd>{verdi}</dd>
        </dl>
    );
};

export default StillingDefinisjon;
