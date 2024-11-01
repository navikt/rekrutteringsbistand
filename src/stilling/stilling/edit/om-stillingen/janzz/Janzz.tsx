// components/Janzz.tsx

import React, { FunctionComponent, useState } from 'react';
import css from './Janzz.module.css';
import { SET_EMPLOYMENT_JOBTITLE, SET_JANZZ } from '../../../adDataReducer';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../../redux/store';
import { UNSAFE_Combobox as UnsafeCombobox } from '@navikt/ds-react';
import capitalizeEmployerName from '../../endre-arbeidsgiver/capitalizeEmployerName';
import { useHentJanzzYrker } from '../../../../../api/stillings-api/hentJanzzyrker';

type Props = {
    tittel: string;
};

const Janzz: FunctionComponent<Props> = ({ tittel }) => {
    const dispatch = useDispatch();
    const yrkestittelError = useSelector((state: State) => state.adValidation.errors.yrkestittel);

    const [input, setInput] = useState<string>(tittel);

    const { data: suggestions, isLoading, error } = useHentJanzzYrker(input);

    const onChange = (event: React.ChangeEvent<HTMLInputElement> | null, value?: string) => {
        setInput(event?.target?.value || value || '');
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
            }
        }
    };

    const feilmeldingTilBruker = error ? error.message : undefined;

    return (
        <div>
            <UnsafeCombobox
                label="Yrkestittel som vises på stillingen"
                value={input === 'Stilling uten valgt jobbtittel' ? '' : input}
                options={suggestions ? suggestions.map((f) => f.label) : []}
                onChange={onChange}
                onToggleSelected={onToggleSelected}
                isLoading={isLoading}
                error={yrkestittelError || feilmeldingTilBruker}
                className={css.typeahead}
                aria-labelledby="endre-stilling-styrk"
            />
        </div>
    );
};

export default Janzz;
