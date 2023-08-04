import css from './Banner.module.css';
import { Heading } from '@navikt/ds-react';
import React, { ComponentType } from 'react';

type Props = {
    ikon: ComponentType;
};

const Banner = ({ ikon: Ikon }: Props) => {
    return (
        <div className={css.banner}>
            <div className={css.piktogramOgInnhold}>
                <Ikon></Ikon>
                <Heading className={css.innhold} level="1" size="xlarge">
                    Stillinger
                </Heading>
            </div>
        </div>
    );
};

export default Banner;
