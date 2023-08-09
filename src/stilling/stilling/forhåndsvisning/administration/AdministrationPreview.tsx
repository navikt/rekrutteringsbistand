import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@navikt/ds-react';
import { System } from 'felles/domene/stilling/Stilling';
import { EDIT_AD } from '../../adReducer';
import { erDirektemeldtStilling } from '../../adUtils';
import AdStatus from '../../administration/adStatus/AdStatus';
import css from './AdministrationPreview.module.css';
import ContactInfo from './contact/ContactInfo';
import Kategori from './kategori/Kategori';
import Notat from './notat/Notat';
import Publishing from './publishing/Publishing';
import Inkludering from './vis-inkluderingsmuligheter-ekstern-stilling/VisInkuderingsmuligheterForEksternStilling';

const AdministrationPreview = () => {
    const dispatch = useDispatch();

    const source = useSelector((state: any) => state.adData?.source);

    const limitedAccess =
        useSelector((state: any) => state.adData?.createdBy) !== System.Rekrutteringsbistand;

    return (
        <div className={css.preview}>
            <AdStatus />
            <div className={css.paneler}>
                <Publishing />
                <Kategori />
                <ContactInfo />
                {!erDirektemeldtStilling(source) && <Inkludering />}
                <Notat />
                {limitedAccess && (
                    <Button
                        variant="primary"
                        onClick={() => dispatch({ type: EDIT_AD })}
                        className={css.previewPanelButton}
                    >
                        Rediger
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AdministrationPreview;
