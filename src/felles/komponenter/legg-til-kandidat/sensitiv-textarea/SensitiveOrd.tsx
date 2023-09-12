import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { BodyLong } from '@navikt/ds-react';
import css from './SensitiveOrd.module.css';
import { SensitivtOrd } from './hentSensitiveOrd';

type Props = {
    ord: SensitivtOrd[];
};

const SensitiveOrd = ({ ord }: Props) => (
    <div className={css.sensitiveOrd}>
        <div className={css.overskrift}>
            <ExclamationmarkTriangleIcon aria-hidden />
            <BodyLong>Vi fant {ord.length} ord som kan være sensitive</BodyLong>
        </div>
        <ul>
            {ord.map((ord) => (
                <li key={ord.ord}>
                    <span>{ord.ord} </span>
                    <span className={css.svartTekst}>({ord.kategori})</span>
                </li>
            ))}
        </ul>
    </div>
);

export default SensitiveOrd;
