import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { BodyShort, Detail, ErrorMessage, Button } from '@navikt/ds-react';

import { FETCH_STYRK, SET_STYRK_TYPEAHEAD_VALUE, TOGGLE_STYRK_MODAL } from './styrkReducer';
import { SET_EMPLOYMENT_JOBTITLE } from '../../../adDataReducer';
import { SET_STYRK } from '../../../adDataReducer';
import Skjemalabel from '../../skjemaetikett/Skjemalabel';
import StyrkModal from './StyrkModal';
import Typeahead from '../../../../common/typeahead/Typeahead';
import css from './Styrk.module.css';

class Styrk extends React.Component {
    componentDidMount() {
        this.props.fetchStyrk();
    }

    onTypeAheadValueChange = (value) => {
        this.props.setTypeAheadValue(value);
    };

    onTypeAheadBlur = (value) => {
        if (value === '') {
            this.props.setStyrk(value);
        }
    };

    onTypeAheadSuggestionSelected = (suggestion) => {
        if (suggestion) {
            this.props.setStyrk(suggestion.value);
            if (
                this.props.stilling.properties.jobtitle === undefined ||
                this.props.stilling.properties.jobtitle === ''
            ) {
                this.props.setJobTitle(suggestion.name);
            }
        }
    };

    onShowListClick = () => {
        this.props.toggleList();
    };

    render() {
        let value;
        let kategoriSTYRK08NAV = this.props.stilling?.categoryList?.find(
            (kategori) => kategori?.categoryType === 'STYRK08NAV'
        );
        let kategoriSTYRK08 = this.props.stilling?.categoryList?.find(
            (kategori) => kategori?.categoryType === 'STYRK08'
        );

        if (this.props.typeAheadValue !== undefined) {
            value = this.props.typeAheadValue;
        } else if (kategoriSTYRK08NAV) {
            value = `${kategoriSTYRK08NAV.code} ${kategoriSTYRK08NAV.name}`;
        } else if (kategoriSTYRK08) {
            // Dette er for å håndtere periode med registrering av feil STYRK type
            value = `${kategoriSTYRK08.code} ${kategoriSTYRK08.name}`;
        } else {
            value = '';
        }

        const styrkForslag = this.props.typeAheadSuggestions.map((styrk) => ({
            value: styrk.code,
            label: (
                <div className={css.typeaheadValg}>
                    <BodyShort>
                        {styrk.code}: {styrk.name}
                    </BodyShort>
                    {styrk.alternativeNames && styrk.alternativeNames.length > 0 && (
                        <Detail>{styrk.alternativeNames.join(', ')}</Detail>
                    )}
                </div>
            ),
            name: styrk.name,
        }));

        return (
            <div>
                <Skjemalabel
                    påkrevd
                    inputId="endre-stilling-styrk"
                    etterLabel={
                        <Button
                            size="xsmall"
                            variant="tertiary"
                            className={css.velgFraListeKnapp}
                            onClick={this.onShowListClick}
                        >
                            Velg fra liste
                        </Button>
                    }
                >
                    Skriv inn STYRK
                </Skjemalabel>
                <Typeahead
                    value={value}
                    onSelect={this.onTypeAheadSuggestionSelected}
                    onChange={this.onTypeAheadValueChange}
                    onBlur={this.onTypeAheadBlur}
                    suggestions={styrkForslag}
                    error={this.props.validation.styrk !== undefined}
                    className={css.typeahead}
                    aria-labelledby="endre-stilling-styrk"
                />
                {this.props.validation.styrk && (
                    <ErrorMessage>{this.props.validation.styrk}</ErrorMessage>
                )}
                {this.props.showStyrkModal && <StyrkModal />}
            </div>
        );
    }
}

Styrk.defaultProps = {
    typeAheadValue: undefined,
};

Styrk.propTypes = {
    fetchStyrk: PropTypes.func.isRequired,
    setTypeAheadValue: PropTypes.func.isRequired,
    typeAheadValue: PropTypes.string,
    typeAheadSuggestions: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string,
        })
    ).isRequired,
    setStyrk: PropTypes.func.isRequired,
    showStyrkModal: PropTypes.bool.isRequired,
    toggleList: PropTypes.func.isRequired,
    setJobTitle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    typeAheadValue: state.styrk.typeAheadValue,
    typeAheadSuggestions: state.styrk.typeAheadSuggestions,
    addedStyrkItems: state.styrk.addedStyrkItems,
    styrkThree: state.styrk.styrkThree,
    showStyrkModal: state.styrk.showStyrkModal,
    stilling: state.adData,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch) => ({
    fetchStyrk: () => dispatch({ type: FETCH_STYRK }),
    setTypeAheadValue: (value) => dispatch({ type: SET_STYRK_TYPEAHEAD_VALUE, value }),
    setStyrk: (code) => dispatch({ type: SET_STYRK, code }),
    setJobTitle: (jobtitle) => dispatch({ type: SET_EMPLOYMENT_JOBTITLE, jobtitle }),
    toggleList: () => dispatch({ type: TOGGLE_STYRK_MODAL }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Styrk);
