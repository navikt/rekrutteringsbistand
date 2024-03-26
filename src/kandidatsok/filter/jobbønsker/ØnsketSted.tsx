import React, { useState } from 'react';
import { FilterParam } from '../../hooks/useQuery';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import { Typeahead } from '../typeahead/Typeahead';
import { SuggestionsSted } from '../../../api/kandidat-søk-api/suggestSted';
import { KommuneDTO, useHentKommuner } from '../../../api/stillings-api/hentKommuner';
import { FylkeDTO, useHentFylker } from '../../../api/stillings-api/hentFylker';

export const GEOGRAFI_SEPARATOR = '.';

const ØnsketSted = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();
    const [input, setInput] = useState<string>('');

    const { data: fylker, isLoading: fylkerIsLoading } = useHentFylker();
    const { data: kommuner, isLoading: kommunerIsLoading } = useHentKommuner();

    if (fylkerIsLoading || kommunerIsLoading) {
        return null;
    }

    const fylkeSteder: SuggestionsSted[] = fylker.map((fylke: FylkeDTO) => {
        return {
            geografiKode: fylke.code,
            geografiKodeTekst: fylke.name,
        };
    });

    const kommuneSteder: SuggestionsSted[] = kommuner.map((kommune: KommuneDTO) => {
        return {
            geografiKode: kommune.code,
            geografiKodeTekst: kommune.name,
        };
    });

    const suggestions = [...fylkeSteder, ...kommuneSteder];

    suggestions.sort((a, b) => {
        return a.geografiKodeTekst.localeCompare(b.geografiKodeTekst);
    });

    const valgteSteder = Array.from(søkekriterier.ønsketSted).map((encoded) =>
        decodeGeografiforslag(encoded)
    );

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);

    const onSelect = (selection: string) => {
        if (suggestions) {
            const korresponderendeForslag = suggestions.find(
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

    return (
        <Typeahead
            label="Sted"
            description="Hvor ønsker kandidaten å jobbe?"
            allowUnmatchedInputs={false}
            value={input}
            suggestions={suggestions.map((forslag) => forslag.geografiKodeTekst)}
            selectedSuggestions={valgteSteder.map((valgt) => valgt.geografiKodeTekst)}
            onRemoveSuggestion={onFjernValgtSted}
            onSelect={onSelect}
            onChange={onChange}
        />
    );
};

export const encodeGeografiforslag = (decoded: SuggestionsSted) => {
    return `${decoded.geografiKodeTekst}${GEOGRAFI_SEPARATOR}${decoded.geografiKode}`;
};

const decodeGeografiforslag = (encoded: string): SuggestionsSted => {
    const [stedsnavn, fylkeskode, kommunekode] = encoded.split(GEOGRAFI_SEPARATOR);

    return {
        geografiKode: fylkeskode + (kommunekode ? `.${kommunekode}` : ''),
        geografiKodeTekst: stedsnavn,
    };
};

export default ØnsketSted;
