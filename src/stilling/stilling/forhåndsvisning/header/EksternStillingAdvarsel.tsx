import { Alert } from '@navikt/ds-react';
import css from './EksternStillingAdvarsel.module.css';

const EksternStillingAdvarsel = () => (
    <Alert className={css.advarsel} variant="info">
        Dette er en eksternt utlyst stilling. Du kan <b>ikke</b> endre stillingen.
    </Alert>
);

export default EksternStillingAdvarsel;
