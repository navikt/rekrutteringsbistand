import { DocPencilIcon, PrinterSmallIcon } from '@navikt/aksel-icons';
import { Button, CopyButton } from '@navikt/ds-react';
import React from 'react';
import { connect } from 'react-redux';

import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import Stilling, { Stillingsinfo, System } from 'felles/domene/stilling/Stilling';
import { Nettressurs } from 'felles/nettressurs';
import { State } from '../../../redux/store';
import { StillingsinfoState } from '../../../stillingsinfo/stillingsinfoReducer';
import { EDIT_AD, LEGG_TIL_I_MINE_STILLINGER } from '../../adReducer';
import { hentAnnonselenke, stillingErPublisert } from '../../adUtils';
import Stillingsheader from '../../header/Stillingsheader';
import EksternStillingAdvarsel from './EksternStillingAdvarsel';
import OpprettKandidatlisteModal from './OpprettKandidatlisteModal';

type Props = {
    stilling: Stilling;
    stillingsinfoData: Stillingsinfo;
    error?: any;
    stillingsinfo: StillingsinfoState;
    kandidatliste: Nettressurs<Kandidatliste>;
    limitedAccess: boolean;

    editAd: () => void;
    leggTilIMineStillinger: () => void;
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
        const { stilling, limitedAccess, stillingsinfoData, error } = this.props;

        const kanOverfoereStilling =
            stillingsinfoData && limitedAccess && !stillingsinfoData.eierNavident;

        console.log('error: ', error);

        return (
            <>
                <Stillingsheader kandidatliste={this.props.kandidatliste}>
                    {stillingErPublisert(stilling) && (
                        <CopyButton
                            copyText={hentAnnonselenke(stilling.uuid)}
                            text="Kopier annonselenke"
                            size="small"
                        />
                    )}
                    {!limitedAccess && (
                        <Button onClick={this.onEditAdClick} size="small" icon={<DocPencilIcon />}>
                            Rediger stillingen
                        </Button>
                    )}
                    {kanOverfoereStilling && (
                        <Button onClick={this.onLeggTilIMineStillingerClick} size="small">
                            Opprett kandidatliste
                        </Button>
                    )}

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
    error: state.error,
    stillingsinfo: state.stillingsinfo,
    stilling: state.adData,
    limitedAccess: state.adData?.createdBy !== System.Rekrutteringsbistand,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    editAd: () => dispatch({ type: EDIT_AD }),
    leggTilIMineStillinger: () => dispatch({ type: LEGG_TIL_I_MINE_STILLINGER }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewMenu);
