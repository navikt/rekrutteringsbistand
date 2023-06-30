import PropTypes from 'prop-types';
import classNames from 'classnames';
import css from './RichTextEditor.module.css';

const UndoRedoButtons = ({ onRedoClick, redoDisabled, onUndoClick, undoDisabled }) => (
    <div className={css.controls}>
        <button
            className={classNames(css.controlButton, {
                [css.disabledButton]: undoDisabled,
            })}
            onClick={onUndoClick}
            disabled={undoDisabled}
            aria-label="Undo"
        >
            <div className={classNames(css.iconUndo, css.icon)} />
        </button>
        <button
            className={classNames(css.controlButton, {
                [css.disabledButton]: redoDisabled,
            })}
            onClick={onRedoClick}
            disabled={redoDisabled}
            aria-label="Redo"
        >
            <div className={classNames(css.iconRedo, css.icon)} />
        </button>
    </div>
);

UndoRedoButtons.propTypes = {
    onRedoClick: PropTypes.func.isRequired,
    onUndoClick: PropTypes.func.isRequired,
    redoDisabled: PropTypes.bool.isRequired,
    undoDisabled: PropTypes.bool.isRequired,
};

export default UndoRedoButtons;
