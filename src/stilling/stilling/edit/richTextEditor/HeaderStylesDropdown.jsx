import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@navikt/ds-react';

export default class HeaderStylesDropdown extends React.Component {
    onSelect = (e) => {
        this.props.onToggle(e.target.value);
    };

    render() {
        const headers = [
            { label: 'Normal', style: 'unstyled' },
            { label: 'H1', style: 'header-one' },
            { label: 'H2', style: 'header-two' },
            { label: 'H3', style: 'header-three' },
            { label: 'H4', style: 'header-four' },
            { label: 'H5', style: 'header-five' },
            { label: 'H6', style: 'header-six' },
        ];

        const selection = this.props.editorState.getSelection();
        const blockType = this.props.editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();
        return (
            <Select
                hideLabel
                size="small"
                label="Velg overskriftsnivå"
                value={blockType}
                onChange={this.onSelect}
            >
                {headers.map(({ label, style }) => (
                    <option key={style} value={style}>
                        {label}
                    </option>
                ))}
            </Select>
        );
    }
}

HeaderStylesDropdown.propTypes = {
    onToggle: PropTypes.func.isRequired,
    editorState: PropTypes.shape({
        getSelection: PropTypes.func,
        getCurrentContent: PropTypes.func,
    }).isRequired,
};
