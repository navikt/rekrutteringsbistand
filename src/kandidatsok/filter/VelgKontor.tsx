import React, { FunctionComponent, useState } from 'react';
import { FilterParam } from '../hooks/useQuery';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../hooks/useSøkekriterier';
import { Typeahead } from './typeahead/Typeahead';
import { useSuggestKontor } from '../../api/kandidat-søk-api/suggestKontor';

type Props = {
    forslagId: string;
};

const VelgKontor: FunctionComponent<Props> = ({ forslagId }) => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();
    const [input, setInput] = useState<string>('');
    const { suggestions } = useSuggestKontor({ query: input });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);

    const onSelect = (selection: string) => {
        setInput('');

        const alleKontor = new Set(søkekriterier.valgtKontor);
        alleKontor.add(selection);

        setSearchParam(
            FilterParam.ValgtKontor,
            Array.from(alleKontor).join(LISTEPARAMETER_SEPARATOR)
        );
    };

    const onFjernValgtKontor = (kontor: string) => () => {
        const alleKontor = new Set(søkekriterier.valgtKontor);
        alleKontor.delete(kontor);

        setSearchParam(
            FilterParam.ValgtKontor,
            Array.from(alleKontor).join(LISTEPARAMETER_SEPARATOR)
        );
    };

    return (
        <Typeahead
            label="Velg kontor"
            description="For eksempel «Nav Kristiansand»"
            value={input}
            suggestions={suggestions}
            suggestionsId={forslagId}
            selectedSuggestions={Array.from(søkekriterier.valgtKontor)}
            onRemoveSuggestion={onFjernValgtKontor}
            allowUnmatchedInputs={false}
            onSelect={onSelect}
            onChange={onChange}
        />
    );
};

export default VelgKontor;
