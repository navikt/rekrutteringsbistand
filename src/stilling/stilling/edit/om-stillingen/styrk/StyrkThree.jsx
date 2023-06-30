import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { SET_STYRK } from '../../../adDataReducer';
import { COLLAPSE_STYRK_BRANCH, EXPAND_STYRK_BRANCH, TOGGLE_STYRK_MODAL } from './styrkReducer';
import { SET_EMPLOYMENT_JOBTITLE } from '../../../adDataReducer';
import StyrkThreeItem from './StyrkThreeItem';
import css from './StyrkThree.module.css';

class StyrkThree extends React.Component {
    onClick = (item) => {
        if (item.children) {
            if (item.expanded) {
                this.props.collapseStyrkBranch(item.code);
            } else {
                this.props.expandStyrkBranch(item.code);
            }
        } else {
            this.props.setStyrk(item.code);
            this.props.setJobTitle(item.name);
            this.props.toggleStyrkModal();
        }
    };

    render() {
        return (
            <div className={css.tree}>
                {this.props.styrkThree.map((item) => (
                    <StyrkThreeItem key={item.id} item={item} onClick={this.onClick} />
                ))}
            </div>
        );
    }
}

StyrkThree.propTypes = {
    setStyrk: PropTypes.func.isRequired,
    expandStyrkBranch: PropTypes.func.isRequired,
    collapseStyrkBranch: PropTypes.func.isRequired,
    toggleStyrkModal: PropTypes.func.isRequired,
    styrkThree: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
        })
    ).isRequired,
    setJobTitle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    styrkThree: state.styrk.styrkThree,
});

const mapDispatchToProps = (dispatch) => ({
    expandStyrkBranch: (code) => dispatch({ type: EXPAND_STYRK_BRANCH, code }),
    collapseStyrkBranch: (code) => dispatch({ type: COLLAPSE_STYRK_BRANCH, code }),
    setStyrk: (code) => dispatch({ type: SET_STYRK, code }),
    toggleStyrkModal: () => dispatch({ type: TOGGLE_STYRK_MODAL }),
    setJobTitle: (jobtitle) => dispatch({ type: SET_EMPLOYMENT_JOBTITLE, jobtitle }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyrkThree);
