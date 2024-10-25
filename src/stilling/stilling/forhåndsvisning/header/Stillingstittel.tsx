import { BodyShort, Heading } from '@navikt/ds-react';
import { Geografi } from 'felles/domene/stilling/Stilling';
import { FunctionComponent } from 'react';
import capitalizeLocation from '../../edit/arbeidssted/capitalizeLocation';
import css from './Stillingstittel.module.css';

type Props = {
    tittel?: string;
    employer?: string;
    locationList?: Geografi[] | null;
};

const Stillingstittel: FunctionComponent<Props> = ({ tittel, employer, locationList }) => {
    let mestSpesifikkeSted = '';
    if (locationList) {
        locationList.forEach((location) => {
            if (location.city) {
                mestSpesifikkeSted = `${location.city}, ${mestSpesifikkeSted}`.trim();
            } else if (location.municipal) {
                mestSpesifikkeSted = `${location.municipal}, ${mestSpesifikkeSted}`.trim();
            } else if (location.country) {
                mestSpesifikkeSted = `${location.country}, ${mestSpesifikkeSted}`.trim();
            }
        });
    }

    const formatertSted = commaSeparate(employer, capitalizeLocation(mestSpesifikkeSted));

    return (
        <div className={css.stillingstittel}>
            <BodyShort>{formatertSted}</BodyShort>
            <Heading level="2" size="large">
                {tittel || ''}
            </Heading>
        </div>
    );
};

function commaSeparate(...strings: Array<string | undefined>) {
    const onlyStrings = strings.filter((string) => typeof string === 'string' && string !== '');
    return onlyStrings.join(', ');
}

export default Stillingstittel;
