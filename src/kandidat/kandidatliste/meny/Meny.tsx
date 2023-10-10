import { HikingTrailSignIcon, MagnifyingGlassIcon, PersonPlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import classNames from 'classnames';
import { erIkkeProd } from 'felles/miljø';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { lenkeTilFinnKandidater } from '../../app/paths';
import css from './Meny.module.css';

interface Props {
    border?: boolean;
    kandidatlisteId: string;
    stillingId: string | null;
    onLeggTilKandidat: () => void;
    onRapporterAvvik?: () => void;
}

const Meny: FunctionComponent<Props> = ({
    border,
    kandidatlisteId,
    stillingId,
    onLeggTilKandidat,
    onRapporterAvvik,
}) => {
    return (
        <div
            className={classNames(css.meny, {
                [css.border]: border,
            })}
        >
            <Link to={lenkeTilFinnKandidater(stillingId, kandidatlisteId, true)}>
                <Button variant="tertiary" as="div" icon={<MagnifyingGlassIcon aria-hidden />}>
                    Finn kandidater
                </Button>
            </Link>

            <Button
                variant="tertiary"
                onClick={onLeggTilKandidat}
                icon={<PersonPlusIcon aria-hidden />}
            >
                Legg til kandidat
            </Button>

            {erIkkeProd && onRapporterAvvik && (
                <Button
                    variant="secondary"
                    onClick={onRapporterAvvik}
                    icon={<HikingTrailSignIcon aria-hidden />}
                    className={css.rapporterAvvikKnapp}
                >
                    Rapporter avvik
                </Button>
            )}
        </div>
    );
};

export default Meny;
