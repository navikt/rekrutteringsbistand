import { DocPencilIcon, PrinterSmallIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import React from 'react';
import { connect } from 'react-redux';

import Stilling, { Stillingsinfo, System } from 'felles/domene/stilling/Stilling';
import TilgangskontrollForInnhold, {
    Rolle,
} from '../../../../felles/tilgangskontroll/TilgangskontrollForInnhold';
import { State } from '../../../redux/store';
import { StillingsinfoState } from '../../../stillingsinfo/stillingsinfoReducer';
import { COPY_AD_FROM_MY_ADS, EDIT_AD, LEGG_TIL_I_MINE_STILLINGER } from '../../adReducer';
import Stillingsheader from '../../header/Stillingsheader';
import EksternStillingAdvarsel from './EksternStillingAdvarsel';
import OpprettKandidatlisteModal from './OpprettKandidatlisteModal';

type Props = {
    stilling: Stilling;
    stillingsinfoData: Stillingsinfo;
    stillingsinfo: StillingsinfoState;
    limitedAccess: boolean;
    copyAd: (uuid: string) => void;
    editAd: () => void;
    leggTilIMineStillinger: () => void;
    erEier: boolean;
    kandidatlisteId: string;
};

class PreviewMenu extends React.Component<Props> {
    declare state: {
        opprettKandidatlisteModalÅpen: boolean;
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            opprettKandidatlisteModalÅpen: false,
        };
    }

    onEditAdClick = () => {
        this.props.editAd();
    };

    onCopyAdClick = () => {
        this.props.copyAd(this.props.stilling.uuid);
    };

    onPrintClick = () => {
        window.print();
    };

    onLeggTilIMineStillingerClick = () => {
        this.setState({
            opprettKandidatlisteModalÅpen: true,
        });
    };

    lukkOpprettKandidatlisteModal = () => {
        this.setState({
            opprettKandidatlisteModalÅpen: false,
        });
    };

    bekreftOpprettKandidatliste = () => {
        this.props.leggTilIMineStillinger();
        this.lukkOpprettKandidatlisteModal();
    };

    render() {
        const { limitedAccess, stillingsinfoData } = this.props;

        const kanOverfoereStilling =
            stillingsinfoData && limitedAccess && !stillingsinfoData.eierNavident;

        return (
            <>
                <Stillingsheader>
                    <TilgangskontrollForInnhold
                        kreverEnAvRollene={[
                            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                        ]}
                        skjulVarsel
                    >
                        {!limitedAccess && this.props.erEier && (
                            <Button
                                onClick={this.onEditAdClick}
                                size="small"
                                icon={<DocPencilIcon />}
                            >
                                Rediger
                            </Button>
                        )}
                        {!limitedAccess && (
                            <Button
                                onClick={this.onCopyAdClick}
                                size="small"
                                icon={<DocPencilIcon />}
                            >
                                Kopier
                            </Button>
                        )}

                        {kanOverfoereStilling && (
                            <Button onClick={this.onLeggTilIMineStillingerClick} size="small">
                                Opprett kandidatliste
                            </Button>
                        )}
                    </TilgangskontrollForInnhold>
                    <Button
                        variant="secondary"
                        onClick={this.onPrintClick}
                        size="small"
                        icon={<PrinterSmallIcon />}
                    >
                        Skriv ut
                    </Button>
                </Stillingsheader>
                {limitedAccess && <EksternStillingAdvarsel />}

                <OpprettKandidatlisteModal
                    åpen={this.state.opprettKandidatlisteModalÅpen}
                    onClose={this.lukkOpprettKandidatlisteModal}
                    onBekreft={this.bekreftOpprettKandidatliste}
                />
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    stillingsinfoData: state.stillingsinfoData,
    stillingsinfo: state.stillingsinfo,
    stilling: state.adData,
    limitedAccess: state.adData?.createdBy !== System.Rekrutteringsbistand,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    editAd: () => dispatch({ type: EDIT_AD }),
    copyAd: (uuid: string) => dispatch({ type: COPY_AD_FROM_MY_ADS, uuid }),
    leggTilIMineStillinger: () => dispatch({ type: LEGG_TIL_I_MINE_STILLINGER }),
});

// @ts-ignore TODO: written before strict-mode enabled
export default connect(mapStateToProps, mapDispatchToProps)(PreviewMenu);
