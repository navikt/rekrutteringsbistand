import { Heading } from '@navikt/ds-react';
import { ReactNode } from 'react';
import Grunnbanner from '../grunnbanner/Grunnbanner';
import css from './Banner.module.css';

type Props = {
    tittel: string;
    ikon: ReactNode;
    children?: ReactNode;
};

const Banner = ({ tittel, ikon, children }: Props) => {
    return (
        <Grunnbanner ikon={ikon}>
            <div className={css.banner}>
                <Heading level="2" size="large">
                    {tittel}
                </Heading>
                {children}
            </div>
        </Grunnbanner>
    );
};

export default Banner;
