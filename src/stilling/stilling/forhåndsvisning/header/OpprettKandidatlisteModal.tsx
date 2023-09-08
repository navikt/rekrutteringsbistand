import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

type Props = {
    åpen: boolean;
    onClose: () => void;
    onBekreft: () => void;
};

const OpprettKandidatlisteModal: FunctionComponent<Props> = ({ åpen, onClose, onBekreft }) => (
    <Modal
        open={åpen}
        className="opprett-kandidatliste-modal"
        aria-label="Opprett kandidatliste"
        onClose={onClose}
        header={{
            heading: 'Opprett kandidatliste',
        }}
    >
        <Modal.Body>
            <BodyLong spacing>
                Viktig: Kontakt arbeidsgiveren før du oppretter kandidatlisten. Arbeidsgiveren må
                bekrefte at de ønsker å motta kandidater fra NAV.
            </BodyLong>
            <BodyLong>
                Er du sikker på at du ønsker å opprette kandidatlisten? Svarer du ja, blir du eier
                av stillingen og listen. Du har da ansvar for å sende kandidater til arbeidsgiveren.
            </BodyLong>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onBekreft}>Ja, opprett kandidatlisten</Button>
            <Button variant="secondary" onClick={onClose}>
                Nei, avbryt
            </Button>
        </Modal.Footer>
    </Modal>
);

export default OpprettKandidatlisteModal;
