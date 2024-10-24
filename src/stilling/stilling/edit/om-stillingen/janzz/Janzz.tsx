import React, { FunctionComponent, useEffect, useState } from 'react';
import css from './Janzz.module.css';
import Typeahead, { Suggestion } from '../../../../common/typeahead/Typeahead';
import { ikkeLastet, Nettressurs, Nettstatus } from 'felles/nettressurs';
import { fetchJanzzYrker, JanzzStilling } from '../../../../api/api';
import capitalizeEmployerName from '../../endre-arbeidsgiver/capitalizeEmployerName';
import { SET_EMPLOYMENT_JOBTITLE, SET_JANZZ } from '../../../adDataReducer';
import { StyrkCategory } from 'felles/domene/stilling/Stilling';
import { useDispatch } from 'react-redux';

type Props = {
    categoryList: StyrkCategory[];
    tittel: string;
};

const Janzz: FunctionComponent<Props> = ({ categoryList, tittel }) => {
    const dispatch = useDispatch();

    const [input, setInput] = useState<string>(tittel);
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

    const onChange = (value: string | undefined) => {
        if (value) {
            setInput(value);
        }
    };

    const onForslagValgt = (valgtForslag: Suggestion) => {
        if (suggestions.kind === Nettstatus.Suksess) {
            if (valgtForslag) {
                const found = finnJanzzStilling(suggestions.data, valgtForslag.value);

                if (found) {
                    dispatch({ type: SET_EMPLOYMENT_JOBTITLE, jobtitle: found.label });
                    const kategori = [
                        {
                            id: found.konseptId,
                            code: found.konseptId.toString(),
                            categoryType: 'JANZZ',
                            name: found.label,
                            description: null,
                            parentId: null,
                        },
                    ];
                    dispatch({ type: SET_JANZZ, kategori });
                }
                setInput(capitalizeEmployerName(found ? found.label : null) || '');
            }
        }
    };

    const feilmeldingTilBruker = suggestions.kind === Nettstatus.Feil && suggestions.error.message;

    return (
        <Typeahead
            label="Yrkestittel som vises på stillingen"
            value={input}
            onSelect={onForslagValgt}
            onChange={onChange}
            onBlur={onChange}
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
