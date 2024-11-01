import Stilling, { Privacy, Status, System } from 'felles/domene/stilling/Stilling';
import { put, select, take, takeLatest } from 'redux-saga/effects';
import { isValidISOString } from '../utils/datoUtils';
import {
    CREATE_AD_BEGIN,
    DELETE_AD_SUCCESS,
    FETCH_AD_BEGIN,
    FETCH_AD_SUCCESS,
    SAVE_AD_SUCCESS,
} from './adReducer';
import { FETCH_LOCATIONS, FETCH_LOCATIONS_SUCCESS } from './edit/arbeidssted/locationCodeReducer';
import isJson from './edit/praktiske-opplysninger/IsJson';
import { fjernTagUnderRegistrering, leggTilTagUnderRegistrering } from './tags/utils';

export const SET_AD_DATA = 'SET_AD_DATA';
export const REMOVE_AD_DATA = 'REMOVE_AD_DATA';
export const SET_JANZZ = 'SET_JANZZ';
export const ADD_LOCATION_AREA = 'ADD_LOCATION_AREA';
export const ADD_POSTAL_CODE_BEGIN = 'ADD_POSTAL_CODE_BEGIN';
export const ADD_POSTAL_CODE_ADDRESS_BEGIN = 'ADD_POSTAL_CODE_ADDRESS_BEGIN';
export const ADD_POSTAL_CODE = 'ADD_POSTAL_CODE';
export const REMOVE_MUNICIPAL = 'REMOVE_MUNICIPAL';
export const REMOVE_COUNTRY = 'REMOVE_COUNTRY';
export const REMOVE_COUNTY = 'REMOVE_COUNTY';
export const REMOVE_LOCATION_AREAS = 'REMOVE_LOCATION_AREAS';
export const REMOVE_POSTAL_CODE = 'REMOVE_POSTAL_CODE';
export const REMOVE_POSTAL_CODE_ADDRESS = 'REMOVE_POSTAL_CODE_ADDRESS';
export const SET_EMPLOYMENT_JOBTITLE = 'SET_EMPLOYMENT_JOBTITLE';
export const SET_EMPLOYMENT_LOCATION = 'SET_EMPLOYMENT_LOCATION';
export const SET_EMPLOYMENT_ENGAGEMENTTYPE = 'SET_EMPLOYMENT_ENGAGEMENTTYPE';
export const SET_EMPLOYMENT_EXTENT = 'SET_EMPLOYMENT_EXTENT';
export const SET_EMPLOYMENT_POSITIONCOUNT = 'SET_EMPLOYMENT_POSITIONCOUNT';
export const SET_EMPLOYMENT_SECTOR = 'SET_EMPLOYMENT_SECTOR';
export const CHECK_EMPLOYMENT_WORKDAY = 'CHECK_EMPLOYMENT_WORKDAY';
export const UNCHECK_EMPLOYMENT_WORKDAY = 'UNCHECK_EMPLOYMENT_WORKDAY';
export const CHECK_EMPLOYMENT_WORKHOURS = 'CHECK_EMPLOYMENT_WORKHOURS';
export const UNCHECK_EMPLOYMENT_WORKHOURS = 'UNCHECK_EMPLOYMENT_WORKHOURS';
export const SET_EMPLOYMENT_JOBARRANGEMENT = 'SET_EMPLOYMENT_JOBARRANGEMENT';
export const SET_EMPLOYMENT_STARTTIME = 'SET_EMPLOYMENT_STARTTIME';
export const SET_APPLICATIONDUE = 'SET_APPLICATIONDUE';
export const SET_APPLICATIONEMAIL = 'SET_APPLICATIONEMAIL';
export const SET_APPLICATIONURL = 'SET_APPLICATIONURL';
export const SET_SOURCEURL = 'SET_SOURCEURL';
export const SET_EMPLOYER = 'SET_EMPLOYER';
export const SET_EMPLOYER_NAME = 'SET_EMPLOYER_NAME';
export const SET_EMPLOYER_HOMEPAGE = 'SET_EMPLOYER_HOMEPAGE';
export const SET_EMPLOYERDESCRIPTION = 'SET_EMPLOYERDESCRIPTION';
export const SET_FACEBOOK_PAGE = 'SET_FACEBOOK_PAGE';
export const SET_LINKEDIN_PAGE = 'SET_LINKEDIN_PAGE';
export const SET_TWITTER_ADDRESS = 'SET_TWITTER_ADDRESS';
export const SET_PUBLISHED = 'SET_PUBLISHED';
export const SET_FIRST_PUBLISHED = 'SET_FIRST_PUBLISHED';
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED';
export const SET_MEDIUM = 'SET_MEDIUM';
export const SET_ID = 'SET_ID';
export const SET_REFERENCE = 'SET_REFERENCE';
export const SET_EXPIRATION_DATE = 'SET_EXPIRATION_DATE';
export const SET_AD_TEXT = 'SET_AD_TEXT';
export const SET_AD_STATUS = 'SET_AD_STATUS';
export const SET_ADMIN_STATUS = 'SET_ADMIN_STATUS';
export const SET_REPORTEE = 'SET_REPORTEE';
export const SET_NAV_IDENT = 'SET_NAV_IDENT';
export const SET_UPDATED_BY = 'SET_UPDATED_BY';
export const SET_PRIVACY = 'SET_PRIVACY';
export const CHECK_TAG = 'CHECK_TAG';
export const UNCHECK_TAG = 'UNCHECK_TAG';
export const SET_TAGS = 'SET_TAGS';
export const SET_CONTACT_PERSON = 'SET_CONTACT_PERSON';

