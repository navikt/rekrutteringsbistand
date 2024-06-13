import { Alert, Link } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import css from './InfoAlert.module.css';

const InfoAlert: FunctionComponent = () => {
    return (
        <div className={css.alert}>
            <Alert variant="info" fullWidth className={css.alertinner}>
                Torsdag 13 juni innfører vi ny tilgangsstyring. Sørg for at du har rett
                tilgang.&nbsp;
                <Link
                    href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Tilgangskontroll.aspx"
                    target="_blank"
                >
                    Les mer på Navet.
                </Link>
            </Alert>
        </div>
    );
};

export default InfoAlert;
