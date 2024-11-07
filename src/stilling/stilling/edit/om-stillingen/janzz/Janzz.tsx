import React, { FunctionComponent, useState } from 'react';
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
    const [hasValidSelection, setHasValidSelection] = useState<boolean>(true);

    const { data: suggestions, isLoading, error } = useHentJanzzYrker(input);

    const onChange = (event: React.ChangeEvent<HTMLInputElement> | null, value?: string) => {
        setInput(event?.target?.value || value || '');
        setHasValidSelection(false);
    };

    const onToggleSelected = (option: string, isSelected: boolean) => {
        if (isSelected && suggestions) {
            const found = suggestions.find(
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
                setHasValidSelection(true);
            }
        }
    };

    const onBlur = () => {
        if (!hasValidSelection) {
            dispatch({ type: SET_JANZZ, kategori: undefined });
        }
    };

    const feilmeldingTilBruker = error ? error.message : undefined;

    const filteredSuggestions = suggestions
        ? suggestions
              .filter((f) => f.styrk08 && f.styrk08.trim() !== '' && f.styrk08 !== '9999')
              .map((f) => f.label)
        : [];

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
                options={filteredSuggestions}
                onChange={onChange}
                onToggleSelected={onToggleSelected}
                onBlur={onBlur}
                isLoading={isLoading}
                error={yrkestittelError || feilmeldingTilBruker}
                className={css.typeahead}
                aria-labelledby="endre-stilling-styrk"
                filteredOptions={filteredSuggestions}
            />
        </div>
    );
};

export default Janzz;
