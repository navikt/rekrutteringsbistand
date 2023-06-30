import { useSelector } from 'react-redux';
import { BodyShort } from '@navikt/ds-react';
import css from './AdminStatusPreview.module.css';

const AdminStatusPreview = () => {
    const administration = useSelector((state: any) => state.adData?.administration);

    return (
        <div className={css.AdminStatusPreview}>
            <BodyShort size="small">
                <b>Registrert av: </b>
                {administration.reportee || ''}
                {administration.navIdent ? ` (${administration.navIdent})` : ''}
            </BodyShort>
        </div>
    );
};

export default AdminStatusPreview;
