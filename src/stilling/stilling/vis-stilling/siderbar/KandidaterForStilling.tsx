import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import KandidatIKandidatliste, {
    Kandidatstatus,
} from '../../../../felles/domene/kandidatliste/KandidatIKandidatliste';
import StillingDefinisjon from '../StillingDefinisjon';
import css from './KandidaterForStilling.module.css';
export interface IKandidaterForStilling {
    kandidater?: KandidatIKandidatliste[];
}

const KandidaterForStilling: React.FC<IKandidaterForStilling> = ({ kandidater }) => {
    return (
        <div>
            <Heading size="medium">Kandidater</Heading>
            {kandidater?.map((kandidat, index) => (
                <div key={index} className={css.kandidatForStilling}>
                    <StillingDefinisjon
                        tekst={`${kandidat.etternavn}, ${kandidat.fornavn}`}
                        verdi={`//TODO sted mangler`}
                    />

                    <StillingDefinisjon
                        tekst={`${statusToDisplayName(kandidat.status)}`}
                        verdi={`//TODO tid mangler`}
                    />
                </div>
            ))}
        </div>
    );
};

export default KandidaterForStilling;

const statusToDisplayName = (status: Kandidatstatus) => {
    switch (status) {
        case Kandidatstatus.Vurderes:
            return 'Vurderes';
        case Kandidatstatus.Kontaktet:
            return 'Kontaktet';
        case Kandidatstatus.Aktuell:
            return 'Aktuell';
        case Kandidatstatus.TilIntervju:
            return 'Til intervju';
        case Kandidatstatus.Uaktuell:
            return 'Ikke aktuell';
        case Kandidatstatus.Uinteressert:
            return 'Ikke interessert';
    }
};
