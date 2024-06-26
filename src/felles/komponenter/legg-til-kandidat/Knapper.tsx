import { Button, Modal } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

type Props = {
    onLeggTilClick?: () => void;
    onAvbrytClick: () => void;
    leggTilSpinner?: boolean;
    leggTilDisabled?: boolean;
    leggTilTekst?: string;
    avbrytDisabled?: boolean;
    setRegistrerFormidling?: () => void;
};

const Knapper: FunctionComponent<Props> = ({
    onLeggTilClick,
    onAvbrytClick,
    leggTilSpinner,
    leggTilTekst = 'Legg til',
    leggTilDisabled,
    avbrytDisabled,
    setRegistrerFormidling,
}) => (
    <Modal.Footer>
        <Button onClick={onLeggTilClick} loading={leggTilSpinner} disabled={leggTilDisabled}>
            {leggTilTekst}
        </Button>
        <Button variant="secondary" onClick={onAvbrytClick} disabled={avbrytDisabled}>
            Avbryt
        </Button>
        {setRegistrerFormidling && (
            <Button onClick={() => setRegistrerFormidling()}>Registrer formidling</Button>
        )}
    </Modal.Footer>
);

export default Knapper;
