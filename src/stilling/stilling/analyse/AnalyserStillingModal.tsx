import { Alert, Loader, Modal } from '@navikt/ds-react';

import css from './AnalyserStillingModal.module.css';
import useHentStilling from 'felles/hooks/useStilling';
import { hentTittelFraStilling } from 'felles/domene/stilling/Stilling';

type IAnalyserStillingModal = {
    vis: boolean;
    onClose: () => void;
    stillingsId: string;
};

const AnalyserStillingModal: React.FC<IAnalyserStillingModal> = ({ vis, onClose, stillingsId }) => {
    const { stilling, isLoading, isError } = useHentStilling(stillingsId);

    return (
        <Modal
            open={vis}
            aria-label="Analyser stilling"
            onClose={onClose}
            header={{
                heading: 'Analyser stilling',
            }}
        >
            {isLoading && <Loader size="medium" className={css.spinner} />}
            {isError && (
                <Alert fullWidth variant="error" size="small">
                    Klarte ikke å laste inn stillingen.
                </Alert>
            )}
            {stilling && vis && (
                <div className={css.analyserstilling}>
                    <Modal.Body>
                        <div className={css.innhold}>
                            Stillingstittel: {hentTittelFraStilling(stilling?.stilling)}
                        </div>
                    </Modal.Body>
                </div>
            )}
        </Modal>
    );
};

export default AnalyserStillingModal;
