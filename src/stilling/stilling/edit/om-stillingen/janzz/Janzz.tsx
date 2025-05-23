import { UNSAFE_Combobox as UnsafeCombobox } from '@navikt/ds-react';
import React, { FunctionComponent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHentJanzzYrker } from '../../../../../api/stillings-api/hentJanzzyrker';
import { State } from '../../../../redux/store';
import { SET_EMPLOYMENT_JOBTITLE, SET_JANZZ } from '../../../adDataReducer';
import capitalizeEmployerName from '../../endre-arbeidsgiver/capitalizeEmployerName';
import Skjemalabel from '../../skjemaetikett/Skjemalabel';
import css from './Janzz.module.css';

type Props = {
    tittel: string;
};

const Janzz: FunctionComponent<Props> = ({ tittel }) => {
    const dispatch = useDispatch();
    const yrkestittelError = useSelector((state: State) => state.adValidation.errors.yrkestittel);

    const [input, setInput] = useState<string>(tittel);
    const [hasValidSelection, setHasValidSelection] = useState<boolean>(true);

    // Må håndtere at onChange blir kalt når en onToggleSelection blir valgt i comboboxen
    const optionSelectedRef = useRef<boolean>(false);

    const { data: suggestions, isLoading, error } = useHentJanzzYrker(input);

    const filteredSuggestions = suggestions
        ? suggestions
              .filter((f) => f.styrk08 && f.styrk08.trim() !== '' && f.styrk08 !== '9999')
              .map((f) => f.label)
        : [];

    const onChange = (event: React.ChangeEvent<HTMLInputElement> | null, value?: string) => {
        const newValue = event?.target.value || value || '';
        setInput(newValue);

        if (optionSelectedRef.current) {
            optionSelectedRef.current = false;
        } else {
            setHasValidSelection(false);
        }
    };

    interface KategoriType {
        id: number | null;
        code: string | null;
        categoryType: string | null;
        name: string | null;
        description: string | null;
        parentId: string | null;
    }

    const onToggleSelected = (option: string, isSelected: boolean, isCustomOption: boolean) => {
        if (isSelected) {
            const found = suggestions?.find(
                (forslag) => forslag.label.toLowerCase() === option.toLowerCase()
            );
            if (found) {
                dispatch({ type: SET_EMPLOYMENT_JOBTITLE, jobtitle: found.label });
                const kategori: KategoriType[] = [
                    {
                        id: found.konseptId,
                        code: found.konseptId.toString(),
                        categoryType: 'JANZZ',
                        name: found.label,
                        description: null,
                        parentId: null,
                    },
                ];

                if (found?.esco) {
                    kategori.push({
                        id: null,
                        code: found?.esco ?? null,
                        categoryType: 'ESCO',
                        name: found?.escoLabel ?? null,
                        description: null,
                        parentId: null,
                    });
                }
                if (found?.styrk08) {
                    kategori.push({
                        id: null,
                        code: found?.styrk08 ?? null,
                        categoryType: 'STYRK08',
                        name: found?.styrk08Label ?? null,
                        description: null,
                        parentId: null,
                    });
                }

                dispatch({ type: SET_JANZZ, kategori });
                setInput(capitalizeEmployerName(found.label) || '');
                setHasValidSelection(true);
                optionSelectedRef.current = true;
            }
        } else {
            setHasValidSelection(false);
            dispatch({ type: SET_JANZZ, kategori: undefined });
        }
    };

    const onBlur = () => {
        if (!hasValidSelection) {
            dispatch({ type: SET_JANZZ, kategori: undefined });
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
                options={filteredSuggestions}
                onChange={onChange}
                onToggleSelected={onToggleSelected}
                onBlur={onBlur}
                isLoading={isLoading}
                error={!hasValidSelection ? yrkestittelError || feilmeldingTilBruker : undefined}
                className={css.typeahead}
                aria-labelledby="endre-stilling-styrk"
                filteredOptions={filteredSuggestions}
            />
        </div>
    );
};

export default Janzz;
