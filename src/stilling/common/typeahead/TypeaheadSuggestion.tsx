import classNames from 'classnames';
import { Suggestion } from './Typeahead';
import css from './Typeahead.module.css';

type Props = {
    id: string;
    onClick: (suggestion: Suggestion) => void;
    suggestion: Suggestion;
    active: boolean;
    index: number;
    avoidBlur: () => void;
    highlightSuggestion: (index: number) => void;
};

const TypeaheadSuggestion = ({
    id,
    onClick,
    suggestion,
    active,
    index,
    highlightSuggestion,
    avoidBlur,
}: Props) => {
    const handleClick = () => {
        onClick(suggestion);
    };

    const handleHighlightSuggestion = () => {
        highlightSuggestion(index);
    };

    return (
        <li
            id={hentSuggestionId(id, index)}
            role="option"
            aria-selected={active}
            onClick={handleClick}
            onMouseOver={handleHighlightSuggestion}
            onFocus={avoidBlur}
            onMouseDown={avoidBlur}
            onKeyDown={avoidBlur}
        >
            <span
                className={classNames(css.typetext, {
                    [css.aktivtForslag]: active,
                })}
            >
                {suggestion.label}
            </span>
        </li>
    );
};

export const hentSuggestionId = (id: string, index: number) => `${id}-suggestion-${index}`;

export default TypeaheadSuggestion;
