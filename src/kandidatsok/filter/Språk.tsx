import { SuggestType } from '../../api/kandidat-søk-api/suggest';
import { FilterParam } from '../hooks/useQuery';
import useSøkekriterier from '../hooks/useSøkekriterier';
import FilterMedTypeahead from './FilterMedTypeahead';

const Språk = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const setValue = (value: string | null) => {
        setSearchParam(FilterParam.Språk, value);
    };

    return (
        <FilterMedTypeahead
            label="Språk"
            description="For eksempel «norsk»"
            suggestType={SuggestType.Språk}
            value={søkekriterier.språk}
            setValue={setValue}
        />
    );
};

export default Språk;
