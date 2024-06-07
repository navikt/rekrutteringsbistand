import React, { FunctionComponent, useContext, useState } from 'react';
import { useSuggestKontor } from '../../api/kandidat-søk-api/suggestKontor';
import { KandidatSøkContext } from '../KandidatSøkContext';
import { FilterParam } from '../hooks/useQuery';
import { LISTEPARAMETER_SEPARATOR } from '../hooks/useSøkekriterier';
import { Typeahead } from './typeahead/Typeahead';

type Props = {
    forslagId: string;
};

const VelgKontor: FunctionComponent<Props> = ({ forslagId }) => {
    const { kriterier } = useContext(KandidatSøkContext);
    const [input, setInput] = useState<string>('');
    const { suggestions } = useSuggestKontor({ query: input });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);

    const onSelect = (selection: string) => {
        setInput('');

        const alleKontor = new Set(kriterier.søkekriterier.valgtKontor);
        alleKontor.add(selection);

        kriterier.setSøkeparameter(
            FilterParam.ValgtKontor,
            Array.from(alleKontor).join(LISTEPARAMETER_SEPARATOR)
        );
    };

    const onFjernValgtKontor = (kontor: string) => () => {
        const alleKontor = new Set(kriterier.søkekriterier.valgtKontor);
        alleKontor.delete(kontor);

        kriterier.setSøkeparameter(
            FilterParam.ValgtKontor,
            Array.from(alleKontor).join(LISTEPARAMETER_SEPARATOR)
        );
    };

    return (
        <Typeahead
            label="Velg kontor"
            description="For eksempel «NAV Kristiansand»"
            value={input}
            suggestions={suggestions}
            suggestionsId={forslagId}
            selectedSuggestions={Array.from(kriterier.søkekriterier.valgtKontor)}
            onRemoveSuggestion={onFjernValgtKontor}
            allowUnmatchedInputs={false}
            onSelect={onSelect}
            onChange={onChange}
        />
    );
};

export default VelgKontor;
