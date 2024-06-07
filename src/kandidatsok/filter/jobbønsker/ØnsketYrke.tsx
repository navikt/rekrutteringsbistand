import { FunctionComponent, useContext } from 'react';
import { SuggestType } from '../../../api/kandidat-søk-api/suggest';
import { KandidatSøkContext } from '../../KandidatSøkContext';
import { FilterParam } from '../../hooks/useQuery';
import FilterMedTypeahead from '../FilterMedTypeahead';

const ØnsketYrke: FunctionComponent = () => {
    const { kriterier } = useContext(KandidatSøkContext);

    const setValue = (value: string | null) => {
        kriterier.setSøkeparameter(FilterParam.ØnsketYrke, value);
    };

    return (
        <FilterMedTypeahead
            label="Arbeidsønsker"
            description="Hva ønsker kandidaten å jobbe med?"
            suggestType={SuggestType.ØnsketYrke}
            value={kriterier.søkekriterier.ønsketYrke}
            setValue={setValue}
        />
    );
};

export default ØnsketYrke;
