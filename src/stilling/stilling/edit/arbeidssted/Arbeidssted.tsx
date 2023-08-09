import { Checkbox, ErrorMessage, TextField } from '@navikt/ds-react';
import { Geografi } from 'felles/domene/stilling/Stilling';
import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import Typeahead from '../../../common/typeahead/Typeahead';
import { State } from '../../../redux/store';
import {
    ADD_POSTAL_CODE_ADDRESS_BEGIN,
    ADD_POSTAL_CODE_BEGIN,
    REMOVE_LOCATION_AREAS,
    REMOVE_POSTAL_CODE,
    REMOVE_POSTAL_CODE_ADDRESS,
} from '../../adDataReducer';
import { ValidertFelt } from '../../adValidationReducer';
import css from './Arbeidssted.module.css';
import LocationArea from './LocationArea';
import capitalizeLocation from './capitalizeLocation';
import { FETCH_LOCATIONS, SET_POSTAL_CODE_TYPEAHEAD_VALUE } from './locationCodeReducer';

type Props = {
    suggestions: Array<{
        kode: string;
        navn: string;
        postalCode: string;
        city?: string;
    }>;
    setPostalCodeTypeAheadValue: (value: string) => void;
    addPostalCode: (value: string) => void;
    validation: Record<ValidertFelt, string | undefined>;
    addPostalCodeAddress: (value: string) => void;
    locationList: Array<Geografi>;
    typeAheadValue: string;
    fetchLocations: () => void;
    removeLocationAreas: () => void;
    removePostalCode: () => void;
    removePostalCodeAddress: () => void;
};

class Location extends React.Component<Props> {
    declare state: {
        postCode: boolean;
        locationArea: boolean;
    };

    constructor(props: Props) {
        super(props);

        const { locationList = [] } = props;
        this.state = {
            postCode: true,
            locationArea: this.locationListContainsArea(locationList),
        };
    }

    componentDidMount() {
        this.props.fetchLocations();
    }

    onAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (value === '') {
            this.props.removePostalCodeAddress();
        } else {
            this.props.addPostalCodeAddress(value);
        }
    };

    onTypeAheadValueChange = (value: string) => {
        this.props.setPostalCodeTypeAheadValue(value);
        if (value === '') {
            this.props.removePostalCode();
        }
    };

    onTypeAheadSuggestionSelected = (location) => {
        if (location) {
            this.props.setPostalCodeTypeAheadValue(location.value);
            this.props.addPostalCode(location.value);
        }
    };

    onBlur = (code: string) => {
        if (code !== '') {
            this.onTypeAheadSuggestionSelected({ value: code });
        }
    };

    onPostCodeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            this.props.removePostalCode();
            this.props.removePostalCodeAddress();
        }

        this.setState({
            ...this.state,
            postCode: e.target.checked,
        });
    };

    onLocationAreaChecked = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            this.props.removeLocationAreas();
        }

        this.setState({
            ...this.state,
            locationArea: e.target.checked,
        });
    };

    locationListContainsArea = (locationList: Array<Geografi>) =>
        locationList &&
        locationList.some(
            (location) =>
                (location.country || location.municipal || location.county) && !location.postalCode
        );

    render() {
        const { suggestions, typeAheadValue, validation, locationList } = this.props;
        const førsteAdresse = locationList[0]?.address;

        return (
            <>
                <Checkbox checked={this.state.postCode} onChange={this.onPostCodeChecked}>
                    Adresse
                </Checkbox>
                {this.state.postCode && (
                    <div className={css.spacing}>
                        <TextField
                            label="Gateadresse"
                            value={førsteAdresse ?? undefined}
                            onChange={this.onAddressChange}
                        />
                        <Typeahead
                            label="Postnummer"
                            className={css.postkode}
                            onSelect={this.onTypeAheadSuggestionSelected}
                            onChange={this.onTypeAheadValueChange}
                            onBlur={this.onBlur}
                            suggestions={suggestions.map((loc) => ({
                                value: loc.postalCode,
                                label: `${loc.postalCode} ${capitalizeLocation(loc.city)}`,
                            }))}
                            value={typeAheadValue}
                            error={validation.postalCode}
                        />
                        <TextField
                            className={css.poststed}
                            label="Poststed"
                            disabled
                            value={
                                locationList &&
                                locationList.length &&
                                locationList[0] &&
                                locationList[0].city
                                    ? locationList[0].city
                                    : ''
                            }
                        />
                    </div>
                )}
                <Checkbox
                    checked={this.state.locationArea === true}
                    onChange={this.onLocationAreaChecked}
                >
                    Kommuner, fylker eller land
                </Checkbox>
                {this.state.locationArea && <LocationArea />}
                {validation.location && <ErrorMessage>{validation.location}</ErrorMessage>}
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    typeAheadValue: state.locationCode.typeAheadValue,
    suggestions: state.locationCode.suggestions,
    locationList: state.adData?.locationList,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch) => ({
    addPostalCodeAddress: (address) => dispatch({ type: ADD_POSTAL_CODE_ADDRESS_BEGIN, address }),
    fetchLocations: () => dispatch({ type: FETCH_LOCATIONS }),
    setPostalCodeTypeAheadValue: (value) =>
        dispatch({ type: SET_POSTAL_CODE_TYPEAHEAD_VALUE, value }),
    addPostalCode: (postalCode) => dispatch({ type: ADD_POSTAL_CODE_BEGIN, postalCode }),
    removePostalCode: () => dispatch({ type: REMOVE_POSTAL_CODE }),
    removePostalCodeAddress: () => dispatch({ type: REMOVE_POSTAL_CODE_ADDRESS }),
    removeLocationAreas: () => dispatch({ type: REMOVE_LOCATION_AREAS }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
