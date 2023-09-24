import { FunctionComponent } from 'react';
import { Forslagsfelt } from '../../api/query/byggSuggestion';
import { FilterParam } from '../../hooks/useQuery';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import FilterMedTypeahead from '../FilterMedTypeahead';

const ØnsketYrke: FunctionComponent = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const setValue = (value: string | null) => {
        setSearchParam(FilterParam.ØnsketYrke, value);
    };

    return (
        <FilterMedTypeahead
            label="Arbeidsønsker"
            suggestionField={Forslagsfelt.ØnsketYrke}
            value={søkekriterier.ønsketYrke}
            setValue={setValue}
        />
    );
};

export default ØnsketYrke;
