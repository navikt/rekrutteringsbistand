import { DocPencilIcon, PrinterSmallIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';

import Stilling, { Stillingsinfo, System } from 'felles/domene/stilling/Stilling';
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
};

const PreviewMenu: FC<Props> = ({
    erEier,
    stilling,
    limitedAccess,
    stillingsinfoData,
    editAd,
    copyAd,
    leggTilIMineStillinger,
}) => {
    const [opprettKandidatlisteModalÅpen, setOpprettKandidatlisteModalÅpen] = useState(false);
    const onLeggTilIMineStillingerClick = () => {
        setOpprettKandidatlisteModalÅpen(true);
    };

    const lukkOpprettKandidatlisteModal = () => {
        setOpprettKandidatlisteModalÅpen(false);
    };

    const bekreftOpprettKandidatliste = () => {
        leggTilIMineStillinger();
        lukkOpprettKandidatlisteModal();
    };

    const kanOverfoereStilling =
        stillingsinfoData && limitedAccess && !stillingsinfoData.eierNavident;

    return (
        <>
            <Stillingsheader>
                {!limitedAccess && erEier && (
                    <Button onClick={() => {
                        editAd();
                    }} size="small" icon={<DocPencilIcon />}>
                        Rediger
                    </Button>
                )}
                {!limitedAccess && (
                    <Button onClick={() => {
                        copyAd(stilling.uuid);
                    }} size="small" icon={<DocPencilIcon />}>
                        Kopier
                    </Button>
                )}
                {kanOverfoereStilling && (
                    <Button onClick={onLeggTilIMineStillingerClick} size="small">
                        Opprett kandidatliste
                    </Button>
                )}

                <Button
                    variant="secondary"
                    onClick={() => {
                        window.print();
                    }}
                    size="small"
                    icon={<PrinterSmallIcon />}
                >
                    Skriv ut
                </Button>
            </Stillingsheader>
            {limitedAccess && <EksternStillingAdvarsel />}
            <OpprettKandidatlisteModal
                åpen={opprettKandidatlisteModalÅpen}
                onClose={lukkOpprettKandidatlisteModal}
                onBekreft={bekreftOpprettKandidatliste}
            />
        </>
    );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(PreviewMenu);
