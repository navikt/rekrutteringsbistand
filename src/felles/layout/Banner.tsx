import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import stil from './Banner.module.css';
export interface IBanner {
    tittel: string;
    ikon?: React.ReactNode | undefined;
    egenBanner?: React.ReactNode;
}

const Banner: React.FC<IBanner> = ({ tittel, ikon, egenBanner }) => {
    if (egenBanner) {
        return <>{egenBanner}</>;
    }
    return (
        <div className={stil.banner}>
            <div className={stil.ikon}>{ikon}</div>
            <Heading level="2" size="large">
                {tittel}
            </Heading>
        </div>
    );
};

export default Banner;
