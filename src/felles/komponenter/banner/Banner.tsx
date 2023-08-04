import css from './Banner.module.css';
import { Heading } from '@navikt/ds-react';
import React, { ComponentType } from 'react';
import classNames from 'classnames';

type Props = {
    ikon: ComponentType;
    liten: Boolean;
};

const Banner = ({ ikon: Ikon, liten }: Props) => {
    return (
        <div className={css.banner}>
            <div
                className={classNames(css.piktogramOgInnhold, {
                    [css.liten]: liten,
                })}
            >
                <Ikon></Ikon>
                <Heading className={css.innhold} level="1" size="xlarge">
                    Stillinger
                </Heading>
            </div>
        </div>
    );
};

export default Banner;
