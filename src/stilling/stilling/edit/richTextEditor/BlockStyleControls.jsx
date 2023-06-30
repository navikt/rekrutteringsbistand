import PropTypes from 'prop-types';
import StyleButton from './StyleButton';
import css from './RichTextEditor.module.css';

const BlockStyleControls = ({ editorState, onToggle }) => {
    const BLOCK_TYPES = [
        { label: css.iconQuote, style: 'blockquote' },
        { label: css.iconUnorderedlist, style: 'unordered-list-item' },
        { label: css.iconOrderedlist, style: 'ordered-list-item' },
    ];
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className={css.controls}>
            {BLOCK_TYPES.map((type) => (
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

BlockStyleControls.propTypes = {
    editorState: PropTypes.shape({
        getSelection: PropTypes.func,
        getCurrentContent: PropTypes.func,
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default BlockStyleControls;
