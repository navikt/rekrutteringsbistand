import { BodyShort, Heading } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

import css from './Administration.module.css';
import AdStatus from './adStatus/AdStatus';
import AdStatusEdit from './adStatus/AdStatusEdit';
import AdminStatusPreview from './adminStatus/AdminStatusPreview';
import Privacy from './publishing/Privacy';
import Publishing from './publishing/Publishing';

const Administration: FunctionComponent = () => (
    <div className={css.administration}>
        <AdStatus />
        <div className={css.elements}>
            <div>
                <Heading level="3" size="small" spacing>
                    Når skal stillingen vises?<BodyShort as="span"> (må fylles ut)</BodyShort>
                </Heading>
                <Publishing />
            </div>
            <Privacy />
        </div>
        <div className={css.bottom}>
            <AdminStatusPreview />
            <AdStatusEdit />
        </div>
    </div>
);

export default Administration;
