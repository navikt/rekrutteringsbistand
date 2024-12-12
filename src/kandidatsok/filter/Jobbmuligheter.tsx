import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { Innsatsgruppe } from 'felles/domene/kandidat/Oppfølgingsinformasjon';
import { FilterParam } from '../hooks/useQuery';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../hooks/useSøkekriterier';

export enum FiltrerbarInnsatsgruppe {
    Innsatsgruppe,
    AndreInnsatsgrupper = 'ANDRE',
}

const filtrerbareInnsatsgrupper = {
    [Innsatsgruppe.Standardinnsats]: {
        label: 'Gode muligheter',
        description: 'Standard innsats',
    },
    [Innsatsgruppe.SituasjonsbestemtInnsats]: {
        label: 'Trenger veiledning',
        description: 'Situasjonsbestemt innsats',
    },
    [Innsatsgruppe.SpesieltTilpassetInnsats]: {
        label: 'Trenger veiledning, nedsatt arbeidsevne',
        description: 'Spesielt tilpasset innsats',
    },
    [Innsatsgruppe.GradertVarigTilpassetInnsats]: {
        label: 'Jobbe delvis',
        description: 'Delvis varig tilpasset innsats',
    },
    [Innsatsgruppe.VarigTilpassetInnsats]: {
        label: 'Liten mulighet til å jobbe',
        description: 'Varig tilpasset innsats',
    },
    [FiltrerbarInnsatsgruppe.AndreInnsatsgrupper]: {
        label: 'Ikke vurdert',
        description: '',
    },
};

export const alleInnsatsgrupper = {
    ...filtrerbareInnsatsgrupper,
};

const Jobbmuligheter = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const onChange = (valgteInnsatsgrupper: Innsatsgruppe[]) => {
        setSearchParam(
            FilterParam.Innsatsgruppe,
            valgteInnsatsgrupper.join(LISTEPARAMETER_SEPARATOR)
        );
    };

    return (
        <CheckboxGroup
            legend="Velg innsatsgrupper"
            onChange={onChange}
            value={Array.from(søkekriterier.innsatsgruppe)}
        >
            {Object.entries(filtrerbareInnsatsgrupper).map(([kode, gruppe]) => (
                <Checkbox key={kode} value={kode} description={gruppe.description}>
                    {gruppe.label}
                </Checkbox>
            ))}
        </CheckboxGroup>
    );
};

export default Jobbmuligheter;
