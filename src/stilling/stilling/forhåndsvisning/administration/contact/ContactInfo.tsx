import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BodyShort, Button, Heading } from '@navikt/ds-react';

import {
    MARKER_EKSTERN_STILLING_SOM_MIN,
    MARKER_INTERN_STILLING_SOM_MIN,
} from '../../../adReducer';
import { erDirektemeldtStilling } from '../../../adUtils';
import MarkerSomMinModal from '../markerSomMinModal/MarkerSomMinModal';
import previewcss from '../AdministrationPreview.module.css';

const ContactInfo = () => {
    const dispatch = useDispatch();
    const stilling = useSelector((state: any) => state.adData);
    const stillingsinfo = useSelector((state: any) => state.stillingsinfoData);
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
    const { reportee, navIdent } = stilling.administration;

    const markerSomMinKnappOgModal = () => (
        <>
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
        </>
    );

    return isDir ? (
        <div className={previewcss.previewPanel}>
            <Heading level="3" size="small">
                Spørsmål om stillingen?
            </Heading>
            <BodyShort size="small" spacing>
                Kontaktperson hos NAV: {reportee} {navIdent ? ` (${navIdent})` : ''}
            </BodyShort>
            {innlogget &&
                innlogget.navIdent !== stilling.administration.navIdent &&
                markerSomMinKnappOgModal()}
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
