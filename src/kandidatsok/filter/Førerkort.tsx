import { useEffect, useState } from 'react';
import { FilterParam } from '../hooks/useQuery';
import useSøkekriterier, {
    LISTEPARAMETER_SEPARATOR,
    Førerkortklasse,
} from '../hooks/useSøkekriterier';
import { Typeahead } from './typeahead/Typeahead';

type FørerkortklasseWrapper = {
    klasse: Førerkortklasse;
    kode: string;
    navn: string;
};

const alleKlasser: FørerkortklasseWrapper[] = Object.values(Førerkortklasse).map((esValue) => {
    const [kode, navn] = esValue.split(' - ');

    return {
        klasse: esValue,
        kode,
        navn,
    };
});

const Førerkort = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();
    const [forslag, setForslag] = useState<string[]>([]);

    const [input, setInput] = useState<string>('');

    useEffect(() => {
        if (input.length > 0) {
            const klasser = alleKlasser
                .filter(klasseInneholderInput(input))
                .map((klasse) => klasse.klasse);

            setForslag(klasser);
        }
    }, [input]);

    const setValue = (valgteKlasser: Set<Førerkortklasse>) => {
        setSearchParam(
            FilterParam.Førerkort,
            Array.from(valgteKlasser).join(LISTEPARAMETER_SEPARATOR)
        );
    };

    const onSelect = (klasse: string) => {
        setInput('');

        const valgteKlasser = new Set(søkekriterier.førerkort);
        valgteKlasser.add(klasse as Førerkortklasse);
        setValue(valgteKlasser);
    };

    const onFjernValgtKlasse = (valgtKlasse: string) => () => {
        const valgteKlasser = new Set(søkekriterier.førerkort);
        valgteKlasser.delete(valgtKlasse as Førerkortklasse);

        setValue(valgteKlasser);
    };

    return (
        <Typeahead
            label="Førerkort"
            description={`For eksempel «personbil»`}
            value={input}
            suggestions={forslag}
            selectedSuggestions={Array.from(søkekriterier.førerkort)}
            onRemoveSuggestion={onFjernValgtKlasse}
            onSelect={onSelect}
            onChange={(event) => setInput(event.target.value)}
            allowUnmatchedInputs={false}
        />
    );
};

const klasseInneholderInput =
    (input: string) =>
    ({ klasse }: FørerkortklasseWrapper) => {
        const inputWords = input.toLowerCase().split(' ');

        return inputWords.every((inputWord) => klasse.toLowerCase().includes(inputWord));
    };

export default Førerkort;
