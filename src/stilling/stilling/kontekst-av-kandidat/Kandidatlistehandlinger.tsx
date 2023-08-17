import { PersonCheckmarkIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { Link } from 'react-router-dom';
import css from './Kandidatlistehandlinger.module.css';

type Props = {
    kandidatnr: string;
    kandidatliste: Nettressurs<Kandidatliste>;
    onAnbefalClick: () => void;
};

const Kandidathandlinger = ({ kandidatnr, kandidatliste, onAnbefalClick }: Props) => {
    if (kandidatliste.kind !== Nettstatus.Suksess) {
        return null;
    }

    const kandidatenLiggerILista = kandidatliste.data.kandidater.some(
        (kandidat) => kandidat.kandidatnr === kandidatnr
    );

    return (
        <div className={css.knapper}>
            <Link
                to={`/kandidater/lister/stilling/${kandidatliste.data.stillingId}/detaljer`}
                className="navds-link"
            >
                <PersonGroupIcon />
                Se kandidatliste
            </Link>
            <Button
                aria-disabled={kandidatenLiggerILista}
                disabled={kandidatenLiggerILista}
                onClick={onAnbefalClick}
                icon={<PersonCheckmarkIcon />}
            >
                Anbefal kandidat
            </Button>
        </div>
    );
};

export default Kandidathandlinger;
