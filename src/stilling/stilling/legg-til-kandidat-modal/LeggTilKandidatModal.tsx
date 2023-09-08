import { Alert, Loader, Modal } from '@navikt/ds-react';

import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import LeggTilKandidat from './LeggTilKandidat';
import css from './LeggTilKandidatModal.module.css';

type Props = {
    vis: boolean;
    onClose: () => void;
    kandidatliste: Nettressurs<Kandidatliste>;
};

const LeggTilKandidatModal = ({ vis, onClose, kandidatliste }: Props) => {
    return (
        <Modal
            open={vis}
            aria-label="Legg til kandidat"
            onBeforeClose={onClose}
            header={{
                heading: 'Legg til kandidat',
            }}
        >
            <Modal.Body>
                <Alert variant="warning">
                    Før du legger en kandidat på kandidatlisten må du undersøke om personen
                    oppfyller kravene som er nevnt i stillingen.
                </Alert>
                {kandidatliste.kind === Nettstatus.LasterInn && (
                    <Loader size="medium" className={css.spinner} />
                )}
                {kandidatliste.kind === Nettstatus.Feil && (
                    <Alert fullWidth variant="error" size="small">
                        Klarte ikke å laste ned kandidatliste for stillingen.
                    </Alert>
                )}
            </Modal.Body>
            {kandidatliste.kind === Nettstatus.Suksess && (
                <LeggTilKandidat kandidatliste={kandidatliste.data} onClose={onClose} />
            )}
        </Modal>
    );
};

export default LeggTilKandidatModal;
