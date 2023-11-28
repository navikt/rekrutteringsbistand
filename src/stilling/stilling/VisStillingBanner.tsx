import { Buldings2Icon, PersonIcon } from '@navikt/aksel-icons';
import { CopyButton, Heading } from '@navikt/ds-react';
import { ReactComponent as StillingIkon } from 'felles/komponenter/piktogrammer/se-mine-stillinger.svg';
import * as React from 'react';

import { Stilling, Stillingsinfo } from 'felles/domene/stilling/Stilling';
import Grunnbanner from '../../felles/komponenter/grunnbanner/Grunnbanner';
import Brødsmulesti from '../../felles/komponenter/kandidatbanner/Brødsmulesti';
import TekstlinjeMedIkon from '../../felles/komponenter/tekstlinje-med-ikon/TekstlinjeMedIkon';
import css from './VisStillingBanner.module.css';
import { hentAnnonselenke, stillingErPublisert } from './adUtils';
import capitalizeEmployerName from './edit/endre-arbeidsgiver/capitalizeEmployerName';
import { USE_STYRK_AS_TITLE_FEATURE_TOGGLE } from '../stillingssok/stillingsliste/stillingsrad/Stillingsrad';

export interface IVisStillingBanner {
    stilling: Stilling;
    stillingsinfo: Stillingsinfo;
}

const eierAvAstilling = (stilling: Stilling, stillingsinfo: Stillingsinfo): string | null => {
    if (stilling?.administration?.navIdent !== null) {
        return stilling?.administration?.reportee ?? null;
    }
    return stillingsinfo.eierNavn ?? null;
};

const hentTittel = (stilling: Stilling) => {
    if (stilling.source !== 'DIR') {
        return stilling.title;
    }

    const passendeStyrkkoder = stilling.categoryList.filter(
        ({ categoryType }) => categoryType === 'STYRK08NAV'
    );

    if (passendeStyrkkoder.length === 0) {
        return 'Stilling uten valgt jobbtittel';
    }
    return passendeStyrkkoder.map((it) => it.name).join('/');
};

const VisStillingBanner: React.FC<IVisStillingBanner> = ({ stilling, stillingsinfo }) => {
    const eierNavn = eierAvAstilling(stilling, stillingsinfo);
    console.log('stilling:', { stilling, USE_STYRK_AS_TITLE_FEATURE_TOGGLE });
    const tittel = USE_STYRK_AS_TITLE_FEATURE_TOGGLE ? hentTittel(stilling) : stilling.title;

    return (
        <Grunnbanner ikon={<StillingIkon />}>
            <div className={css.banner}>
                <div className={css.hovedinnhold}>
                    <Brødsmulesti
                        brødsmulesti={[
                            { tekst: 'Stillinger', href: '/stillinger/stillingssok' },
                            {
                                tekst: tittel,
                                href: `/stillinger/stilling/${stilling.uuid}`,
                            },
                        ]}
                    />
                    <Heading size="large" level="2">
                        {tittel}
                    </Heading>
                    <div className={css.innholdsLinje}>
                        <TekstlinjeMedIkon
                            ikon={<Buldings2Icon />}
                            tekst={capitalizeEmployerName(stilling.businessName)}
                        />
                        {eierNavn && (
                            <TekstlinjeMedIkon
                                ikon={<PersonIcon />}
                                tekst={`Registrert av ${eierNavn}`}
                            />
                        )}
                    </div>
                    <div>
                        {stillingErPublisert(stilling) && (
                            <CopyButton
                                style={{ padding: 0 }}
                                copyText={hentAnnonselenke(stilling.uuid)}
                                text="Kopier annonselenke"
                                size="small"
                            />
                        )}
                    </div>
                </div>
            </div>
        </Grunnbanner>
    );
};

export default VisStillingBanner;
