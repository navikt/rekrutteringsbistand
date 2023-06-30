import { FunctionComponent } from 'react';
import { Button } from '@navikt/ds-react';
import css from './LeggTilKandidatModal.module.css';

type Props = {
    onLeggTilClick?: () => void;
    onAvbrytClick: () => void;
    leggTilSpinner?: boolean;
    leggTilDisabled?: boolean;
    leggTilTekst?: string;
    avbrytDisabled?: boolean;
};

const LeggTilEllerAvbryt: FunctionComponent<Props> = ({
    onLeggTilClick,
    onAvbrytClick,
    leggTilSpinner,
    leggTilTekst = 'Legg til',
    leggTilDisabled,
    avbrytDisabled,
}) => (
    <div className={css.knapper}>
        <Button onClick={onLeggTilClick} loading={leggTilSpinner} disabled={leggTilDisabled}>
            {leggTilTekst}
        </Button>
        <Button variant="secondary" onClick={onAvbrytClick} disabled={avbrytDisabled}>
            Avbryt
        </Button>
    </div>
);

export default LeggTilEllerAvbryt;
