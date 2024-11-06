import React, { FunctionComponent, useState, useEffect } from 'react';
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

const Janzz: FunctionComponent<Props> = ({ tittel }) => {
    const dispatch = useDispatch();
    const yrkestittelError = useSelector((state: State) => state.adValidation.errors.yrkestittel);

    const [input, setInput] = useState<string>(tittel);

    const { data: suggestions, isLoading, error } = useHentJanzzYrker(input);

    useEffect(() => {
        if (suggestions && suggestions.length > 0) {
            const found = suggestions.find(
                ({ label }) => label.toLowerCase() === input.toLowerCase()
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
            } else {
                dispatch({ type: SET_JANZZ, undefined });
            }
        } else {
            dispatch({ type: SET_JANZZ, undefined });
        }
    }, [input, suggestions]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement> | null, value?: string) => {
        setInput(event?.target?.value || value || '');
    };

    const onToggleSelected = (option: string, isSelected: boolean) => {
        if (isSelected) {
            setInput(capitalizeEmployerName(option) || '');
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
                options={suggestions ? suggestions.map((f) => f.label) : []}
                onChange={onChange}
                onToggleSelected={onToggleSelected}
                isLoading={isLoading}
                error={yrkestittelError || feilmeldingTilBruker}
                className={css.typeahead}
                aria-labelledby="endre-stilling-styrk"
                filteredOptions={suggestions ? suggestions.map((f) => f.label) : []}
            />
        </div>
    );
};

export default Janzz;
