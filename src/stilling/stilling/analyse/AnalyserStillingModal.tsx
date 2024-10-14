import { Loader, Modal } from '@navikt/ds-react';
import css from './AnalyserStillingModal.module.css';
import { hentTittelFraStilling } from 'felles/domene/stilling/Stilling';
import { useStillingsanalyse } from '../../../api/stillings-api/stillingsanalyse';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';

type IAnalyserStillingModal = {
    vis: boolean;
    onClose: () => void;
    stillingsId: string;
};

const AnalyserStillingModal: React.FC<IAnalyserStillingModal> = ({ vis, onClose, stillingsId }) => {
    // Henter stillingen basert på stillingsId
    const stilling = useSelector((state: State) => state.adData);
    const stillingsinfo = useSelector((state: State) => state.stillingsinfoData);

    const { stillingsanalyse, isLoading: isLoadingAnalyse } = useStillingsanalyse(
        {
            stillingsId: stillingsId || '',
            stillingstype: stillingsinfo?.stillingskategori || 'Stilling',
            /*@ts-ignore: TODO: stilling og AdDataState brukes om hverandre, må ryddes opp */
            stillingstittel: hentTittelFraStilling(stilling) || '',
            stillingstekst: stilling?.properties?.adtext || '',
        },
        vis
    );

    if (isLoadingAnalyse) {
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
                            <p>Stillingstittel: {hentTittelFraStilling(stilling)}</p>
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
