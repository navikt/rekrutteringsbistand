import { Buldings2Icon, PersonIcon } from '@navikt/aksel-icons';
import { CopyButton, Heading } from '@navikt/ds-react';
import { ReactComponent as StillingIkon } from 'felles/komponenter/piktogrammer/se-mine-stillinger.svg';
import * as React from 'react';

import { Stilling } from '../../felles/domene/stilling/Stilling';
import Grunnbanner from '../../felles/komponenter/grunnbanner/Grunnbanner';
import Brødsmulesti from '../../felles/komponenter/kandidatbanner/Brødsmulesti';
import TekstlinjeMedIkon from '../../felles/komponenter/tekstlinje-med-ikon/TekstlinjeMedIkon';
import css from './VisStillingBanner.module.css';
import { hentAnnonselenke } from './adUtils';

export interface IVisStillingBanner {
    stilling: Stilling;
}

const VisStillingBanner: React.FC<IVisStillingBanner> = ({ stilling }) => {
    return (
        <Grunnbanner ikon={<StillingIkon />}>
            <div className={css.banner}>
                <div className={css.hovedinnhold}>
                    <Brødsmulesti
                        brødsmulesti={[
                            { tekst: 'Stillinger', href: '/stillinger/stillingssok' },
                            {
                                tekst: stilling.title,
                                href: `/stillinger/stilling/${stilling.uuid}`,
                            },
                        ]}
                    />
                    <Heading size="large" level="2">
                        {stilling.title}
                    </Heading>
                    <div className={css.innholdsLinje}>
                        <TekstlinjeMedIkon ikon={<Buldings2Icon />} tekst={stilling.businessName} />
                        <TekstlinjeMedIkon
                            ikon={<PersonIcon />}
                            tekst={stilling?.administration?.reportee} // TODO Verifiser at dette er riktig (legg til stillingsinfo.eierNavn)
                        />
                    </div>
                    <div>
                        <CopyButton
                            style={{ padding: 0 }}
                            copyText={hentAnnonselenke(stilling.uuid)}
                            text="Kopier annonselenke"
                            size="small"
                        />
                    </div>
                </div>
            </div>
        </Grunnbanner>
    );
};

export default VisStillingBanner;
