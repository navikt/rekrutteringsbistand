import React, { FunctionComponent, useEffect, useState, useCallback } from 'react';
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

    const hentJanzzYrker = useCallback(async (typeahead: string) => {
        setSuggestions({ kind: Nettstatus.LasterInn });
        try {
            const response = await fetchJanzzYrker(typeahead);
            setSuggestions({ kind: Nettstatus.Suksess, data: response });
        } catch (e: any) {
            setSuggestions({ kind: Nettstatus.Feil, error: e });
        }
    }, []);

    useEffect(() => {
        if (input.length > 1) {
            hentJanzzYrker(input);
        } else {
            setSuggestions(ikkeLastet());
        }
    }, [input, hentJanzzYrker]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement> | null, value?: string) => {
        setInput(event?.target?.value || value || '');
    };

    const onToggleSelected = (option: string, isSelected: boolean) => {
        if (isSelected && suggestions.kind === Nettstatus.Suksess) {
            const found = suggestions.data.find(
                (forslag) => forslag.label.toLowerCase() === option.toLowerCase()
            );
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
        } else {
            dispatch({ type: SET_JANZZ, undefined });
        }
    };

    const feilmeldingTilBruker =
        suggestions.kind === Nettstatus.Feil ? suggestions.error.message : undefined;

    return (
        <div>
            <UnsafeCombobox
                label="Yrkestittel som vises på stillingen"
                value={input === 'Stilling uten valgt jobbtittel' ? '' : input}
                options={
                    suggestions.kind === Nettstatus.Suksess
                        ? suggestions.data.map((f) => f.label)
                        : []
                }
                onChange={onChange}
                onToggleSelected={onToggleSelected}
                isLoading={suggestions.kind === Nettstatus.LasterInn}
                error={yrkestittelError || feilmeldingTilBruker}
                className={css.typeahead}
                aria-labelledby="endre-stilling-styrk"
            />
        </div>
    );
};

export default Janzz;
