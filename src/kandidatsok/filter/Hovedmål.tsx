import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { FilterParam } from '../hooks/useQuery';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../hooks/useSøkekriterier';

export enum Mål {
    SkaffeArbeid = 'SKAFFE_ARBEID',
    BeholdeArbeid = 'BEHOLDE_ARBEID',
    ØkeDeltagelse = 'OKE_DELTAKELSE',
}

const Hovedmål = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const onChange = (valgteHovedmål: Mål[]) => {
        setSearchParam(FilterParam.Hovedmål, valgteHovedmål.join(LISTEPARAMETER_SEPARATOR));
    };

    return (
        <CheckboxGroup
            legend="Velg kandidatens mål"
            value={Array.from(søkekriterier.hovedmål)}
            onChange={onChange}
        >
            <Checkbox value={Mål.SkaffeArbeid}>Skaffe arbeid</Checkbox>
            <Checkbox value={Mål.BeholdeArbeid}>Beholde arbeid</Checkbox>
            <Checkbox value={Mål.ØkeDeltagelse}>Øke deltagelse eller mål om arbeid</Checkbox>
        </CheckboxGroup>
    );
};

export default Hovedmål;
