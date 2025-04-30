import { BodyShort, Chips, Detail } from '@navikt/ds-react';
import { Geografi } from 'felles/domene/stilling/Stilling';
import React from 'react';
import { connect } from 'react-redux';
import Typeahead from '../../../common/typeahead/Typeahead';
import { State } from '../../../redux/store';
import {
    ADD_LOCATION_AREA,
    REMOVE_COUNTRY,
    REMOVE_COUNTY,
    REMOVE_MUNICIPAL,
} from '../../adDataReducer';
import { VALIDATE_LOCATION_AREA, ValidertFelt } from '../../adValidationReducer';
import css from './Arbeidssted.module.css';
import capitalizeLocation from './capitalizeLocation';
import { FETCH_LOCATION_AREA_BEGIN, SET_LOCATION_AREA_TYPEAHEAD } from './locationAreaReducer.js';

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
    municipalsCountiesCache: any;
};

class LocationArea extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchLocationArea();
    }

    onLocationAreaSelect = (suggestion: any) => {
        const {
            municipalsCounties,
            countries,
            addLocationArea,
            validateLocationArea,
            municipalsCountiesCache,
        } = this.props;

        const country = countries.find(
            (c: any) => c.name.toLowerCase() === suggestion.name.toLowerCase()
        );
        const county = municipalsCounties.find(
            (c: any) => !c.countyCode && c.name.toLowerCase() === suggestion.name.toLowerCase()
        );
        const municipal = municipalsCounties.find(
            (m: any) => m.countyCode && m.name.toLowerCase() === suggestion.name.toLowerCase()
        );
        let countyForMunicipal;
        if (municipal && municipal.name === 'OSLO') {
            countyForMunicipal = {
                name: 'OSLO',
            };
        } else if (municipal && municipal.name === 'JAN MAYEN') {
            countyForMunicipal = {
                name: 'JAN MAYEN',
            };
        } else {
            countyForMunicipal = municipalsCountiesCache.find(
                (cm: any) => !cm.countyCode && municipal && cm.code === municipal.countyCode
            );
        }

        if (municipal) {
            addLocationArea({
                municipal: municipal.name,
                municipalCode: municipal.code,
                country: 'NORGE',
                county: countyForMunicipal?.name,
            });
        } else if (county) {
            addLocationArea({
                county: county.name,
                country: 'NORGE',
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

    onBlur = (e: unknown) => {
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

    locationIsMunicipal = (location: any) => location && location.municipal && !location.postalCode;

    locationIsCountry = (location: any) =>
        location &&
        location.country &&
        !location.postalCode &&
        !location.municipal &&
        !location.county;

    locationIsCounty = (location: any) => location && location.county && !location.postalCode;

    render() {
        const { municipalsCounties, countries, typeaheadValue, validation, locationList } =
            this.props;

        const municipalsCountiesSuggestions = municipalsCounties.map((suggestion: any) => ({
            value: suggestion.code,
            name: suggestion.name,
            label: (
                <>
                    <BodyShort>{capitalizeLocation(suggestion.name)}</BodyShort>
                    <Detail>Fylke/kommune</Detail>
                </>
            ),
        }));

        const countrySuggestions = countries.map((country: any) => ({
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
                    autoFocus={!typeaheadValue}
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
                                        onClick={() =>
                                            location.municipal
                                                ? this.onRemoveMunicipal(location.municipal)
                                                : null
                                        }
                                    >
                                        {capitalizeLocation(location.municipal)}
                                    </Chips.Removable>
                                );
                            } else if (this.locationIsCounty(location)) {
                                return (
                                    <Chips.Removable
                                        key={location.county}
                                        onClick={() =>
                                            location.county
                                                ? this.onRemoveCounty(location.county)
                                                : null
                                        }
                                    >
                                        {capitalizeLocation(location.county)}
                                    </Chips.Removable>
                                );
                            } else if (this.locationIsCountry(location)) {
                                return (
                                    <Chips.Removable
                                        key={location.country}
                                        onClick={() =>
                                            location.country
                                                ? this.onRemoveCountry(location.country)
                                                : null
                                        }
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
    municipalsCountiesCache: state.locationArea.municipalsCountiesCache,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchLocationArea: () => dispatch({ type: FETCH_LOCATION_AREA_BEGIN }),
    setTypeAheadValue: (value: unknown) => dispatch({ type: SET_LOCATION_AREA_TYPEAHEAD, value }),
    addLocationArea: (location: unknown) => dispatch({ type: ADD_LOCATION_AREA, location }),
    removeMunicipal: (value: unknown) => dispatch({ type: REMOVE_MUNICIPAL, value }),
    removeCountry: (value: unknown) => dispatch({ type: REMOVE_COUNTRY, value }),
    removeCounty: (value: unknown) => dispatch({ type: REMOVE_COUNTY, value }),
    validateLocationArea: () => dispatch({ type: VALIDATE_LOCATION_AREA }),
});

// @ts-ignore TODO: written before strict-mode enabled
export default connect(mapStateToProps, mapDispatchToProps)(LocationArea);
