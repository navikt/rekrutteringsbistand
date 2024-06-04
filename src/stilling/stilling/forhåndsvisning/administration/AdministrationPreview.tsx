import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@navikt/ds-react';
import { System } from 'felles/domene/stilling/Stilling';
import React from 'react';
import { EDIT_AD } from '../../adReducer';
import { erDirektemeldtStilling } from '../../adUtils';
import AdStatus from '../../administration/adStatus/AdStatus';
import css from './AdministrationPreview.module.css';
import ContactInfo from './contact/ContactInfo';
import Kategori from './kategori/Kategori';
import Publishing from './publishing/Publishing';
import Inkludering from './vis-inkluderingsmuligheter-ekstern-stilling/VisInkuderingsmuligheterForEksternStilling';
import { TilgangskontrollForInnhold } from '../../../../felles/tilgangskontroll/TilgangskontrollForInnhold';
import { Rolle } from '../../../../felles/tilgangskontroll/Roller';

interface IAdministrationPreview {
    erEier: boolean;
}

const AdministrationPreview: React.FC<IAdministrationPreview> = ({ erEier }) => {
    const dispatch = useDispatch();

    const source = useSelector((state: any) => state.adData?.source);

    const createdBy = useSelector((state: any) => state.adData?.createdBy);

    const limitedAccess = createdBy !== System.Rekrutteringsbistand;

    return (
        <div className={css.preview}>
            <AdStatus />
            <div className={css.paneler}>
                <Publishing />
                <Kategori />
                <ContactInfo />
                {!erDirektemeldtStilling(source) && <Inkludering />}

                <TilgangskontrollForInnhold
                    skjulVarsel
                    kreverEnAvRollene={[Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]}
                >
                    {limitedAccess && erEier && (
                        <Button
                            variant="primary"
                            onClick={() => dispatch({ type: EDIT_AD })}
                            className={css.previewPanelButton}
                        >
                            Rediger
                        </Button>
                    )}
                </TilgangskontrollForInnhold>
            </div>
        </div>
    );
};

export default AdministrationPreview;
