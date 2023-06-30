import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import css from './RichTextEditor.module.css';

export default class StyleButton extends React.Component {
    onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
    };

    render() {
        return (
            <button
                className={classNames(css.controlButton, {
                    [css.activeButton]: this.props.active,
                })}
                onMouseDown={this.onToggle}
                aria-label={this.props.style}
            >
                <div className={classNames(this.props.label, css.icon)} />
            </button>
        );
    }
}

StyleButton.propTypes = {
    onToggle: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
};
