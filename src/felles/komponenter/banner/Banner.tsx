import { Heading } from '@navikt/ds-react';
import classNames from 'classnames';
import { ReactNode } from 'react';
import css from './Banner.module.css';

type Props = {
    tittel: String;
    gammelGrå?: Boolean;
    ikon: ReactNode;
    children?: ReactNode;
};

const Banner = ({ tittel, gammelGrå, ikon, children }: Props) => {
    return (
        <div
            className={classNames(css.banner, {
                [css.gammelGrå]: gammelGrå,
            })}
        >
            <div className={css.tittelOgInnhold}>
                {ikon}
                <Heading level="2" size="large">
                    {tittel}
                </Heading>
                {children && <div className={css.innhold}>{children}</div>}
            </div>
        </div>
    );
};

export default Banner;
