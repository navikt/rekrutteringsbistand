import React, { FunctionComponent, useEffect, useState } from 'react';
import css from './Janzz.module.css';
import { ikkeLastet, Nettressurs, Nettstatus } from 'felles/nettressurs';
import { fetchJanzzYrker, JanzzStilling } from '../../../../api/api';
import capitalizeEmployerName from '../../endre-arbeidsgiver/capitalizeEmployerName';
import { SET_EMPLOYMENT_JOBTITLE, SET_JANZZ } from '../../../adDataReducer';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../../redux/store';
import { UNSAFE_Combobox as UnsafeCombobox } from '@navikt/ds-react';

type Props = {
    tittel: string;
};

const Janzz: FunctionComponent<Props> = ({ tittel }) => {
    const dispatch = useDispatch();
    const yrkestittelError = useSelector((state: State) => state.adValidation.errors.yrkestittel);

    const [input, setInput] = useState<string>(tittel);
    const [suggestions, setSuggestions] = useState<Nettressurs<JanzzStilling[]>>(ikkeLastet());

    useEffect(() => {
        const hentJanzzYrker = async (typeahead: string) => {
            setSuggestions({
                kind: Nettstatus.LasterInn,
            });

            try {
                const response = await fetchJanzzYrker(typeahead);

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

        if (input.length > 0) {
            hentJanzzYrker(input);
        } else {
            setSuggestions(ikkeLastet());
        }
    }, [input]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement> | null, value?: string) => {
        if (event && event.target) {
            setInput(event.target.value);
        } else if (value !== undefined) {
            setInput(value);
        } else {
            setInput('');
        }
    };

    const onToggleSelected = (option: string, isSelected: boolean, isCustomOption: boolean) => {
        if (isSelected) {
            if (suggestions.kind === Nettstatus.Suksess) {
                const found = finnJanzzStilling(suggestions.data, option);

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
                    setInput(capitalizeEmployerName(found.label) || '');
                } else {
                    dispatch({ type: SET_JANZZ, undefined });
                }
            }
        } else {
            dispatch({ type: SET_JANZZ, undefined });
        }
    };

    const feilmeldingTilBruker = suggestions.kind === Nettstatus.Feil && suggestions.error.message;

    return (
        <div>
            <UnsafeCombobox
                label="Yrkestittel som vises på stillingen"
                value={input === 'Stilling uten valgt jobbtittel' ? '' : input}
                options={konverterTilComboboxOptions(suggestions)}
                onChange={onChange}
                onToggleSelected={onToggleSelected}
                isLoading={suggestions.kind === Nettstatus.LasterInn}
                error={yrkestittelError || feilmeldingTilBruker || undefined}
                className={css.typeahead}
                aria-labelledby="endre-stilling-styrk"
            />
        </div>
    );
};

const konverterTilComboboxOptions = (suggestions: Nettressurs<JanzzStilling[]>): string[] => {
    if (suggestions.kind === Nettstatus.Suksess) {
        return suggestions.data.map((f) => f.label);
    } else {
        return [];
    }
};

const finnJanzzStilling = (suggestions: JanzzStilling[], navn: string) =>
    suggestions.find(
        (forslag: JanzzStilling) => forslag.label.toLowerCase() === navn.toLowerCase()
    );

export default Janzz;
