import css from './Banner.module.css';
import { Heading } from '@navikt/ds-react';
import classNames from 'classnames';
import { ComponentType } from 'react';

type Props = {
    tittel: String;
    gammelGrå?: Boolean;
    ikon: ComponentType;
};

const Banner = ({ tittel, gammelGrå, ikon: Ikon }: Props) => {
    return (
        <div
            className={classNames(css.banner, {
                [css.gammelGrå]: gammelGrå,
            })}
        >
            <div className={css.piktogramOgInnhold}>
                <Ikon />
                <Heading level="1" size="xlarge">
                    {tittel}
                </Heading>
            </div>
        </div>
    );
};

export default Banner;
