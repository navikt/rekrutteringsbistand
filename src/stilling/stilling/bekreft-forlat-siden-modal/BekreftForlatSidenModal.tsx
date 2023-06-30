import { FunctionComponent } from 'react';
import { BodyShort, Button, ErrorMessage, Heading } from '@navikt/ds-react';
import { connect } from 'react-redux';

import { NyStillingState } from '../adReducer';
import { State } from '../../redux/store';
import css from './BekreftForlatSidenModal.module.css';
import Modal from '../../common/modal/Modal';

type Props = {
    vis: boolean;
    updated: any;
    created: any;
    onBliPåSidenClick: () => void;
    onForlatSidenClick: () => void;
    nyStillingState: NyStillingState;
};

const BekreftForlatSidenModal: FunctionComponent<Props> = (props) => {
    const { vis, updated, created, onBliPåSidenClick, onForlatSidenClick, nyStillingState } = props;

    return (
        <Modal open={vis} className={css.modal} onClose={onBliPåSidenClick}>
            {updated === created ? (
                <Heading level="2" size="medium" spacing>
                    Du har startet registrering av en ny stilling
                </Heading>
            ) : (
                <Heading level="2" size="medium" spacing>
                    Du har gjort endringer på stillingen
                </Heading>
            )}
            <div>
                <BodyShort spacing>
                    Hvis du navigerer bort fra denne siden uten å lagre så mister du informasjonen.
                </BodyShort>
                <Button onClick={onBliPåSidenClick}>Bli på siden</Button>
                <Button
                    variant="secondary"
                    loading={nyStillingState === NyStillingState.Forkastes}
                    onClick={onForlatSidenClick}
                >
                    Forlat siden
                </Button>
            </div>
            {nyStillingState === NyStillingState.Feil && (
                <ErrorMessage className={css.forkastStillingFeil}>
                    Klarte ikke å forkaste den nye stillingen.
                </ErrorMessage>
            )}
        </Modal>
    );
};

const mapStateToProps = (state: State) => ({
    adStatus: state.adData?.status,
    updated: state.adData?.updated,
    created: state.adData?.created,
    nyStillingState: state.ad.nyStillingState,
});

export default connect(mapStateToProps)(BekreftForlatSidenModal);
