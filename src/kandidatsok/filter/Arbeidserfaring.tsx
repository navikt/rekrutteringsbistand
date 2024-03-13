import { Radio, RadioGroup } from '@navikt/ds-react';
import { FilterParam } from '../hooks/useQuery';
import useSøkekriterier from '../hooks/useSøkekriterier';
import FilterMedTypeahead from './FilterMedTypeahead';
import { SuggestType } from '../../api/kandidat-søk-api/suggest';

const Arbeidserfaring = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const setArbeidserfaring = (value: string | null) => {
        setSearchParam(FilterParam.Arbeidserfaring, value);

        if (value === '') {
            setSearchParam(FilterParam.Ferskhet, null);
        }
    };

    const onFerskhetChange = (value: number | null) => {
        setSearchParam(FilterParam.Ferskhet, value === null ? null : String(value));
    };

    return (
        <>
            <FilterMedTypeahead
                label="Arbeidserfaring"
                description={`For eksempel «barnehagelærer»`}
                suggestType={SuggestType.Arbeidserfaring}
                value={søkekriterier.arbeidserfaring}
                setValue={setArbeidserfaring}
            />
            {søkekriterier.arbeidserfaring.size > 0 && (
                <RadioGroup
                    value={søkekriterier.ferskhet}
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
