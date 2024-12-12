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
        label: 'Standard innsats',
        description: 'Gode muligheter',
    },
    [Innsatsgruppe.SituasjonsbestemtInnsats]: {
        label: 'Situasjonsbestemt innsats',
        description: 'Trenger veiledning',
    },
    [Innsatsgruppe.SpesieltTilpassetInnsats]: {
        label: 'Spesielt tilpasset innsats',
        description: 'Trenger veiledning, nedsatt arbeidsevne',
    },
    [Innsatsgruppe.GradertVarigTilpassetInnsats]: {
        label: 'Delvis varig tilpasset innsats',
        description: 'Jobbe delvis',
    },
    [Innsatsgruppe.VarigTilpassetInnsats]: {
        label: 'Varig tilpasset innsats',
        description: 'Liten mulighet til å jobbe',
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
