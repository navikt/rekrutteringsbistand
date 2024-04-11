import { BodyShort, Button, Heading } from '@navikt/ds-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import TilgangskontrollForInnhold, {
    Rolle,
} from '../../../../../felles/tilgangskontroll/TilgangskontrollForInnhold';
import { State } from '../../../../redux/store';
import {
    MARKER_EKSTERN_STILLING_SOM_MIN,
    MARKER_INTERN_STILLING_SOM_MIN,
} from '../../../adReducer';
import { erDirektemeldtStilling } from '../../../adUtils';
import previewcss from '../AdministrationPreview.module.css';
import MarkerSomMinModal from '../markerSomMinModal/MarkerSomMinModal';

const ContactInfo = () => {
    const dispatch = useDispatch();
    const stilling = useSelector((state: State) => state.adData);
    const stillingsinfo = useSelector((state: State) => state.stillingsinfoData);
    const innlogget = useSelector((state: any) => state.reportee.data);

    const [markerSomMinStillingModalErÅpen, setMarkerSomMinStillingModalErÅpen] = useState(false);

    const onMarkerSomMinKlikkEksternStilling = () => {
        dispatch({ type: MARKER_EKSTERN_STILLING_SOM_MIN });
        setMarkerSomMinStillingModalErÅpen(false);
    };

    const onMarkerSomMinKlikkInternStilling = () => {
        dispatch({ type: MARKER_INTERN_STILLING_SOM_MIN });
        setMarkerSomMinStillingModalErÅpen(false);
    };

    const isDir = stilling && erDirektemeldtStilling(stilling.source);
    const hasStillingsinfo = stillingsinfo && stillingsinfo.eierNavident;
    //@ts-ignore: TODO: written before strict-mode enabled
    const { reportee, navIdent } = stilling.administration;

    const markerSomMinKnappOgModal = () => (
        <TilgangskontrollForInnhold
            skjulVarsel
            kreverEnAvRollene={[Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]}
        >
            <Button
                variant="secondary"
                size="small"
                onClick={() => setMarkerSomMinStillingModalErÅpen(true)}
            >
                Marker som min
            </Button>
            <MarkerSomMinModal
                erÅpen={markerSomMinStillingModalErÅpen}
                onAvbryt={() => setMarkerSomMinStillingModalErÅpen(false)}
                onMarkerSomMin={
                    isDir ? onMarkerSomMinKlikkInternStilling : onMarkerSomMinKlikkEksternStilling
                }
            />
        </TilgangskontrollForInnhold>
    );

    const visMarkerSomMinKnapp =
        innlogget &&
        //@ts-ignore: TODO: written before strict-mode enabled
        innlogget.navIdent !== stilling.administration.navIdent &&
        stillingsinfo.stillingskategori !== Stillingskategori.Formidling;

    return isDir ? (
        <div className={previewcss.previewPanel}>
            <Heading level="3" size="small">
                Spørsmål om stillingen?
            </Heading>
            <BodyShort size="small" spacing>
                Kontaktperson hos NAV: {reportee} {navIdent ? ` (${navIdent})` : ''}
            </BodyShort>
            {visMarkerSomMinKnapp && markerSomMinKnappOgModal()}
        </div>
    ) : (
        <>
            {hasStillingsinfo && (
                <div className={previewcss.previewPanel}>
                    <Heading level="3" size="small" spacing>
                        Spørsmål om stillingen?
                    </Heading>
                    <BodyShort size="small" spacing>
                        Kontaktperson hos NAV: {stillingsinfo.eierNavn}{' '}
                        {stillingsinfo.eierNavident ? ` (${stillingsinfo.eierNavident})` : ''}
                    </BodyShort>
                    {(!stillingsinfo.eierNavident ||
                        (innlogget && stillingsinfo.eierNavident !== innlogget.navIdent)) &&
                        markerSomMinKnappOgModal()}
                </div>
            )}
        </>
    );
};

export default ContactInfo;
