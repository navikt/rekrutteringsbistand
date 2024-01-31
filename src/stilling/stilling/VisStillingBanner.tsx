import { Buldings2Icon, PersonIcon } from '@navikt/aksel-icons';
import { CopyButton, Heading } from '@navikt/ds-react';
import StillingIkon from 'felles/komponenter/piktogrammer/se-mine-stillinger.svg';
import * as React from 'react';

import { hentTittelFraStilling, Stilling, Stillingsinfo } from 'felles/domene/stilling/Stilling';
import Grunnbanner from '../../felles/komponenter/grunnbanner/Grunnbanner';
import Brødsmulesti from '../../felles/komponenter/kandidatbanner/Brødsmulesti';
import TekstlinjeMedIkon from '../../felles/komponenter/tekstlinje-med-ikon/TekstlinjeMedIkon';
import { hentAnnonselenke, stillingErPublisert } from './adUtils';
import capitalizeEmployerName from './edit/endre-arbeidsgiver/capitalizeEmployerName';
import css from './VisStillingBanner.module.css';

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

const VisStillingBanner: React.FC<IVisStillingBanner> = ({ stilling, stillingsinfo }) => {
    const eierNavn = eierAvAstilling(stilling, stillingsinfo);
    const tittel = hentTittelFraStilling(stilling);

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
