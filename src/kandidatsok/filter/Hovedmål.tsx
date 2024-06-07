import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { useContext } from 'react';
import { KandidatSøkContext } from '../KandidatSøkContext';
import { FilterParam } from '../hooks/useQuery';
import { LISTEPARAMETER_SEPARATOR } from '../hooks/useSøkekriterier';

export enum Mål {
    SkaffeArbeid = 'SKAFFEA',
    BeholdeArbeid = 'BEHOLDEA',
    ØkeDeltagelse = 'OKEDELT',
}

const Hovedmål = () => {
    const { kriterier } = useContext(KandidatSøkContext);

    const onChange = (valgteHovedmål: Mål[]) => {
        kriterier.setSøkeparameter(
            FilterParam.Hovedmål,
            valgteHovedmål.join(LISTEPARAMETER_SEPARATOR)
        );
    };

    return (
        <CheckboxGroup
            legend="Velg kandidatens mål"
            value={Array.from(kriterier.søkekriterier.hovedmål)}
            onChange={onChange}
        >
            <Checkbox value={Mål.SkaffeArbeid}>Skaffe arbeid</Checkbox>
            <Checkbox value={Mål.BeholdeArbeid}>Beholde arbeid</Checkbox>
            <Checkbox value={Mål.ØkeDeltagelse}>Øke deltagelse</Checkbox>
        </CheckboxGroup>
    );
};

export default Hovedmål;
