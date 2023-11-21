import { PersonCheckmarkIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import css from './Kandidatlistehandlinger.module.css';

type Props = {
    onAnbefalClick: () => void;
    stillingsId: string;
    erEier: boolean;
};

const Kandidathandlinger = ({ stillingsId, erEier, onAnbefalClick }: Props) => {
    return (
        <div className={css.knapper}>
            {erEier && (
                <Link
                    to={`/kandidater/lister/stilling/${stillingsId}/detaljer`}
                    className="navds-link"
                >
                    <PersonGroupIcon />
                    Se kandidatliste
                </Link>
            )}
            <Button onClick={onAnbefalClick} icon={<PersonCheckmarkIcon />}>
                Anbefal kandidat
            </Button>
        </div>
    );
};

export default Kandidathandlinger;
