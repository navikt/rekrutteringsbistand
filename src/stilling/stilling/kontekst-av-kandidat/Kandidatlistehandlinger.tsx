import { PersonCheckmarkIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import { lenkeTilStilling } from '../../../felles/lenker';
import css from './Kandidatlistehandlinger.module.css';

type Props = {
    onAnbefalClick: () => void;
    stillingsId: string;
    erEier: boolean;
    kandidatlisteId?: string;
};

const Kandidathandlinger = ({ stillingsId, erEier, onAnbefalClick, kandidatlisteId }: Props) => {
    return (
        <div className={css.knapper}>
            {erEier && (
                <Link
                    to={lenkeTilStilling({
                        stillingsId: stillingsId,
                        redigeringsmodus: false,
                        fane: 'kandidater',
                    })}
                    className="navds-link"
                >
                    <PersonGroupIcon />
                    Se kandidatliste
                </Link>
            )}
            <Button
                disabled={!kandidatlisteId}
                onClick={onAnbefalClick}
                icon={<PersonCheckmarkIcon />}
            >
                Anbefal kandidat
            </Button>
        </div>
    );
};

export default Kandidathandlinger;
