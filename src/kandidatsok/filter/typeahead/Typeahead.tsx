import React, { FormEventHandler, FunctionComponent, ReactNode, useId } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Label } from '@navikt/ds-react';
import {
    Combobox,
    ComboboxInput,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
    ComboboxPopover,
} from '@reach/combobox';
import Merkelapp from '../merkelapp/Merkelapp';
import Merkelapper from '../merkelapp/Merkelapper';
import css from './Typeahead.module.css';

const formClassName = css.form + ' navds-form-field';

const inputClassName =
    css.input +
    ' navds-search__input navds-search__input--secondary navds-text-field__input navds-body-short navds-body-medium';

const buttonClassName =
    'navds-search__button-search navds-button navds-button--secondary navds-button--medium navds-button--icon-only';

const optionClassName = 'navds-body-short ' + css.suggestion;

type Props = {
    children?: ReactNode;
    value: string;
    label: string;
    description?: string;
    suggestions: string[];
    suggestionsId?: string;
    selectedSuggestions: string[];
    onRemoveSuggestion: (suggestion: string) => () => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (selection: string) => void;
    allowUnmatchedInputs?: boolean;
};

export const Typeahead: FunctionComponent<Props> = ({
    label,
    value,
    description,
    suggestions,
    suggestionsId,
    selectedSuggestions,
    onRemoveSuggestion,
    onSelect,
    onChange,
    allowUnmatchedInputs = true,
}) => {
    const inputId = useId();
    const descriptionId = useId();

    const onSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        const matchedSuggestion = suggestions.find(
            (suggestion) => value.toLowerCase() === suggestion.toLowerCase()
        );

        if (matchedSuggestion) {
            onSelect(matchedSuggestion);
        } else if (allowUnmatchedInputs) {
            onSelect(uppercaseFirstLetter(value));
        } else if (suggestions.length > 0) {
            onSelect(suggestions[0]);
        }
    };

    const suggestionsWithoutSelected = suggestions.filter(
        (suggestion) => !selectedSuggestions.includes(suggestion)
    );

    return (
        <form onSubmit={onSubmit} className={formClassName}>
            <Label htmlFor={inputId} className="navds-form-field__label">
                {label}
            </Label>
            <BodyShort
                size="small"
                as="div"
                id={descriptionId}
                className="navds-form-field__description"
            >
                {description}
            </BodyShort>
            <Combobox className="navds-search__wrapper" onSelect={onSelect}>
                <div className="navds-search__wrapper-inner">
                    <ComboboxInput
                        id={inputId}
                        autoComplete="off"
                        aria-describedby={descriptionId}
                        className={inputClassName}
                        onChange={onChange}
                        value={value}
                    />
                </div>
                <button className={buttonClassName}>
                    <span className="navds-button__icon">
                        <MagnifyingGlassIcon />
                    </span>
                </button>

                {suggestionsWithoutSelected.length > 0 && (
                    <ComboboxPopover id={suggestionsId} className={css.suggestionPopover}>
                        <ComboboxList>
                            {suggestionsWithoutSelected.map((suggestion) => (
                                <ComboboxOption
                                    key={suggestion}
                                    value={suggestion}
                                    className={optionClassName}
                                >
                                    <ComboboxOptionText />
                                </ComboboxOption>
                            ))}
                        </ComboboxList>
                    </ComboboxPopover>
                )}
            </Combobox>

            <Merkelapper>
                {selectedSuggestions.map((suggestion) => (
                    <Merkelapp
                        icon={<XMarkIcon />}
                        key={suggestion}
                        onClick={onRemoveSuggestion(suggestion)}
                    >
                        {suggestion}
                    </Merkelapp>
                ))}
            </Merkelapper>
        </form>
    );
};

const uppercaseFirstLetter = (s: string) => {
    return s.length === 0 ? s : s[0].toUpperCase() + s.slice(1);
};
