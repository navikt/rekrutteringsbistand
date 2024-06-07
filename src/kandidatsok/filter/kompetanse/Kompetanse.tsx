import { useContext } from 'react';
import { SuggestType } from '../../../api/kandidat-søk-api/suggest';
import { KandidatSøkContext } from '../../KandidatSøkContext';
import { FilterParam } from '../../hooks/useQuery';
import { kombinerStringsTilSearchParam } from '../../hooks/useSøkekriterier';
import FilterMedTypeahead from '../FilterMedTypeahead';
import ForslagBasertPåYrke from './ForslagBasertPåYrke';

const Kompetanse = () => {
    const { kriterier } = useContext(KandidatSøkContext);

    const setValue = (value: string | null) => {
        kriterier.setSøkeparameter(FilterParam.Kompetanse, value);
    };

    const onVelgForslag = (forslag: string) => () => {
        const valgteKompetanser = Array.from(kriterier.søkekriterier.kompetanse);
        valgteKompetanser.push(forslag);

        setValue(kombinerStringsTilSearchParam(valgteKompetanser));
    };

    return (
        <>
            <FilterMedTypeahead
                label="Kompetanse"
                description="For eksempel fagbrev, sertifisering, ferdigheter eller programmer"
                suggestType={SuggestType.Kompetanse}
                value={kriterier.søkekriterier.kompetanse}
                setValue={setValue}
            />
            <ForslagBasertPåYrke
                søkekriterier={kriterier.søkekriterier}
                onVelgForslag={onVelgForslag}
            />
        </>
    );
};

export default Kompetanse;
