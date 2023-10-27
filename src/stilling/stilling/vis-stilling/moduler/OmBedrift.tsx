import { HGrid, Heading } from '@navikt/ds-react';
import parse from 'html-react-parser';
import * as React from 'react';
import Stilling from '../../../../felles/domene/stilling/Stilling';
import StillingDefinisjon from '../StillingDefinisjon';
import css from '../VisStilling.module.css';

export interface IOmBedrift {
    stilling: Stilling;
}

const OmBedrift: React.FC<IOmBedrift> = ({ stilling }) => {
    const { employerdescription, sector } = stilling.properties;
    return (
        <div className={css.wrapper}>
            <Heading size="medium">{stilling.businessName}</Heading>
            {parse(employerdescription || '')}

            <HGrid gap="6" columns={3}>
                <StillingDefinisjon
                    tekst="Kontaktperson"
                    verdi={stilling.contactList
                        .map((k) => (stilling.contactList.length > 1 ? `${k.name}, ` : k.name))
                        .toString()}
                />
                <StillingDefinisjon tekst="Epost" verdi={'Hvilken? //TODO'} />
                <StillingDefinisjon tekst="Telefon" verdi={'_TBD_'} />
            </HGrid>
            <HGrid gap="6" columns={3}>
                <StillingDefinisjon tekst="Nettside" verdi={'_TBD_'} />
                <StillingDefinisjon tekst="LinkedIn" verdi={'_TBD_'} />
                <StillingDefinisjon tekst="Twitter" verdi={'_TBD_'} />
            </HGrid>
            <HGrid gap="6" columns={3}>
                <StillingDefinisjon tekst="Virksomhetsnummer" verdi={stilling.employer.orgnr} />
                <StillingDefinisjon tekst="Sektor" verdi={sector} />
            </HGrid>
        </div>
    );
};

export default OmBedrift;
