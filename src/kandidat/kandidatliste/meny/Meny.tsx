import { MagnifyingGlassIcon, PersonPlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { lenkeTilFinnKandidater } from '../../app/paths';
import css from './Meny.module.css';

type Props = {
    kandidatlisteId: string;
    stillingId: string | null;
    onLeggTilKandidat: () => void;
};

const Meny: FunctionComponent<Props> = ({ kandidatlisteId, stillingId, onLeggTilKandidat }) => {
    return (
        <div className={css.meny}>
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
        </div>
    );
};

export default Meny;