export type AdDataState = Stilling | null;

const initialState = {
    properties: {},
    status: Status.Inaktiv,
    administration: {},
    privacy: Privacy.Intern,
};

const adDataReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CREATE_AD_BEGIN:
        case FETCH_AD_BEGIN:
            return initialState;
        case FETCH_AD_SUCCESS:
        case SAVE_AD_SUCCESS:
            return {
                ...action.response,
                locationList: action.response.locationList?.filter(
                    (loc: any) =>
                        loc.postalCode || loc.municipal || loc.county || loc.country !== 'NORGE'
                ), // filtrer vekk object med kun Norge
                location: null,
            };
        case DELETE_AD_SUCCESS:
            return state;
        case SET_AD_DATA:
            return action.data;
    }

    if (state === initialState) {
        return state;
    } else {
        return manipulateAdReducer(state as Stilling, action);
    }
};

const manipulateAdReducer = (state: Stilling, action: any) => {
    switch (action.type) {
        case SET_JANZZ:
            console.log('datareducer SET_JANZZ', action);
            return {
                ...state,
                categoryList: action.kategori,
            };
        case ADD_LOCATION_AREA: {
            const isAlreadyAdded = isLocationInList(action.location, state.locationList);
            if (!action.location || isAlreadyAdded) {
                return state;
            }
            return {
                ...state,
                location: null, // for bakoverkompabilitet
                locationList: state.locationList
                    ? [...state.locationList, action.location]
                    : [action.location],
            };
        }
        case ADD_POSTAL_CODE: {
            // Look for postalCode-location in first index in list. If it exists, replace it
            const current =
                state.locationList &&
                state.locationList.length &&
                (state.locationList[0].postalCode || state.locationList[0].address);

            if (current) {
                // Remove location and insert a new one, in order to trigger re-render
                const newLocation = {
                    ...(state.locationList ? state.locationList[0] : []),
                    ...action.location,
                };
                state.locationList?.shift();

                return {
                    ...state,
                    location: null,
                    locationList: state.locationList
                        ? [newLocation, ...state.locationList]
                        : [newLocation],
                };
            }
            // Else, insert postalCode at first index
            return {
                ...state,
                location: null, // for bakoverkompabilitet
                locationList: state.locationList
                    ? [action.location, ...state.locationList]
                    : [action.location],
            };
        }
        case REMOVE_MUNICIPAL:
            return {
                ...state,
                location: null,
                locationList: (state.locationList || []).filter(
                    (loc) => loc.postalCode || loc.municipal !== action.value
                ),
            };
        case REMOVE_COUNTY:
            return {
                ...state,
                location: null,
                locationList: (state.locationList || []).filter(
                    (loc) => loc.postalCode || loc.municipal || loc.county !== action.value
                ),
            };
        case REMOVE_COUNTRY:
            return {
                ...state,
                location: null,
                locationList: (state.locationList || []).filter(
                    (loc) =>
                        loc.postalCode ||
                        loc.municipal ||
                        loc.county ||
                        loc.country !== action.value
                ),
            };
        case REMOVE_LOCATION_AREAS: {
            return {
                ...state,
                location: null,
                locationList: [],
            };
        }
        case REMOVE_POSTAL_CODE: {
            // Look for address in first index in list. If it exists, keep it
            const current =
                state.locationList && state.locationList.length && state.locationList[0].address;
            if (current) {
                const newLocation = {
                    address: state.locationList && state.locationList[0].address,
                };
                // Remove location and insert a new one without address, in order to trigger re-render
                state.locationList.shift();
                return {
                    ...state,
                    location: null,
                    locationList: state.locationList
                        ? [newLocation, ...state.locationList]
                        : [newLocation],
                };
            }
            // Else, remove object
            return {
                ...state,
                location: null,
                locationList: state.locationList.filter((loc) => !loc.postalCode),
            };
        }
        case REMOVE_POSTAL_CODE_ADDRESS: {
            // Look for postalCode in first index in list. If it exists, remove address only
            const current =
                state.locationList && state.locationList.length && state.locationList[0].postalCode;
            if (current) {
                const newLocation = {
                    ...state.locationList[0],
                    address: null,
                };
                // Remove first location and insert a new one without address, in order to trigger re-render
                state.locationList?.shift();

                return {
                    ...state,
                    location: null,
                    locationList: state.locationList
                        ? [newLocation, ...state.locationList]
                        : [newLocation],
                };
            }
            // Else, remove object
            return {
                ...state,
                location: null,
                locationList: state.locationList.filter((loc) => !loc.address),
            };
        }
        case SET_EMPLOYMENT_JOBTITLE:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    jobtitle: action.jobtitle,
                },
            };
        case SET_EMPLOYMENT_LOCATION:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    location: action.location,
                },
            };
        case SET_EMPLOYMENT_ENGAGEMENTTYPE:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    engagementtype: action.engagementType,
                },
            };
        case SET_EMPLOYMENT_EXTENT:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    extent: action.extent,
                },
            };
        case SET_EMPLOYMENT_POSITIONCOUNT:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    positioncount: action.positioncount,
                },
            };
        case SET_EMPLOYMENT_SECTOR:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    sector: action.sector,
                },
            };
        case CHECK_EMPLOYMENT_WORKDAY:
            // eslint-disable-next-line no-case-declarations
            const { workday } = state.properties;

            return {
                ...state,
                properties: {
                    ...state.properties,
                    workday: workday
                        ? JSON.stringify([
                              ...(isJson(workday) ? JSON.parse(workday) : ''),
                              action.value,
                          ])
                        : JSON.stringify([action.value]),
                },
            };
        case UNCHECK_EMPLOYMENT_WORKDAY:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    workday: JSON.stringify(
                        JSON.parse(state.properties.workday ?? '[]').filter(
                            (m: any) => m !== action.value
                        )
                    ),
                },
            };
        case CHECK_EMPLOYMENT_WORKHOURS:
            // eslint-disable-next-line no-case-declarations
            const { workhours } = state.properties;

            return {
                ...state,
                properties: {
                    ...state.properties,
                    workhours: workhours
                        ? JSON.stringify([
                              ...(isJson(workhours) ? JSON.parse(workhours) : ''),
                              action.value,
                          ])
                        : JSON.stringify([action.value]),
                },
            };
        case UNCHECK_EMPLOYMENT_WORKHOURS:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    workhours: JSON.stringify(
                        JSON.parse(state.properties.workhours ?? '[]').filter(
                            (m: any) => m !== action.value
                        )
                    ),
                },
            };
        case SET_EMPLOYMENT_JOBARRANGEMENT:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    jobarrangement: action.jobarrangement,
                },
            };
        case SET_EMPLOYMENT_STARTTIME:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    starttime: action.starttime,
                },
            };
        case SET_APPLICATIONDUE:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    applicationdue: action.applicationdue,
                },
                expires:
                    isValidISOString(action.applicationdue) &&
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    state.expires! < action.applicationdue
                        ? action.applicationdue
                        : state.expires,
            };
        case SET_APPLICATIONEMAIL:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    applicationemail: action.applicationemail,
                },
            };
        case SET_APPLICATIONURL:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    applicationurl: action.applicationurl,
                },
            };
        case SET_SOURCEURL:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    sourceurl: action.sourceurl,
                },
            };
        case SET_EMPLOYER:
            if (action.employer) {
                return {
                    ...state,
                    employer: {
                        ...state.employer,
                        name: action.employer.name,
                        orgnr: action.employer.orgnr,
                        location: action.employer.location,
                    },
                };
            }
            return {
                ...state,
                employer: null,
            };
        case SET_EMPLOYERDESCRIPTION:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    employerdescription: action.employerdescription,
                },
            };
        case SET_EMPLOYER_NAME:
            return {
                ...state,
                businessName: action.employername,
            };
        case SET_EMPLOYER_HOMEPAGE:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    employerhomepage: action.employerhomepage,
                },
            };
        case SET_FACEBOOK_PAGE:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    facebookpage: action.facebookpage,
                },
            };
        case SET_LINKEDIN_PAGE:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    linkedinpage: action.linkedinpage,
                },
            };
        case SET_TWITTER_ADDRESS:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    twitteraddress: action.twitteraddress,
                },
            };
        case SET_LAST_UPDATED:
            return {
                ...state,
                updated: action.updated,
            };
        case SET_PUBLISHED:
            return {
                ...state,
                published: action.published,
            };
        case SET_FIRST_PUBLISHED:
            return {
                ...state,
                firstPublished: true,
            };
        case SET_MEDIUM:
            return {
                ...state,
                medium: action.medium,
            };
        case SET_ID:
            return {
                ...state,
                id: action.id,
            };
        case SET_REFERENCE:
            return {
                ...state,
                reference: action.reference,
            };
        case SET_EXPIRATION_DATE:
            return {
                ...state,
                expires: action.expires,
            };
        case SET_AD_TEXT:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    adtext: action.adtext,
                },
            };
        case SET_AD_STATUS:
            return {
                ...state,
                status: action.status,
            };
        case SET_ADMIN_STATUS:
            return {
                ...state,
                administration: {
                    ...state.administration,
                    status: action.status,
                },
            };
        case SET_REPORTEE:
            return {
                ...state,
                administration: {
                    ...state.administration,
                    reportee: action.reportee,
                },
            };
        case SET_NAV_IDENT:
            return {
                ...state,
                administration: {
                    ...state.administration,
                    navIdent: action.navIdent,
                },
            };
        case SET_UPDATED_BY:
            return {
                ...state,
                updatedBy: System.Rekrutteringsbistand,
            };
        case SET_PRIVACY:
            return {
                ...state,
                privacy: action.privacy,
            };
        case CHECK_TAG: {
            const tags = leggTilTagUnderRegistrering(
                isJson(state.properties.tags) ? JSON.parse(state.properties.tags || '') : [],
                action.value
            );

            return {
                ...state,
                properties: {
                    ...state.properties,
                    tags: JSON.stringify(tags),
                },
            };
        }
        case UNCHECK_TAG:
            // eslint-disable-next-line no-case-declarations
            const tags = fjernTagUnderRegistrering(
                JSON.parse(state.properties.tags || ''),
                action.value
            );

            return {
                ...state,
                properties: {
                    ...state.properties,
                    tags: JSON.stringify(tags),
                },
            };
        case SET_TAGS:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    tags: action.tags,
                },
            };

        case SET_CONTACT_PERSON:
            return {
                ...state,
                contactList: [
                    {
                        ...(state.contactList ? state.contactList[0] : []),
                        ...action.contactPerson,
                    },
                ],
            };
        case REMOVE_AD_DATA:
            return initialState;
        default:
            return state;
    }
};

