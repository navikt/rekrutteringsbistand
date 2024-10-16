import { BodyShort, Label, Loader, Modal, Alert } from '@navikt/ds-react';
import css from './AnalyserStillingModal.module.css';
import Stilling, { hentTittelFraStilling } from 'felles/domene/stilling/Stilling';
import { useStillingsanalyse } from '../../../api/stillings-api/stillingsanalyse';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';

type IAnalyserStillingModal = {
    vis: boolean;
    onClose: () => void;
    stillingsId: string;
};

type IAnalyseInnhold = {
    stillingsId: string;
    stillingsinfo: any;
    stillingstittel: string;
    stilling: Stilling;
    vis: boolean;
};

const AnalyseInnhold: React.FC<IAnalyseInnhold> = ({
    stillingsId,
    stillingsinfo,
    stillingstittel,
    stilling,
    vis,
}) => {
    const { isLoading, data, error } = useStillingsanalyse(
        {
            stillingsId: stillingsId || '',
            stillingstype: stillingsinfo?.stillingskategori || 'Stilling',
            stillingstittel: stillingstittel || '',
            stillingstekst: stilling?.properties?.adtext || '',
        },
        vis
    );
    const stillingsanalyse = data;

    if (isLoading) {
        return (
            <div className={css.spinnerContainer}>
                <Loader size="medium" className={css.spinner} />
            </div>
        );
    }

    if (error || stillingsanalyse === undefined) {
        return (
            <Alert variant="error" size="small" fullWidth>
                Klarte ikke å analysere stillingen.
            </Alert>
        );
    }

    return (
        <div className={css.innhold}>
            <div>
                <Label>Sensitiv</Label>
                <BodyShort>{stillingsanalyse.sensitiv ? 'Ja' : 'Nei'}</BodyShort>
                <BodyShort>{stillingsanalyse.sensitivBegrunnelse}</BodyShort>
            </div>
            <div>
                <Label>Samsvar med type</Label>
                <BodyShort>{stillingsanalyse.samsvarMedType ? 'Ja' : 'Nei'}</BodyShort>
                <BodyShort>{stillingsanalyse.typeBegrunnelse}</BodyShort>
            </div>
            <div>
                <Label>Samsvar med tittel</Label>
                <BodyShort>{stillingsanalyse.samsvarMedTittel ? 'Ja' : 'Nei'}</BodyShort>
                <BodyShort>{stillingsanalyse.tittelBegrunnelse}</BodyShort>
            </div>
        </div>
    );
};

const AnalyserStillingModal: React.FC<IAnalyserStillingModal> = ({ vis, onClose, stillingsId }) => {
    // Henter stillingen basert på stillingsId
    const stilling = useSelector((state: State) => state.adData) as Stilling;
    const stillingsinfo = useSelector((state: State) => state.stillingsinfoData);

    const stillingstittel = hentTittelFraStilling(stilling);

    return (
        <Modal
            open={vis}
            aria-label="Analyser stilling"
            onClose={onClose}
            header={{
                heading: 'Analyser stilling',
            }}
        >
            <Modal.Body>
                <div className={css.analyserstilling}>
                    <AnalyseInnhold
                        stillingsId={stillingsId}
                        stillingsinfo={stillingsinfo}
                        stillingstittel={stillingstittel}
                        stilling={stilling}
                        vis={vis}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AnalyserStillingModal;
