import { Alert, Loader, Modal } from '@navikt/ds-react';

import useKandidatlisteId from '../../../felles/hooks/useKandidatlisteId';
import LeggTilKandidat from './LeggTilKandidat';
import css from './LeggTilKandidatModal.module.css';

type ILeggTilKandidatModal = {
    vis: boolean;
    onClose: () => void;
    stillingsId: string;
    erEier?: boolean;
};

const LeggTilKandidatModal: React.FC<ILeggTilKandidatModal> = ({
    vis,
    onClose,
    stillingsId,
    erEier,
}) => {
    const { kandidatlisteId, isLoading, isError } = useKandidatlisteId(stillingsId);
    return (
        <Modal
            open={vis}
            aria-label="Legg til kandidat"
            onClose={onClose}
            header={{
                heading: 'Legg til kandidat',
            }}
        >
            {isLoading && <Loader size="medium" className={css.spinner} />}
            {isError && (
                <Alert fullWidth variant="error" size="small">
                    Klarte ikke å laste ned kandidatliste for stillingen.
                </Alert>
            )}
            {kandidatlisteId && vis && (
                <LeggTilKandidat
                    kandidatlisteId={kandidatlisteId}
                    onClose={onClose}
                    erEier={erEier}
                    stillingsId={stillingsId}
                />
            )}
        </Modal>
    );
};

export default LeggTilKandidatModal;
