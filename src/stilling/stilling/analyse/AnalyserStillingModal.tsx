import { Loader, Modal } from '@navikt/ds-react';
import css from './AnalyserStillingModal.module.css';
import useHentStilling from 'felles/hooks/useStilling';
import { hentTittelFraStilling } from 'felles/domene/stilling/Stilling';
import { useStillingsanalyse } from '../../../api/stillings-api/stillingsanalyse';

type IAnalyserStillingModal = {
    vis: boolean;
    onClose: () => void;
    stillingsId: string;
};

const AnalyserStillingModal: React.FC<IAnalyserStillingModal> = ({ vis, onClose, stillingsId }) => {
    // Henter stillingen basert på stillingsId
    const { stilling, isLoading: isLoadingStilling } = useHentStilling(stillingsId);

    const { stillingsanalyse, isLoading: isLoadingAnalyse } = useStillingsanalyse(
        {
            stillingsId: stillingsId || '',
            stillingstype: stilling?.stillingsinfo?.stillingskategori || 'Stilling',
            stillingstittel: stilling?.stilling ? hentTittelFraStilling(stilling?.stilling) : '',
            stillingstekst: stilling?.stilling.properties?.adtext || '',
        },
        vis
    );

    if (isLoadingStilling || isLoadingAnalyse) {
        return <Loader size="medium" className={css.spinner} />;
    }

    /*if (isErrorStilling || isErrorAnalyse) {
        return (
            <Alert fullWidth variant="error" size="small">
                Klarte ikke å laste inn stillingen eller analysere stillingen.
            </Alert>
        );
    }*/

    return (
        <Modal
            open={vis}
            aria-label="Analyser stilling"
            onClose={onClose}
            header={{
                heading: 'Analyser stilling',
            }}
        >
            {stilling && stillingsanalyse && vis && (
                <div className={css.analyserstilling}>
                    <Modal.Body>
                        <div className={css.innhold}>
                            <p>Stillingstittel: {hentTittelFraStilling(stilling.stilling)}</p>
                            <p>Analyse: {stillingsanalyse.begrunnelse}</p>
                            <p>Sensitiv: {stillingsanalyse.sensitiv ? 'Ja' : 'Nei'}</p>
                        </div>
                    </Modal.Body>
                </div>
            )}
        </Modal>
    );
};

export default AnalyserStillingModal;
