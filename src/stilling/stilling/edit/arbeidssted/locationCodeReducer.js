import { put, takeEvery, select } from 'redux-saga/effects';
import { stillingApi } from '../../../api/api';
import { fetchGet } from '../../../api/apiUtils';
import { ApiError } from '../../../api/apiUtils';
import {
    CREATE_AD_BEGIN,
    FETCH_AD_BEGIN,
    CREATE_AD_SUCCESS,
    SAVE_AD_SUCCESS,
    FETCH_AD_SUCCESS,
} from '../../adReducer';

export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const FETCH_LOCATIONS_BEGIN = 'FETCH_LOCATIONS_BEGIN';
export const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
export const FETCH_LOCATIONS_FAILURE = 'FETCH_LOCATIONS_FAILURE';
export const SET_POSTAL_CODE_TYPEAHEAD_VALUE = 'SET_POSTAL_CODE_TYPEAHEAD_VALUE';

const initialState = {
    suggestions: [],
    locations: undefined,
    hasFetchedLocations: false,
};

export default function locationCodeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LOCATIONS_BEGIN:
            return {
                ...state,
                hasFetchedLocations: true,
            };
        case FETCH_LOCATIONS_SUCCESS:
            return {
                ...state,
                locations: action.locations,
            };
        case FETCH_LOCATIONS_FAILURE:
            return {
                ...state,
                hasFetchedLocations: false,
            };
        case CREATE_AD_BEGIN:
        case FETCH_AD_BEGIN:
            return {
                ...state,
                suggestions: [],
            };
        case CREATE_AD_SUCCESS:
        case SAVE_AD_SUCCESS:
        case FETCH_AD_SUCCESS:
            return {
                ...state,
                typeAheadValue:
                    action.response.locationList &&
                    action.response.locationList.length &&
                    action.response.locationList[0].postalCode
                        ? action.response.locationList[0].postalCode
                        : '',
            };
        case SET_POSTAL_CODE_TYPEAHEAD_VALUE:
            return {
                ...state,
                typeAheadValue: action.value,
                suggestions:
                    state.locations === undefined || action.value.length === 0
                        ? []
                        : state.locations.filter(
                              (location) =>
                                  location.city
                                      .toLowerCase()
                                      .startsWith(action.value.toLowerCase()) ||
                                  location.postalCode.startsWith(action.value)
                          ),
            };
        default:
            return state;
    }
}

export function* fetchLocations() {
    const state = yield select();
    try {
        if (!state.locationCode.hasFetchedLocations) {
            yield put({ type: FETCH_LOCATIONS_BEGIN });
            const response = yield fetchGet(`${stillingApi}/rekrutteringsbistand/api/v1/postdata`);
            const sorted = response.sort((a, b) => {
                if (a.city < b.city) return -1;
                if (a.city > b.city) return 1;
                if (a.postalCode < b.postalCode) return -1;
                if (a.postalCode > b.postalCode) return 1;
                return 0;
            });
            yield put({ type: FETCH_LOCATIONS_SUCCESS, locations: sorted });
        }
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_LOCATIONS_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

export const locationCodeSaga = function* saga() {
    yield takeEvery(FETCH_LOCATIONS, fetchLocations);
};
