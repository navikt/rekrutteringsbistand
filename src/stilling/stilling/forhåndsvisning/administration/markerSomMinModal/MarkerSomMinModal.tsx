import { FunctionComponent } from 'react';
import { BodyLong, Button, Heading } from '@navikt/ds-react';
import Modal from '../../../../common/modal/Modal';
import css from './MarkerSomMinModal.module.css';

type Props = {
    erÅpen: boolean;
    onAvbryt: () => void;
    onMarkerSomMin: () => void;
};

const MarkerSomMinModal: FunctionComponent<Props> = ({ erÅpen, onAvbryt, onMarkerSomMin }) => {
    return (
        <Modal open={erÅpen} onClose={onAvbryt} closeButton>
            <Heading level="2" size="small" spacing>
                Marker stillingen som min
            </Heading>
            <BodyLong size="small" spacing>
                Hvis du markerer stillingen som din, blir du eier av stillingen og tilhørende
                kandidatliste. Du vil ha ansvar for kontakt med arbeidsgiver, og kan dele CV-er med
                arbeidsgiveren.
            </BodyLong>
            <BodyLong size="small" spacing>
                Er du sikker på at du vil markere stillingen som din?
            </BodyLong>
            <div className={css.knapper}>
                <Button onClick={onMarkerSomMin}>Marker som min</Button>
                <Button variant="secondary" onClick={onAvbryt}>
                    Avbryt
                </Button>
            </div>
        </Modal>
    );
};

export default MarkerSomMinModal;
