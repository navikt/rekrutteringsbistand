import { PersonCheckmarkIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import { Nettressurs, Nettstatus } from '../../api/Nettressurs';
import { Kandidatliste } from '../legg-til-kandidat-modal/kandidatlistetyper';
import css from './Kandidatlistehandlinger.module.css';

type Props = {
    fnr: string;
    kandidatliste: Nettressurs<Kandidatliste>;
    onAnbefalClick: () => void;
};

const Kandidathandlinger = ({ fnr, kandidatliste, onAnbefalClick }: Props) => {
    if (kandidatliste.kind !== Nettstatus.Suksess) {
        return null;
    }

    const kandidatenLiggerILista = kandidatliste.data.kandidater.some(
        (kandidat) => kandidat.fodselsnr === fnr
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
