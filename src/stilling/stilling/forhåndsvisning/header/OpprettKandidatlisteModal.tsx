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
                Dersom du ønsker å sende CV-er til arbeidsgiver så er det viktig at du kontakter
                arbeidsgiveren før du oppretter kandidatlisten for å få bekreftet at arbeidsgiveren
                ønsker å motta kandidater fra Nav.
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
