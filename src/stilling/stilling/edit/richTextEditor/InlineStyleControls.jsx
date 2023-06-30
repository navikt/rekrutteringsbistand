import PropTypes from 'prop-types';
import StyleButton from './StyleButton';
import css from './RichTextEditor.module.css';

const InlineStyleControls = ({ editorState, onToggle }) => {
    const INLINE_STYLES = [
        { label: css.iconBold, style: 'BOLD' },
        { label: css.iconItalic, style: 'ITALIC' },
        { label: css.iconUnderline, style: 'UNDERLINE' },
        { label: css.iconCode, style: 'CODE' },
    ];
    const currentStyle = editorState.getCurrentInlineStyle();
    return (
        <div className={css.controls}>
            {INLINE_STYLES.map((type) => (
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

InlineStyleControls.propTypes = {
    editorState: PropTypes.shape({
        getCurrentInlineStyle: PropTypes.func,
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default InlineStyleControls;
