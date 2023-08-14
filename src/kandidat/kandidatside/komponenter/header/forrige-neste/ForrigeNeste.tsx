import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import css from './ForrigeNeste.module.css';

export type Kandidatnavigering = {
    neste?: string;
    forrige?: string;
    index: number;
    antall: number;
};

type Props = {
    kandidatnavigering: Kandidatnavigering;
    lenkeClass?: string;
};

const ForrigeNeste: FunctionComponent<Props> = ({ kandidatnavigering, lenkeClass }) => {
    const { forrige, neste, antall, index } = kandidatnavigering;

    if (antall === 0) {
        return null;
    }

    return (
        <div className={css.forrigeNeste}>
            {forrige && (
                <Link
                    aria-hidden={forrige === undefined}
                    className={classNames('navds-link', lenkeClass, {
                        [css.skjult]: forrige === undefined,
                    })}
                    to={forrige ?? '#'}
                >
                    <ChevronLeftIcon />
                    Forrige kandidat
                </Link>
            )}
            <BodyShort as="span">
                {index + 1} av {antall}
            </BodyShort>
            <Link
                aria-hidden={neste === undefined}
                className={classNames('navds-link', lenkeClass, {
                    [css.skjult]: neste === undefined,
                })}
                to={neste ?? '#'}
            >
                Neste kandidat
                <ChevronRightIcon />
            </Link>
        </div>
    );
};

export default ForrigeNeste;
