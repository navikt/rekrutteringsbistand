import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

type Props = {
    erÅpen: boolean;
    onAvbryt: () => void;
    onMarkerSomMin: () => void;
};

const MarkerSomMinModal: FunctionComponent<Props> = ({ erÅpen, onAvbryt, onMarkerSomMin }) => {
    return (
        <Modal
            open={erÅpen}
            onClose={onAvbryt}
            header={{ heading: 'Marker stillingen som min', closeButton: true }}
        >
            <Modal.Body>
                <BodyLong size="small" spacing>
                    Hvis du markerer stillingen som din, blir du eier av stillingen og tilhørende
                    kandidatliste. Du vil ha ansvar for kontakt med arbeidsgiver, og kan dele CV-er
                    med arbeidsgiveren.
                </BodyLong>
                <BodyLong size="small" spacing>
                    Er du sikker på at du vil markere stillingen som din?
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onMarkerSomMin}>Marker som min</Button>
                <Button variant="secondary" onClick={onAvbryt}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MarkerSomMinModal;
