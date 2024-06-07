import React, { useContext, useMemo, useState } from 'react';
import { SuggestionsSted } from '../../../api/kandidat-søk-api/suggestSted';
import { FylkeDTO, useHentFylker } from '../../../api/stillings-api/hentFylker';
import { KommuneDTO, useHentKommuner } from '../../../api/stillings-api/hentKommuner';
import { LandDTO, useHentLandliste } from '../../../api/stillings-api/hentLand';
import { KandidatSøkContext } from '../../KandidatSøkContext';
import { FilterParam } from '../../hooks/useQuery';
import { Typeahead } from '../typeahead/Typeahead';

export const GEOGRAFI_SEPARATOR = '.';

const ØnsketSted = () => {
    const { kriterier } = useContext(KandidatSøkContext);
    const [input, setInput] = useState<string>('');

    const { data: fylker, isLoading: fylkerIsLoading } = useHentFylker();
    const { data: kommuner, isLoading: kommunerIsLoading } = useHentKommuner();
    const { data: landliste, isLoading: landlisteIsLoading } = useHentLandliste();

    const filteredSuggestions = useMemo(() => {
        if (fylkerIsLoading || kommunerIsLoading || landlisteIsLoading) {
            return null;
        }

        const fylkeSteder: SuggestionsSted[] = fylker
            ? fylker.map((fylke: FylkeDTO) => {
                  return {
                      geografiKode: `NO${fylke.code}`,
                      geografiKodeTekst: fylke.capitalizedName,
                  };
              })
            : [];

        const kommuneSteder: SuggestionsSted[] = kommuner
            ? kommuner.map((kommune: KommuneDTO) => {
                  return {
                      geografiKode: `NO${kommune.countyCode}.${kommune.code}`,
                      geografiKodeTekst: kommune.capitalizedName,
                  };
              })
            : [];

        const landSteder: SuggestionsSted[] = landliste
            ? landliste.map((land: LandDTO) => {
                  return {
                      geografiKode: `${land.code}`,
                      geografiKodeTekst: land.capitalizedName,
                  };
              })
            : [];

        const unikeKommuneSteder = kommuneSteder.filter(
            (kommune) =>
                !new Set(fylkeSteder.map((fylke) => fylke.geografiKodeTekst.toLowerCase())).has(
                    kommune.geografiKodeTekst.toLowerCase()
                )
        );

        const suggestions = [...fylkeSteder, ...unikeKommuneSteder, ...landSteder];

        const inputNormalized = input.toLowerCase();

        return inputNormalized && inputNormalized.length > 1
            ? suggestions
                  .filter((suggestion) =>
                      suggestion.geografiKodeTekst.toLowerCase().includes(inputNormalized)
                  )
                  .sort((a, b) => {
                      return (
                          a.geografiKodeTekst.toLowerCase().indexOf(inputNormalized) -
                              b.geografiKodeTekst.toLowerCase().indexOf(inputNormalized) ||
                          a.geografiKodeTekst.length - b.geografiKodeTekst.length
                      );
                  })
                  .slice(0, 10)
            : [];
    }, [
        input,
        fylker,
        kommuner,
        landliste,
        fylkerIsLoading,
        kommunerIsLoading,
        landlisteIsLoading,
    ]);

    const valgteSteder = Array.from(kriterier.søkekriterier.ønsketSted).map((encoded) =>
        decodeGeografiforslag(encoded)
    );

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);

    const onSelect = (selection: string) => {
        if (filteredSuggestions) {
            const korresponderendeForslag = filteredSuggestions.find(
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
        kriterier.setSøkeparameter(FilterParam.ØnsketSted, oppdaterteSteder.join('_'));
    };

    const onFjernValgtSted = (valgtSted: string) => () => {
        const alleØnskedeSteder = [...valgteSteder]
            .filter((sted) => {
                return sted.geografiKodeTekst !== valgtSted;
            })
            .map(encodeGeografiforslag);

        kriterier.setSøkeparameter(FilterParam.ØnsketSted, alleØnskedeSteder.join('_'));
    };

    return (
        <Typeahead
            label="Sted"
            description="Hvor ønsker kandidaten å jobbe?"
            allowUnmatchedInputs={false}
            value={input}
            suggestions={
                filteredSuggestions
                    ? filteredSuggestions.map((forslag) => forslag.geografiKodeTekst)
                    : []
            }
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
