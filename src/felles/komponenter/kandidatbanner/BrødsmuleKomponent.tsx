import { BodyShort } from '@navikt/ds-react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export type Brødsmule = {
    tekst: string;
    href?: string;
    state?: any;
};

type Props = {
    brødsmulesti: Brødsmule[];
};

const BrødsmuleKomponent = ({ brødsmulesti }: Props) => (
    <div>
        {brødsmulesti &&
            brødsmulesti.map(({ tekst, href, state }, index) => {
                const brødsmule = href ? (
                    <Link to={href} state={state}>
                        {tekst}
                    </Link>
                ) : (
                    <BodyShort as="span">{tekst}</BodyShort>
                );

                return (
                    <Fragment key={tekst}>
                        {index !== 0 && <span> / </span>}
                        {brødsmule}
                    </Fragment>
                );
            })}
    </div>
);

export default BrødsmuleKomponent;