export function* findLocationByPostalCode(value: any): Generator<unknown, any, any> {
    let state = yield select();
    if (!state.locationCode.locations) {
        yield put({ type: FETCH_LOCATIONS });
        yield take(FETCH_LOCATIONS_SUCCESS);
        state = yield select();
    }
    if (state.locationCode.locations) {
        return state.locationCode.locations.find((location: any) => location.postalCode === value);
    }
    return undefined;
}

function isLocationInList(location: any, locationList: any) {
    let isAlreadyAdded = false;
    if (location.country) {
        isAlreadyAdded =
            locationList &&
            locationList.find(
                (item: any) =>
                    item.country === location.country &&
                    !item.postalCode &&
                    !item.municipal &&
                    !item.county
            );
    } else if (location.county) {
        isAlreadyAdded =
            locationList &&
            locationList.find(
                (item: any) =>
                    item.county === location.county && !item.postalCode && !item.municipal
            );
    } else if (location.municipal) {
        isAlreadyAdded =
            locationList &&
            locationList.find(
                (item: any) => item.municipal === location.municipal && !item.postalCode
            );
    }
    return isAlreadyAdded;
}

function* addLocationPostalCode(action: any): Generator<unknown, any, any> {
    const location = yield findLocationByPostalCode(action.postalCode);
    if (location !== undefined) {
        yield put({
            type: ADD_POSTAL_CODE,
            location: {
                city: location.city,
                county: location.county.name,
                municipal: location.municipality.name,
                municipalCode: location.municipality.code,
                postalCode: location.postalCode,
            },
        });
    } else {
        yield put({
            type: REMOVE_POSTAL_CODE,
        });
    }
}

function* setLocationAddress(action: any): Generator<unknown, any, any> {
    yield put({
        type: ADD_POSTAL_CODE,
        location: {
            address: action.address,
        },
    });
}

export const adDataSaga = function* saga() {
    yield takeLatest(ADD_POSTAL_CODE_BEGIN, addLocationPostalCode);
    yield takeLatest(ADD_POSTAL_CODE_ADDRESS_BEGIN, setLocationAddress);
};

export default adDataReducer;
