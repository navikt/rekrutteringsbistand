import { FunctionComponent } from 'react';
import { FilterParam } from '../../hooks/useQuery';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import FilterMedTypeahead from '../FilterMedTypeahead';
import { SuggestType } from '../../../api/kandidat-søk-api/suggest';

const ØnsketYrke: FunctionComponent = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const setValue = (value: string | null) => {
        setSearchParam(FilterParam.ØnsketYrke, value);
    };

    return (
        <FilterMedTypeahead
            label="Arbeidsønsker"
            description="Hva ønsker kandidaten å jobbe med?"
            suggestType={SuggestType.ØnsketYrke}
            value={søkekriterier.ønsketYrke}
            setValue={setValue}
        />
    );
};

export default ØnsketYrke;
