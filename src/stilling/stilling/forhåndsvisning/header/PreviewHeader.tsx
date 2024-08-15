import { DocPencilIcon, PrinterSmallIcon, TabsAddIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { System } from '../../../../felles/domene/stilling/Stilling';
import { Rolle } from '../../../../felles/tilgangskontroll/Roller';
import { TilgangskontrollForInnhold } from '../../../../felles/tilgangskontroll/TilgangskontrollForInnhold';
import { State } from '../../../redux/store';
import { COPY_AD_FROM_MY_ADS, EDIT_AD, LEGG_TIL_I_MINE_STILLINGER } from '../../adReducer';
import Stillingsheader from '../../header/Stillingsheader';
import EksternStillingAdvarsel from './EksternStillingAdvarsel';
import OpprettKandidatlisteModal from './OpprettKandidatlisteModal';
interface IPreviewHeader {
    erEier: boolean;
    refetchKandidatlisteId: () => void;
}

const PreviewHeader: React.FC<IPreviewHeader> = ({ erEier, refetchKandidatlisteId }) => {
    const dispatch = useDispatch();
    const { stilling, stillingsinfoData, limitedAccess } = useSelector((state: State) => ({
        stilling: state.adData,
        stillingsinfoData: state.stillingsinfoData,
        stillingsinfo: state.stillingsinfo,
        limitedAccess: state.adData?.createdBy !== System.Rekrutteringsbistand,
    }));
    const [opprettKandidatlisteModalÅpen, setOpprettKandidatlisteModalÅpen] = useState(false);

    const onEditAdClick = () => {
        dispatch({ type: EDIT_AD });
    };

    const onCopyAdClick = () => {
        dispatch({ type: COPY_AD_FROM_MY_ADS, uuid: stilling?.uuid });
    };

    const onPrintClick = () => {
        window.print();
    };

    const onLeggTilIMineStillingerClick = () => {
        setOpprettKandidatlisteModalÅpen(true);
    };

    const lukkOpprettKandidatlisteModal = () => {
        setOpprettKandidatlisteModalÅpen(false);
    };

    const bekreftOpprettKandidatliste = () => {
        dispatch({ type: LEGG_TIL_I_MINE_STILLINGER });
        refetchKandidatlisteId();
        lukkOpprettKandidatlisteModal();
    };

    const kanOverfoereStilling =
        stillingsinfoData && limitedAccess && !stillingsinfoData.eierNavident;

    return (
        <>
            <Stillingsheader>
                <TilgangskontrollForInnhold
                    kreverEnAvRollene={[Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]}
                    skjulVarsel
                >
                    {!limitedAccess && erEier && (
                        <Button onClick={onEditAdClick} size="small" icon={<DocPencilIcon />}>
                            Rediger
                        </Button>
                    )}
                    {!limitedAccess && (
                        <Button onClick={onCopyAdClick} size="small" icon={<TabsAddIcon />}>
                            Dupliser
                        </Button>
                    )}
                    {kanOverfoereStilling && (
                        <Button onClick={onLeggTilIMineStillingerClick} size="small">
                            Opprett kandidatliste
                        </Button>
                    )}
                </TilgangskontrollForInnhold>
                <Button
                    variant="secondary"
                    onClick={onPrintClick}
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

export default PreviewHeader;
