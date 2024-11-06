import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import css from './Janzz.module.css';
import { SET_EMPLOYMENT_JOBTITLE, SET_JANZZ } from '../../../adDataReducer';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../../redux/store';
import { UNSAFE_Combobox as UnsafeCombobox } from '@navikt/ds-react';
import capitalizeEmployerName from '../../endre-arbeidsgiver/capitalizeEmployerName';
import { useHentJanzzYrker } from '../../../../../api/stillings-api/hentJanzzyrker';
import Skjemalabel from '../../skjemaetikett/Skjemalabel';

type Props = {
    tittel: string;
};

interface Suggestion {
    label: string;
    konseptId: number;
}

const Janzz: FunctionComponent<Props> = ({ tittel }) => {
    const dispatch = useDispatch();
    const yrkestittelError = useSelector((state: State) => state.adValidation.errors.yrkestittel);

    const [input, setInput] = useState<string>(tittel);

    const { data: suggestions, isLoading, error } = useHentJanzzYrker(input);

    const typedSuggestions = suggestions as Suggestion[] | undefined;

    const isUserEditing = useRef(false);

    useEffect(() => {
        setInput(tittel);
        isUserEditing.current = false;
    }, [tittel]);

    useEffect(() => {
        if (!isUserEditing.current) {
            return;
        }

        if (input.trim() === '') {
            // User cleared the input
            dispatch({ type: SET_JANZZ, payload: undefined });
            dispatch({ type: SET_EMPLOYMENT_JOBTITLE, jobtitle: '' });
            return;
        }

        // Update job title with user's input
        dispatch({ type: SET_EMPLOYMENT_JOBTITLE, jobtitle: input });

        // Check if the input matches a suggestion
        if (typedSuggestions && typedSuggestions.length > 0) {
            const found = typedSuggestions.find(
                (suggestion) => suggestion.label.toLowerCase() === input.toLowerCase()
            );

            if (found) {
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
            } else {
                dispatch({ type: SET_JANZZ, payload: undefined });
            }
        } else {
            dispatch({ type: SET_JANZZ, payload: undefined });
        }
    }, [input, typedSuggestions, dispatch]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement> | null, value?: string) => {
        const newValue = event?.target?.value || value || '';
        setInput(newValue);
        isUserEditing.current = true;
    };

    const onToggleSelected = (option: string, isSelected: boolean) => {
        if (isSelected) {
            setInput(capitalizeEmployerName(option) || '');
            isUserEditing.current = true;
        }
    };

    const feilmeldingTilBruker = error ? error.message : undefined;

    return (
        <div>
            <UnsafeCombobox
                label={<Skjemalabel påkrevd>Yrkestittel som vises på stillingen</Skjemalabel>}
                value={
                    input === 'Stilling uten valgt jobbtittel' ||
                    input === 'Invitasjon til jobbmesse'
                        ? ''
                        : input
                }
                options={typedSuggestions ? typedSuggestions.map((s) => s.label) : []}
                onChange={onChange}
                onToggleSelected={onToggleSelected}
                isLoading={isLoading}
                error={yrkestittelError || feilmeldingTilBruker}
                className={css.typeahead}
                aria-labelledby="endre-stilling-styrk"
                filteredOptions={typedSuggestions ? typedSuggestions.map((s) => s.label) : []}
            />
        </div>
    );
};

export default Janzz;
