import { Heading } from '@navikt/ds-react';
import { ReactNode } from 'react';
import css from './Banner.module.css';

type Props = {
    tittel: String;
    ikon: ReactNode;
    children?: ReactNode;
};

const Banner = ({ tittel, ikon, children }: Props) => {
    return (
        <div className={css.banner}>
            <div className={css.inner}>
                {ikon}
                <Heading className={css.tittel} level="2" size="large">
                    {tittel}
                </Heading>
                {children && <div className={css.innhold}>{children}</div>}
            </div>
        </div>
    );
};

export default Banner;
