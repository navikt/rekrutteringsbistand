import React, { useEffect, useId, useRef, useState } from 'react';
import TypeaheadSuggestion, { hentSuggestionId } from './TypeaheadSuggestion';
import { TextField } from '@navikt/ds-react';
import css from './Typeahead.module.css';
import classNames from 'classnames';

export type Suggestion = {
    label: React.ReactNode;
    value: string;
};

type Props = {
    value: string;
    label?: string;
    onChange: (value: string) => void;
    onSelect: (suggestion: Suggestion) => void;
    onBlur: (value: string) => void;
    placeholder?: string;
    suggestions: Suggestion[];
    error?: string;
    className?: string;
};

const Typeahead = ({
    value,
    label,
    onChange,
    onSelect,
    onBlur,
    placeholder,
    suggestions,
    error,
    className,
}: Props) => {
    const id = useId();

    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const [shouldShowSuggestions, setShouldShowSuggestions] = useState(true);
    const [hasFocus, setHasFocus] = useState(false);
    const shouldBlur = useRef(true);
    const blurDelay = useRef<NodeJS.Timeout>();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (blurDelay.current) {
                clearTimeout(blurDelay.current);
            }
        };
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setActiveSuggestionIndex(-1);
        setShouldShowSuggestions(true);

        onChange(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        let currentActiveSuggestionIndex = activeSuggestionIndex;

        if (shouldShowSuggestions) {
            switch (event.key) {
                case 'Enter': {
                    event.preventDefault();
                    const hasSelectedSuggestion = currentActiveSuggestionIndex > -1;

                    if (hasSelectedSuggestion) {
                        selectSuggestion(suggestions[activeSuggestionIndex]);
                    } else if (suggestions.length === 1) {
                        selectSuggestion(suggestions[0]);
                    }

                    break;
                }

                case 'Escape':
                    if (shouldShowSuggestions) {
                        event.preventDefault();
                        setShouldShowSuggestions(false);
                    }

                    break;

                case 'ArrowUp':
                    event.preventDefault();
                    currentActiveSuggestionIndex =
                        currentActiveSuggestionIndex - 1 === -2
                            ? -1
                            : currentActiveSuggestionIndex - 1;

                    setActiveSuggestionIndex(currentActiveSuggestionIndex);
                    scrollTilSuggestion(currentActiveSuggestionIndex);

                    break;

                case 'ArrowDown':
                    event.preventDefault();
                    currentActiveSuggestionIndex =
                        currentActiveSuggestionIndex + 1 === suggestions.length
                            ? suggestions.length - 1
                            : currentActiveSuggestionIndex + 1;

                    setActiveSuggestionIndex(currentActiveSuggestionIndex);
                    scrollTilSuggestion(currentActiveSuggestionIndex);

                    break;

                default:
                    break;
            }
        }
    };

    const scrollTilSuggestion = (suggestionIndex: number) => {
        const suggestionId = hentSuggestionId(id, suggestionIndex);
        const suggestionElement = document.getElementById(suggestionId);

        if (suggestionElement) {
            suggestionElement.scrollIntoView({ block: 'nearest' });
        }
    };

    const selectSuggestion = (suggestion: Suggestion) => {
        setShouldShowSuggestions(false);
        setActiveSuggestionIndex(-1);

        if (inputRef.current) {
            inputRef.current.focus();
        }

        clearBlurDelay();
        onSelect(suggestion);
    };

    const clearBlurDelay = () => {
        if (blurDelay.current) {
            clearTimeout(blurDelay.current);
            blurDelay.current = undefined;
        }
        shouldBlur.current = true;
    };

    const handleFocus = () => {
        setHasFocus(true);
        setActiveSuggestionIndex(-1);
        clearBlurDelay();
    };

    const handleBlur = () => {
        blurDelay.current = setTimeout(() => {
            if (shouldBlur.current) {
                setHasFocus(false);

                if (onBlur) {
                    onBlur(value);
                }
            }
        }, 10);
    };

    const avoidBlur = () => {
        shouldBlur.current = false;
    };

    const highlightSuggestion = (index: number) => {
        setActiveSuggestionIndex(index);
        clearBlurDelay();
    };

    const resetHighlightingSuggestion = () => {
        setActiveSuggestionIndex(-1);
    };

    const showSuggestions = hasFocus && shouldShowSuggestions && suggestions.length > 0;

    return (
        <div className={classNames(css.typeahead, className)}>
            <TextField
                label={label}
                id={id}
                role="combobox"
                aria-autocomplete="list"
                aria-controls={`${id}-suggestions`}
                aria-owns={`${id}-suggestions`}
                aria-expanded={showSuggestions}
                aria-haspopup={showSuggestions}
                aria-activedescendant={`${id}-item-${activeSuggestionIndex}`}
                placeholder={placeholder}
                value={value}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                ref={inputRef}
                error={error}
            />
            <ul
                id={`${id}-suggestions`}
                role="listbox"
                className={showSuggestions ? '' : css.skjultForslag}
                onMouseLeave={resetHighlightingSuggestion}
            >
                {showSuggestions &&
                    suggestions.map((suggestion, i: number) => {
                        return (
                            <TypeaheadSuggestion
                                id={id}
                                key={suggestion.value}
                                index={i}
                                suggestion={suggestion}
                                active={i === activeSuggestionIndex}
                                onClick={selectSuggestion}
                                highlightSuggestion={highlightSuggestion}
                                avoidBlur={avoidBlur}
                            />
                        );
                    })}
            </ul>
        </div>
    );
};

export default Typeahead;
