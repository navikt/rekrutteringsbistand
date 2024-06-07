import { useContext } from 'react';
import { SuggestType } from '../../api/kandidat-søk-api/suggest';
import { KandidatSøkContext } from '../KandidatSøkContext';
import { FilterParam } from '../hooks/useQuery';
import FilterMedTypeahead from './FilterMedTypeahead';

const Språk = () => {
    const { kriterier } = useContext(KandidatSøkContext);

    const setValue = (value: string | null) => {
        kriterier.setSøkeparameter(FilterParam.Språk, value);
    };

    return (
        <FilterMedTypeahead
            label="Språk"
            description="For eksempel «norsk»"
            suggestType={SuggestType.Språk}
            value={kriterier.søkekriterier.språk}
            setValue={setValue}
        />
    );
};

export default Språk;
