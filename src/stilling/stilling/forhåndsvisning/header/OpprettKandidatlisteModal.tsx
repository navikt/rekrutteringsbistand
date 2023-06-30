import { FunctionComponent } from 'react';
import { BodyLong, Button, Heading } from '@navikt/ds-react';
import Modal from '../../../common/modal/Modal';
import css from './OpprettKandidatlisteModal.module.css';

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
    >
        <Heading spacing level="2" size="large" className="opprett-kandidatliste-modal__tittel">
            Opprett kandidatliste
        </Heading>
        <BodyLong spacing>
            Viktig: Kontakt arbeidsgiveren før du oppretter kandidatlisten. Arbeidsgiveren må
            bekrefte at de ønsker å motta kandidater fra NAV.
        </BodyLong>
        <BodyLong spacing>
            Er du sikker på at du ønsker å opprette kandidatlisten? Svarer du ja, blir du eier av
            stillingen og listen. Du har da ansvar for å sende kandidater til arbeidsgiveren.
        </BodyLong>

        <div className={css.knapper}>
            <Button onClick={onBekreft}>Ja, opprett kandidatlisten</Button>
            <Button variant="secondary" onClick={onClose}>
                Nei, avbryt
            </Button>
        </div>
    </Modal>
);

export default OpprettKandidatlisteModal;
