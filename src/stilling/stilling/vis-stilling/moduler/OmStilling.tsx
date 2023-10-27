import {
    CalendarIcon,
    ClockIcon,
    HourglassIcon,
    PinIcon,
    TimerStartIcon,
} from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';
import parse from 'html-react-parser';
import * as React from 'react';
import Stilling from '../../../../felles/domene/stilling/Stilling';
import TekstlinjeMedIkon from '../../../../felles/komponenter/tekstlinje-med-ikon/TekstlinjeMedIkon';
import { formatISOString, isValidISOString } from '../../../utils/datoUtils';
import css from '../VisStilling.module.css';

export interface IOmStilling {
    stilling: Stilling;
}

const OmStilling: React.FC<IOmStilling> = ({ stilling }) => {
    //todo Hvor havner skift?
    return (
        <>
            <Heading size="large" level="3">
                {stilling.properties.jobtitle}
            </Heading>
            <div className={css.wrapper}>
                <div className={css.infoLinje}>
                    <TekstlinjeMedIkon
                        ikon={<PinIcon />}
                        tekst={`${stilling.location.address}, ${stilling.location.postalCode} ${stilling.location.city}`}
                    />
                    <TekstlinjeMedIkon
                        ikon={<ClockIcon />}
                        tekst={`${stilling.properties.engagementtype}, ${stilling.properties.extent}`}
                    />
                    <TekstlinjeMedIkon
                        ikon={<CalendarIcon />}
                        tekst={`${stilling.properties.workday} ${stilling.properties.workhours}}`}
                    />
                </div>
                <div className={css.infoLinje}>
                    <TekstlinjeMedIkon
                        ikon={<HourglassIcon />}
                        tekst={
                            isValidISOString(stilling.properties.applicationdue)
                                ? formatISOString(stilling.properties.applicationdue, 'DD.MM.YYYY')
                                : stilling.properties.applicationdue
                        }
                    />
                    <TekstlinjeMedIkon
                        ikon={<TimerStartIcon />}
                        tekst={
                            isValidISOString(stilling.properties.starttime)
                                ? formatISOString(stilling.properties.starttime, 'DD.MM.YYYY')
                                : stilling.properties.starttime
                        }
                    />
                </div>
            </div>
            <div>{parse(stilling.properties.adtext || '')}</div>
        </>
    );
};

export default OmStilling;
