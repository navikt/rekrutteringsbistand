import { Radio, RadioGroup } from '@navikt/ds-react';
import { useContext } from 'react';
import { SuggestType } from '../../api/kandidat-søk-api/suggest';
import { KandidatSøkContext } from '../KandidatSøkContext';
import { FilterParam } from '../hooks/useQuery';
import FilterMedTypeahead from './FilterMedTypeahead';

const Arbeidserfaring = () => {
    const { kriterier } = useContext(KandidatSøkContext);

    const setArbeidserfaring = (value: string | null) => {
        kriterier.setSøkeparameter(FilterParam.Arbeidserfaring, value);
        if (value === '') {
            kriterier.setSøkeparameter(FilterParam.Ferskhet, null);
        }
    };

    const onFerskhetChange = (value: number | null) => {
        kriterier.setSøkeparameter(FilterParam.Ferskhet, value === null ? null : String(value));
    };

    return (
        <>
            <FilterMedTypeahead
                label="Arbeidserfaring"
                description={`For eksempel «barnehagelærer»`}
                suggestType={SuggestType.Arbeidserfaring}
                value={kriterier.søkekriterier.arbeidserfaring}
                setValue={setArbeidserfaring}
            />
            {kriterier.søkekriterier.arbeidserfaring.size > 0 && (
                <RadioGroup
                    value={kriterier.søkekriterier.ferskhet}
                    onChange={onFerskhetChange}
                    legend="Nylig arbeidserfaring"
                    description="Hvor fersk må arbeidserfaringen være?"
                >
                    <Radio value={null}>Ingen krav</Radio>
                    <Radio value={2}>Siste to år</Radio>
                    <Radio value={5}>Siste fem år</Radio>
                </RadioGroup>
            )}
        </>
    );
};

export default Arbeidserfaring;
