import React from 'react';
import { connect } from 'react-redux';
import { BodyShort, Chips, Detail } from '@navikt/ds-react';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_LOCATION_AREA_BEGIN, SET_LOCATION_AREA_TYPEAHEAD } from './locationAreaReducer.js';
import {
    ADD_LOCATION_AREA,
    REMOVE_COUNTRY,
    REMOVE_COUNTY,
    REMOVE_MUNICIPAL,
} from '../../adDataReducer';
import { VALIDATE_LOCATION_AREA, ValidertFelt } from '../../adValidationReducer';
import capitalizeLocation from './capitalizeLocation';
import { Geografi } from '../../../domene/Stilling';
import { State } from '../../../redux/store';
import css from './Arbeidssted.module.css';

type Props = {
    typeaheadValue: string;
    municipalsCounties: any;
    countries: any;
    fetchLocationArea: () => void;
    addLocationArea: (locationArea: Partial<Geografi>) => void;
    removeMunicipal: (municipal: string) => void;
    removeCountry: (country: string) => void;
    removeCounty: (county: string) => void;
    setTypeAheadValue: (value: string) => void;
    locationList: Geografi[];
    validation: Record<ValidertFelt, string | undefined>;
    validateLocationArea: () => void;
};

class LocationArea extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchLocationArea();
    }

    onLocationAreaSelect = (suggestion) => {
        const { municipalsCounties, countries, addLocationArea, validateLocationArea } = this.props;

        const country = countries.find(
            (c) => c.name.toLowerCase() === suggestion.name.toLowerCase()
        );
        const county = municipalsCounties.find(
            (c) => !c.countyCode && c.name.toLowerCase() === suggestion.name.toLowerCase()
        );
        const municipal = municipalsCounties.find(
            (m) => m.countyCode && m.name.toLowerCase() === suggestion.name.toLowerCase()
        );

        if (municipal) {
            addLocationArea({
                municipal: municipal.name,
                municipalCode: municipal.code,
            });
        } else if (county) {
            addLocationArea({
                county: county.name,
            });
        } else if (country) {
            addLocationArea({
                country: country.name,
            });
        }
        validateLocationArea();
    };

    onLocationAreaChange = (value: string) => {
        if (value !== undefined) {
            this.props.setTypeAheadValue(value);
        }
    };

    onBlur = (e) => {
        this.onLocationAreaSelect({ label: e });
    };

    onRemoveMunicipal = (municipal: string) => {
        this.props.removeMunicipal(municipal);
    };

    onRemoveCountry = (country: string) => {
        this.props.removeCountry(country);
    };

    onRemoveCounty = (county: string) => {
        this.props.removeCounty(county);
    };

    locationIsMunicipal = (location) => location && location.municipal && !location.postalCode;

    locationIsCountry = (location) =>
        location &&
        location.country &&
        !location.postalCode &&
        !location.municipal &&
        !location.county;

    locationIsCounty = (location) => location && location.county && !location.postalCode;

    render() {
        const { municipalsCounties, countries, typeaheadValue, validation, locationList } =
            this.props;

        const municipalsCountiesSuggestions = municipalsCounties.map((suggestion) => ({
            value: suggestion.code,
            name: suggestion.name,
            label: (
                <>
                    <BodyShort>{capitalizeLocation(suggestion.name)}</BodyShort>
                    <Detail>Fylke/kommune</Detail>
                </>
            ),
        }));

        const countrySuggestions = countries.map((country) => ({
            value: country.code,
            name: country.name,
            label: (
                <>
                    <BodyShort>{capitalizeLocation(country.name)}</BodyShort>
                    <Detail>Land</Detail>
                </>
            ),
        }));

        const allSuggestions = municipalsCountiesSuggestions.concat(countrySuggestions);

        return (
            <>
                <Typeahead
                    label="Skriv inn kommune, fylke eller land"
                    onChange={this.onLocationAreaChange}
                    onSelect={this.onLocationAreaSelect}
                    onBlur={this.onBlur}
                    suggestions={allSuggestions}
                    value={typeaheadValue}
                    error={validation.locationArea}
                    aria-labelledby="endre-stilling-kommune"
                />
                {locationList && locationList.length > 0 && (
                    <Chips className={css.tags}>
                        {locationList.map((location) => {
                            if (this.locationIsMunicipal(location)) {
                                return (
                                    <Chips.Removable
                                        key={location.municipal}
                                        onClick={() => this.onRemoveMunicipal(location.municipal!)}
                                    >
                                        {capitalizeLocation(location.municipal)}
                                    </Chips.Removable>
                                );
                            } else if (this.locationIsCounty(location)) {
                                return (
                                    <Chips.Removable
                                        key={location.county}
                                        onClick={() => this.onRemoveCounty(location.county!)}
                                    >
                                        {capitalizeLocation(location.county)}
                                    </Chips.Removable>
                                );
                            } else if (this.locationIsCountry(location)) {
                                return (
                                    <Chips.Removable
                                        key={location.country}
                                        onClick={() => this.onRemoveCountry(location.country!)}
                                    >
                                        {capitalizeLocation(location.country)}
                                    </Chips.Removable>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </Chips>
                )}
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    municipalsCounties: state.locationArea.municipalsCounties,
    countries: state.locationArea.countries,
    typeaheadValue: state.locationArea.typeaheadValue,
    locationList: state.adData?.locationList,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchLocationArea: () => dispatch({ type: FETCH_LOCATION_AREA_BEGIN }),
    setTypeAheadValue: (value) => dispatch({ type: SET_LOCATION_AREA_TYPEAHEAD, value }),
    addLocationArea: (location) => dispatch({ type: ADD_LOCATION_AREA, location }),
    removeMunicipal: (value) => dispatch({ type: REMOVE_MUNICIPAL, value }),
    removeCountry: (value) => dispatch({ type: REMOVE_COUNTRY, value }),
    removeCounty: (value) => dispatch({ type: REMOVE_COUNTY, value }),
    validateLocationArea: () => dispatch({ type: VALIDATE_LOCATION_AREA }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationArea);
