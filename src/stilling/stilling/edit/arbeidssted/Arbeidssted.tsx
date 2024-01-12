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

export interface IArbeidssted {
    suggestions: Array<{
        kode: string;
        navn: string;
        postalCode: string;
        city?: string;
    }>;
    virksomhetLokasjon?: Geografi;
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
}

const Arbeidssted: React.FC<IArbeidssted> = ({
    suggestions,
    typeAheadValue,
    validation,
    locationList,
    virksomhetLokasjon,
    fetchLocations,
    removePostalCodeAddress,
    addPostalCodeAddress,
    setPostalCodeTypeAheadValue,
    removePostalCode,
    addPostalCode,
    removeLocationAreas,
}) => {
    const [postCode, setPostCode] = React.useState<boolean>(true);
    const [locationArea, setLocationArea] = React.useState<boolean>();

    React.useEffect(() => {
        fetchLocations();
        setLocationArea(locationListContainsArea(locationList));
    }, [locationList, fetchLocations]);

    const onAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (value === '') {
            removePostalCodeAddress();
        } else {
            addPostalCodeAddress(value);
        }
    };

    const onTypeAheadValueChange = (value: string) => {
        setPostalCodeTypeAheadValue(value);
        if (value === '') {
            removePostalCode();
        }
    };

    const onTypeAheadSuggestionSelected = (location) => {
        if (location) {
            setPostalCodeTypeAheadValue(location.value);
            addPostalCode(location.value);
        }
    };

    const onBlur = (code: string) => {
        if (code !== '') {
            onTypeAheadSuggestionSelected({ value: code });
        }
    };

    const onPostCodeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            removePostalCode();
            removePostalCodeAddress();
        }

        setPostCode(e.target.checked);
    };

    const onLocationAreaChecked = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            removeLocationAreas();
        }

        setLocationArea(e.target.checked);
    };

    const locationListContainsArea = (locationList: Array<Geografi>) =>
        locationList &&
        locationList.some(
            (location) =>
                (location.country || location.municipal || location.county) && !location.postalCode
        );

    const førsteAdresse = locationList[0]?.address;

    return (
        <>
            <Checkbox checked={postCode} onChange={onPostCodeChecked}>
                Adresse
            </Checkbox>
            {postCode && (
                <div className={css.spacing}>
                    <TextField
                        label="Gateadresse"
                        value={førsteAdresse ?? virksomhetLokasjon?.address ?? undefined}
                        onChange={onAddressChange}
                    />
                    <Typeahead
                        label="Postnummer"
                        className={css.postkode}
                        onSelect={onTypeAheadSuggestionSelected}
                        onChange={onTypeAheadValueChange}
                        onBlur={onBlur}
                        suggestions={suggestions.map((loc) => ({
                            value: loc.postalCode,
                            label: `${loc.postalCode} ${capitalizeLocation(loc.city)}`,
                        }))}
                        value={
                            typeAheadValue
                                ? typeAheadValue
                                : virksomhetLokasjon?.postalCode ?? undefined
                        }
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
                                : virksomhetLokasjon?.city ?? undefined
                        }
                    />
                </div>
            )}
            <Checkbox checked={locationArea === true} onChange={onLocationAreaChecked}>
                Kommuner, fylker eller land
            </Checkbox>
            {locationArea && <LocationArea />}
            {validation.location && <ErrorMessage>{validation.location}</ErrorMessage>}
        </>
    );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Arbeidssted);
