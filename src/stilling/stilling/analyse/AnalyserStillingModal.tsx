import { BodyShort, Label, Loader, Modal } from '@navikt/ds-react';
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

    /*@ts-ignore: TODO: stilling og AdDataState brukes om hverandre, må ryddes opp, for eksempel ved at hentTittel tar inn parameterene som er */
    const stillingstittel = hentTittelFraStilling(stilling);

    const { stillingsanalyse, isLoading: isLoadingAnalyse } = useStillingsanalyse(
        {
            stillingsId: stillingsId || '',
            stillingstype: stillingsinfo?.stillingskategori || 'Stilling',
            stillingstittel: stillingstittel || '',
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
                            <div>
                                <Label>Sensitiv</Label>
                                <BodyShort>{stillingsanalyse.sensitiv ? 'Ja' : 'Nei'}</BodyShort>
                                <BodyShort>{stillingsanalyse.sensitivBegrunnelse}</BodyShort>
                            </div>
                            <div>
                                <Label>Samsvar med type</Label>
                                <BodyShort>
                                    {stillingsanalyse.samsvarMedType ? 'Ja' : 'Nei'}
                                </BodyShort>
                                <BodyShort>{stillingsanalyse.typeBegrunnelse}</BodyShort>
                            </div>
                            <div>
                                <Label>Samsvar med tittel</Label>
                                <BodyShort>
                                    {stillingsanalyse.samsvarMedTittel ? 'Ja' : 'Nei'}
                                </BodyShort>
                                <BodyShort>{stillingsanalyse.tittelBegrunnelse}</BodyShort>
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            )}
        </Modal>
    );
};

export default AnalyserStillingModal;
