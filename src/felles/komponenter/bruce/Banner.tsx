import css from './Banner.module.css';
import { Heading } from '@navikt/ds-react';
import React from 'react';
import { ReactComponent as Piktogram } from './fåjobb.svg';

/*type Props = {
};*/

const Banner = (/*{  }: Props*/) => {
    return (
        <div className={css.banner}>
            <div className={css.piktogramOgInnhold}>
                <Piktogram className={css.piktogram} />
                <Heading className={css.innhold} level="1" size="xlarge">
                    Stillinger
                </Heading>
            </div>
        </div>
    );
};

export default Banner;
