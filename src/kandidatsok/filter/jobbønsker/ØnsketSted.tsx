import { Nettstatus } from 'felles/nettressurs';
import React, { useState } from 'react';
import useGeografiSuggestions, { Geografiforslag } from '../../hooks/useGeografiSuggestions';
import { FilterParam } from '../../hooks/useQuery';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import { Typeahead } from '../typeahead/Typeahead';
import { useSuggestSted } from '../../../api/kandidat-søk-api/suggestSted';

export const GEOGRAFI_SEPARATOR = '.';

const ØnsketSted = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();
    const [input, setInput] = useState<string>('');
    //const forslag = useGeografiSuggestions(input);
    const forslag = useSuggestSted({ query: input });

    const valgteSteder = Array.from(søkekriterier.ønsketSted).map((encoded) =>
        decodeGeografiforslag(encoded)
    );

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);

    const onSelect = (selection: string) => {
        if (forslag.kind === Nettstatus.Suksess) {
            const korresponderendeForslag = forslag.data.find(
                (forslag) => forslag.geografiKodeTekst === selection
            );

            if (korresponderendeForslag) {
                const encodedSted = encodeGeografiforslag(korresponderendeForslag);

                setSelectedSted(encodedSted);
            }
        }
    };

    const setSelectedSted = (encodedSted: string) => {
        setInput('');

        const oppdaterteSteder = [...valgteSteder.map(encodeGeografiforslag), encodedSted];
        setSearchParam(FilterParam.ØnsketSted, oppdaterteSteder.join('_'));
    };

    const onFjernValgtSted = (valgtSted: string) => () => {
        const alleØnskedeSteder = [...valgteSteder]
            .filter((sted) => {
                return sted.geografiKodeTekst !== valgtSted;
            })
            .map(encodeGeografiforslag);

        setSearchParam(FilterParam.ØnsketSted, alleØnskedeSteder.join('_'));
    };

    const suggestions =
        forslag.kind === Nettstatus.Suksess
            ? forslag.data.map((sted) => sted.geografiKodeTekst)
            : [];

    return (
        <Typeahead
            label="Sted"
            description="Hvor ønsker kandidaten å jobbe?"
            allowUnmatchedInputs={false}
            value={input}
            suggestions={suggestions}
            selectedSuggestions={valgteSteder.map((valgt) => valgt.geografiKodeTekst)}
            onRemoveSuggestion={onFjernValgtSted}
            onSelect={onSelect}
            onChange={onChange}
        />
    );
};

export const encodeGeografiforslag = (decoded: Geografiforslag) => {
    return `${decoded.geografiKodeTekst}${GEOGRAFI_SEPARATOR}${decoded.geografiKode}`;
};

const decodeGeografiforslag = (encoded: string): Geografiforslag => {
    const [stedsnavn, fylkeskode, kommunekode] = encoded.split(GEOGRAFI_SEPARATOR);

    return {
        geografiKode: fylkeskode + (kommunekode ? `.${kommunekode}` : ''),
        geografiKodeTekst: stedsnavn,
    };
};

export default ØnsketSted;
