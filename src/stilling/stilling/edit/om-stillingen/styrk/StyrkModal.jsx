import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Heading, TextField } from '@navikt/ds-react';

import { RESET_STYRK_THREE, SET_STRYK_SEARCH_STRING, TOGGLE_STYRK_MODAL } from './styrkReducer';
import StyrkThree from './StyrkThree';
import Modal from '../../../../common/modal/Modal';
import css from './StyrkModal.module.css';

class StyrkModal extends React.Component {
    onInputChange = (e) => {
        this.props.setStyrkSearchString(e.target.value);
    };

    onResetStyrkThree = () => {
        this.props.resetStyrkThree();
    };

    render() {
        return (
            <Modal
                open
                className={css.modal}
                onClose={this.props.toggleList}
                aria-label="Søk etter STYRK"
            >
                <div className={css.header}>
                    <Heading spacing level="2" size="medium" className={css.headerTitle}>
                        Velg STYRK
                    </Heading>
                    <div className={css.headerFlex}>
                        <TextField
                            hideLabel
                            className={css.headerSearch}
                            placeholder="Søk (to eller flere tegn)"
                            label="Søk etter STYRK"
                            value={this.props.styrkSearchString}
                            onChange={this.onInputChange}
                        />
                        <Button variant="tertiary" onClick={this.onResetStyrkThree}>
                            Nullstill
                        </Button>
                    </div>
                </div>
                <div className={css.body}>
                    <StyrkThree />
                </div>
            </Modal>
        );
    }
}

StyrkModal.defaultProps = {
    styrkSearchString: '',
};

StyrkModal.propTypes = {
    setStyrkSearchString: PropTypes.func.isRequired,
    resetStyrkThree: PropTypes.func.isRequired,
    styrkSearchString: PropTypes.string,
    toggleList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    styrkSearchString: state.styrk.styrkSearchString,
});

const mapDispatchToProps = (dispatch) => ({
    setStyrkSearchString: (value) => dispatch({ type: SET_STRYK_SEARCH_STRING, value }),
    resetStyrkThree: () => dispatch({ type: RESET_STYRK_THREE }),
    toggleList: () => dispatch({ type: TOGGLE_STYRK_MODAL }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyrkModal);
