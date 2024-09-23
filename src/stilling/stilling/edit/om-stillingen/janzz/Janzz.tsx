import React, { FunctionComponent, useEffect, useState } from 'react';
import css from '../styrk/Styrk.module.css';
import Typeahead, { Suggestion } from '../../../../common/typeahead/Typeahead';
import { ikkeLastet, Nettressurs, Nettstatus } from 'felles/nettressurs';
import { fetchJanzzYrker, JanzzStilling } from '../../../../api/api';
import capitalizeEmployerName from '../../endre-arbeidsgiver/capitalizeEmployerName';

type Props = {
    janzzStilling: JanzzStilling | null;
    setJanzzStilling: (value: JanzzStilling | null) => void;
};

const Janzz: FunctionComponent<Props> = ({ janzzStilling, setJanzzStilling }) => {
    const [input, setInput] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Nettressurs<JanzzStilling[]>>(ikkeLastet());

    useEffect(() => {
        const hentJanzzYrker = async (typeahead: string) => {
            setSuggestions({
                kind: Nettstatus.LasterInn,
            });

            let response: JanzzStilling[] | null = null;

            try {
                response = await fetchJanzzYrker(typeahead);

                setSuggestions({
                    kind: Nettstatus.Suksess,
                    data: response,
                });
            } catch (e: any) {
                setSuggestions({
                    kind: Nettstatus.Feil,
                    error: e,
                });
            }
        };

        if (input.length > 2) {
            hentJanzzYrker(input);
        }
    }, [input]);

    const onChange = (value: string) => {
        setInput(value);
    };

    const onInputBlur = (value: string) => {
        if (value.length === 0) {
            setJanzzStilling(null);
        }
    };

    const onForslagValgt = (valgtForslag: Suggestion) => {
        if (suggestions.kind === Nettstatus.Suksess) {
            if (valgtForslag) {
                const found = finnJanzzStilling(suggestions.data, valgtForslag.value);

                if (found) {
                    setJanzzStilling(found);
                } else {
                    setJanzzStilling(null);
                }
                setInput(capitalizeEmployerName(found ? found.label : null) || '');
            } else {
                setJanzzStilling(null);
            }
        }
    };

    const feilmeldingTilBruker = suggestions.kind === Nettstatus.Feil && suggestions.error.message;

    return (
        <Typeahead
            value={input}
            onSelect={onForslagValgt}
            onChange={onChange}
            //@ts-ignore: TODO
            onBlur={onInputBlur}
            suggestions={konverterTilTypeaheadFormat(suggestions)}
            error={feilmeldingTilBruker || undefined}
            className={css.typeahead}
            aria-labelledby="endre-stilling-styrk"
        />
    );
};

const finnJanzzStilling = (suggestions: JanzzStilling[], navn: string) =>
    suggestions.find(
        (forslag: JanzzStilling) => forslag.label.toLowerCase() === navn.toLowerCase()
    );

const konverterTilTypeaheadFormat = (suggestions: Nettressurs<JanzzStilling[]>) => {
    if (suggestions.kind === Nettstatus.Suksess) {
        return suggestions.data.map((f) => ({
            value: f.label,
            label: f.label,
        }));
    } else {
        return [];
    }
};

export default Janzz;
