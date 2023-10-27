import { HGrid, Heading } from '@navikt/ds-react';
import * as React from 'react';
import Stilling, { Stillingsinfo } from '../../../../felles/domene/stilling/Stilling';
import { konverterTilPresenterbarDato } from '../../../stillingssok/stillingsliste/stillingsrad/datoUtils';
import { erDirektemeldtStilling } from '../../adUtils';
import { kategoriTilVisningsnavn } from '../../forhåndsvisning/administration/kategori/Kategori';
import StillingDefinisjon from '../StillingDefinisjon';
import css from '../VisStilling.module.css';
export interface IOmAnnonse {
    stilling: Stilling;
    stillingsinfo: Stillingsinfo;
}

const OmAnnonse: React.FC<IOmAnnonse> = ({ stilling, stillingsinfo }) => {
    const isDir = stilling && erDirektemeldtStilling(stilling.source);
    return (
        <div className={css.wrapper}>
            <Heading size="medium">Om annonsen</Heading>
            <HGrid gap="6" columns={3}>
                <StillingDefinisjon tekst="Annonsenummer" verdi={stilling.id.toString()} />
                <StillingDefinisjon tekst="Hentet fra" verdi={stilling.medium} />
                <StillingDefinisjon tekst="Referanse" verdi={stilling.reference} />
            </HGrid>
            <HGrid gap="6" columns={3}>
                <StillingDefinisjon
                    tekst="Kategori"
                    verdi={kategoriTilVisningsnavn(stillingsinfo.stillingskategori)}
                />
                <StillingDefinisjon
                    tekst="Publisert"
                    verdi={konverterTilPresenterbarDato(stilling.published)}
                />
                <StillingDefinisjon tekst="Sist vist" verdi={'N/A'} />
            </HGrid>
            <HGrid gap="6" columns={3}>
                <StillingDefinisjon
                    tekst="Sist endret"
                    verdi={konverterTilPresenterbarDato(stilling.updated)}
                />
                <StillingDefinisjon
                    tekst="Kontaktperson hos NAV"
                    verdi={
                        isDir
                            ? `${stilling.administration.reportee} ${
                                  stilling.administration.navIdent
                                      ? ` (${stilling.administration.navIdent})`
                                      : ''
                              }`
                            : `${stillingsinfo.eierNavn}{' '}
               ${stillingsinfo.eierNavident ? ` (${stillingsinfo.eierNavident})` : ''}`
                    }
                />
            </HGrid>
        </div>
    );
};

export default OmAnnonse;
