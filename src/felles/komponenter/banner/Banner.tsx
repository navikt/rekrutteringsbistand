import { Heading } from '@navikt/ds-react';
import classNames from 'classnames';
import { ReactNode } from 'react';
import css from './Banner.module.css';

type Props = {
    tittel: String;
    gammelGrå?: Boolean;
    ikon: ReactNode;
};

const Banner = ({ tittel, gammelGrå, ikon }: Props) => {
    return (
        <div
            className={classNames(css.banner, {
                [css.gammelGrå]: gammelGrå,
            })}
        >
            <div className={css.piktogramOgInnhold}>
                {ikon}
                <Heading level="1" size="xlarge">
                    {tittel}
                </Heading>
            </div>
        </div>
    );
};

export default Banner;
