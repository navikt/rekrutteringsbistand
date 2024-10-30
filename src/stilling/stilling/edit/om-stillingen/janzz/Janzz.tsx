import React, { FunctionComponent, useEffect, useState } from 'react';
import css from './Janzz.module.css';
import Typeahead, { Suggestion } from '../../../../common/typeahead/Typeahead';
import { ikkeLastet, Nettressurs, Nettstatus } from 'felles/nettressurs';
import { fetchJanzzYrker, JanzzStilling } from '../../../../api/api';
import capitalizeEmployerName from '../../endre-arbeidsgiver/capitalizeEmployerName';
import { SET_EMPLOYMENT_JOBTITLE, SET_JANZZ } from '../../../adDataReducer';
import { StyrkCategory } from 'felles/domene/stilling/Stilling';
import { useDispatch, useSelector } from 'react-redux';
import Skjemalabel from '../../skjemaetikett/Skjemalabel';
import { State } from '../../../../redux/store';

type Props = {
    categoryList: StyrkCategory[];
    tittel: string;
};

const Janzz: FunctionComponent<Props> = ({ categoryList, tittel }) => {
    const dispatch = useDispatch();
    const yrkestittelError = useSelector((state: State) => state.adValidation.errors.yrkestittel);

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
        } else {
            setInput('');
        }
    };

    const onForslagValgt = (valgtForslag: Suggestion) => {
        console.log('valgtforslag', valgtForslag);
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
                    console.log('kategori', kategori);
                    dispatch({ type: SET_JANZZ, kategori });
                } else {
                    dispatch({ type: SET_JANZZ, undefined });
                }
                setInput(capitalizeEmployerName(found ? found.label : null) || '');
            } else {
                dispatch({ type: SET_JANZZ, undefined });
            }
        }
    };

    //const feilmeldingTilBruker = suggestions.kind === Nettstatus.Feil && suggestions.error.message;

    return (
        <div>
            <Skjemalabel påkrevd>Yrkestittel som vises på stillingen</Skjemalabel>
            <Typeahead
                label=""
                value={input === 'Stilling uten valgt jobbtittel' ? '' : input}
                onSelect={onForslagValgt}
                onChange={onChange}
                onBlur={onChange}
                suggestions={konverterTilTypeaheadFormat(suggestions)}
                error={yrkestittelError}
                className={css.typeahead}
                aria-labelledby="endre-stilling-styrk"
            />
        </div>
    );
};
/*  <UNSAFE_Combobox
    label="Yrkestittel som vises på stillingen"
    value={input === 'Stilling uten valgt jobbtittel' ? '' : input}
    options={}
    //onSelect={onForslagValgt}
    //onChange={onChange}
    //onBlur={onChange}
    //suggestions={konverterTilTypeaheadFormat(suggestions)}
    error={feilmeldingTilBruker || undefined}
    className={css.typeahead}
    aria-labelledby="endre-stilling-styrk"
        />*/

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
