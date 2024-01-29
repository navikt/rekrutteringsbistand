import { BodyShort } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import css from './Brødsmulesti.module.css';

export type Brødsmule = {
    tekst: string;
    href?: string;
    state?: any;
};

type Props = {
    brødsmulesti: Brødsmule[];
};

const Brødsmulesti = ({ brødsmulesti }: Props) => (
    <nav className={css.brødsmulesti} aria-label="Brødsmulesti">
        <ul>
            {brødsmulesti.map(({ tekst, href, state }, index) => {
                const brødsmule = href ? (
                    <Link to={href} state={state}>
                        {tekst}
                    </Link>
                ) : (
                    <BodyShort as="span">{tekst}</BodyShort>
                );

                return (
                    <li aria-current="page" key={tekst + index}>
                        {brødsmule}
                    </li>
                );
            })}
        </ul>
    </nav>
);

export default Brødsmulesti;
