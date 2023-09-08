import { BodyLong, BodyShort, Button, Modal } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { Notat } from '../../domene/Kandidatressurser';
import NotatInfo from './NotatInfo';
import notatlisteCss from './Notatliste.module.css';

type SlettemodalProps = {
    notat: Notat;
    onSlettNotat: (notatId: string) => void;
    onCloseSletteModal: () => void;
};

const Slettemodal: FunctionComponent<SlettemodalProps> = ({
    notat,
    onSlettNotat,
    onCloseSletteModal,
}) => {
    const onBekreft = () => {
        onSlettNotat(notat.notatId);
    };

    return (
        <Modal
            open
            aria-label="Slett notat"
            onClose={onCloseSletteModal}
            header={{ heading: 'Slett notat' }}
        >
            <Modal.Body>
                <BodyShort spacing>Er du sikker på at du ønsker å slette notatet?</BodyShort>
                <div className={notatlisteCss.topprad}>
                    <NotatInfo notat={notat} />
                </div>
                <BodyLong>{notat.tekst}</BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onBekreft}>Slett</Button>
                <Button variant="secondary" onClick={onCloseSletteModal}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Slettemodal;
