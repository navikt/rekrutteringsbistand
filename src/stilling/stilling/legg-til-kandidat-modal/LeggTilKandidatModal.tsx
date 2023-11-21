import { Alert, Loader, Modal } from '@navikt/ds-react';

import useKandidatlisteId from '../../api/useKandidatlisteId';
import LeggTilKandidat from './LeggTilKandidat';
import css from './LeggTilKandidatModal.module.css';

type Props = {
    vis: boolean;
    onClose: () => void;
    stillingsId: string;
};

const LeggTilKandidatModal = ({ vis, onClose, stillingsId }: Props) => {
    const { kandidatlisteId, isLoading, isError } = useKandidatlisteId(stillingsId);

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
                {isLoading && <Loader size="medium" className={css.spinner} />}
                {isError && (
                    <Alert fullWidth variant="error" size="small">
                        Klarte ikke å laste ned kandidatliste for stillingen.
                    </Alert>
                )}
            </Modal.Body>
            {kandidatlisteId && (
                <LeggTilKandidat kandidatlisteId={kandidatlisteId} onClose={onClose} />
            )}
        </Modal>
    );
};

export default LeggTilKandidatModal;
