import { tagsInneholderInkluderingsmuligheter } from './tags/utils';
import { put, select, takeLatest } from 'redux-saga/effects';
import { isValidISOString, idagMidnatt } from '../utils/datoUtils';
import { DEFAULT_TITLE_NEW_AD, SET_KAN_INKLUDERE } from './adReducer';
import isJson from './edit/praktiske-opplysninger/IsJson';
import {
    SET_STYRK,
    ADD_POSTAL_CODE,
    ADD_POSTAL_CODE_BEGIN,
    REMOVE_POSTAL_CODE,
    ADD_LOCATION_AREA,
    REMOVE_COUNTRY,
    REMOVE_MUNICIPAL,
    REMOVE_COUNTY,
    SET_EXPIRATION_DATE,
    SET_PUBLISHED,
    SET_AD_TEXT,
    SET_AD_TITLE,
    SET_APPLICATIONDUE,
    SET_EMPLOYMENT_ENGAGEMENTTYPE,
    SET_EMPLOYMENT_POSITIONCOUNT,
    SET_EMPLOYMENT_EXTENT,
    SET_EMPLOYMENT_SECTOR,
    CHECK_EMPLOYMENT_WORKDAY,
    UNCHECK_EMPLOYMENT_WORKDAY,
    CHECK_EMPLOYMENT_WORKHOURS,
    UNCHECK_EMPLOYMENT_WORKHOURS,
    findLocationByPostalCode,
    REMOVE_LOCATION_AREAS,
    CHECK_TAG,
    UNCHECK_TAG,
    SET_EMPLOYMENT_STARTTIME,
} from './adDataReducer';
import { SET_NOTAT } from '../stillingsinfo/stillingsinfoDataReducer';
import { State } from '../redux/store';
import { KanInkludere } from './edit/registrer-inkluderingsmuligheter/DirektemeldtStilling';

export type ValidertFelt =
    | 'location'
    | 'postalCode'
    | 'locationArea'
    | 'styrk'
    | 'title'
    | 'adText'
    | 'expires'
    | 'published'
    | 'applicationEmail'
    | 'contactPersonName'
    | 'contactPersonTitle'
    | 'contactPersonEmailOrPhone'
    | 'contactPersonEmail'
    | 'contactPersonPhone'
    | 'notat'
    | 'applicationdue'
    | 'starttime'
    | 'engagementtype'
    | 'positioncount'
    | 'extent'
    | 'sector'
    | 'workday'
    | 'workhours'
    | 'inkluderingsmuligheter';

const ADD_VALIDATION_ERROR = 'ADD_VALIDATION_ERROR';
const REMOVE_VALIDATION_ERROR = 'REMOVE_VALIDATION_ERROR';

export const VALIDATE_ALL = 'VALIDATE_ALL';
export const VALIDATE_APPLICATION_EMAIL = 'VALIDATE_APPLICATION_EMAIL';
export const VALIDATE_CONTACTPERSON_EMAIL_AND_PHONE = 'VALIDATE_CONTACTPERSON_EMAIL_AND_PHONE';
export const VALIDATE_CONTACTPERSON_NAME = 'VALIDATE_CONTACTPERSON_NAME';
export const VALIDATE_CONTACTPERSON_TITLE = 'VALIDATE_CONTACTPERSON_TITLE';
export const VALIDATE_LOCATION_AREA = 'VALIDATE_LOCATION_AREA';
export const RESET_VALIDATION_ERROR = 'RESET_VALIDATION_ERROR';

export const MAX_LENGTH_NOTAT = 500;

const valueIsNotSet = (value) => value === undefined || value === null || value.length === 0;

function* addValidationError({ field, message }: { field: ValidertFelt; message: string }) {
    yield put({
        type: ADD_VALIDATION_ERROR,
        field,
        message,
    });
}

function* removeValidationError({ field }: { field: ValidertFelt }) {
    yield put({
        type: REMOVE_VALIDATION_ERROR,
        field,
    });
}

function* validateLocation() {
    const state = yield select();
    const { locationList } = state.adData;

    if (valueIsNotSet(locationList)) {
        yield addValidationError({
            field: 'location',
            message: 'Arbeidssted mangler',
        });
    } else {
        yield removeValidationError({ field: 'location' });
    }
}

function* validatePostalCode() {
    const state = yield select();
    const { typeAheadValue } = state.locationCode;
    if (typeAheadValue && typeAheadValue.match('^[0-9]{4}$')) {
        const locationByPostalCode = yield findLocationByPostalCode(typeAheadValue);
        if (locationByPostalCode === undefined) {
            yield addValidationError({
                field: 'postalCode',
                message: 'Ukjent postnummer',
            });
        } else {
            yield removeValidationError({ field: 'postalCode' });
        }
    } else if (typeAheadValue && !typeAheadValue.match('^[0-9]{4}$')) {
        yield addValidationError({
            field: 'postalCode',
            message: 'Ugyldig postnummer',
        });
    } else {
        yield removeValidationError({ field: 'postalCode' });
    }
}

function* validateLocationArea() {
    const state = yield select();
    const { typeaheadValue } = state.locationArea;

    if (typeaheadValue) {
        yield addValidationError({
            field: 'locationArea',
            message: 'Må være kommune, fylke eller land utenfor Norge',
        });
    } else {
        yield removeValidationError({ field: 'locationArea' });
    }
}

export function* validateStyrk() {
    const state = yield select();
    const { categoryList } = state.adData;

    if (valueIsNotSet(categoryList)) {
        yield addValidationError({ field: 'styrk', message: 'STYRK mangler' });
    } else {
        yield removeValidationError({ field: 'styrk' });
    }
}

export function* validateTitle() {
    const adTitle = yield select((state) => state.adData?.title);
    if (valueIsNotSet(adTitle) || adTitle === DEFAULT_TITLE_NEW_AD) {
        yield addValidationError({
            field: 'title',
            message: 'Overskrift på stillingen mangler',
        });
    } else {
        yield removeValidationError({ field: 'title' });
    }
}

function* validateAdtext() {
    const adText = yield select((state) => state.adData?.properties.adtext);
    if (valueIsNotSet(adText)) {
        yield addValidationError({
            field: 'adText',
            message: 'Stillingstekst mangler',
        });
    } else {
        yield removeValidationError({ field: 'adText' });
    }
}

function* validateExpireDate() {
    const state = yield select();
    const { expires } = state.adData;
    if (valueIsNotSet(expires)) {
        yield addValidationError({
            field: 'expires',
            message: 'Siste visningsdato mangler',
        });
    } else if (!isValidISOString(expires)) {
        yield addValidationError({
            field: 'expires',
            message: 'Siste visningsdato er ugyldig',
        });
    } else if (erSattFørIdag(expires)) {
        yield addValidationError({
            field: 'expires',
            message: 'Siste visningsdato kan ikke være før dagens dato',
        });
    } else {
        yield removeValidationError({ field: 'expires' });
    }
}

const erSattFørIdag = (datoString: string): boolean => {
    return new Date(datoString) <= idagMidnatt();
};

function* validatePublishDate() {
    const state = yield select();
    const { published } = state.adData;

    if (valueIsNotSet(published)) {
        yield addValidationError({
            field: 'published',
            message: 'Publiseringsdato mangler',
        });
    } else if (!isValidISOString(published)) {
        yield addValidationError({
            field: 'published',
            message: 'Publiseringsdato er ugyldig',
        });
    } else if (erSattFørIdag(published)) {
        yield addValidationError({
            field: 'published',
            message: 'Publiseringsdato kan ikke være før dagens dato',
        });
    } else {
        yield removeValidationError({ field: 'published' });
    }
}

function* validateApplicationEmail() {
    const email = yield select((state) => state.adData?.properties.applicationemail);

    // E-postadressen må inneholde en '@' for å være gyldig
    const error = email && email.length > 0 && email.indexOf('@') === -1;

    if (error) {
        yield addValidationError({
            field: 'applicationEmail',
            message: 'E-postadressen er ugyldig. Den må minimum inneholde en «@»',
        });
    } else {
        yield removeValidationError({ field: 'applicationEmail' });
    }
}

function* validateContactPersonName() {
    const contactperson = yield select((state) => state.adData?.contactList[0]);

    const error =
        contactperson === undefined || contactperson === null || valueIsNotSet(contactperson.name);

    if (error) {
        yield addValidationError({
            field: 'contactPersonName',
            message: 'Du må oppgi navn på kontaktperson',
        });
    } else {
        yield removeValidationError({ field: 'contactPersonName' });
    }
}

function* validateContactPersonTitle() {
    const contactperson = yield select((state) => state.adData?.contactList[0]);

    const error =
        contactperson === undefined || contactperson === null || valueIsNotSet(contactperson.title);

    if (error) {
        yield addValidationError({
            field: 'contactPersonTitle',
            message: 'Du må oppgi tittel på kontaktperson',
        });
    } else {
        yield removeValidationError({ field: 'contactPersonTitle' });
    }
}

function* validateContactPersonEmailOrPhoneRequired() {
    const contactperson = yield select((state) => state.adData?.contactList[0]);

    const error =
        !contactperson ||
        (valueIsNotSet(contactperson.email) && valueIsNotSet(contactperson.phone));

    if (error) {
        yield addValidationError({
            field: 'contactPersonEmailOrPhone',
            message: 'Du må oppgi e-postadresse eller telefonnummer',
        });
    } else {
        yield removeValidationError({ field: 'contactPersonEmailOrPhone' });
    }
}

function* validateContactpersonEmailAndPhone() {
    yield validateContactPersonEmailOrPhoneRequired();
    yield validateContactPersonEmail();
    yield validateContactPersonPhone();
}

function* validateContactPersonEmail() {
    const contactperson = yield select((state) => state.adData?.contactList[0]);

    const manglerAlfakrøll =
        contactperson &&
        contactperson.email &&
        contactperson.email.length > 0 &&
        !contactperson.email.includes('@');

    if (manglerAlfakrøll) {
        yield addValidationError({
            field: 'contactPersonEmail',
            message: 'E-postadressen er ugyldig. Den må minimum inneholde en «@»',
        });
    } else {
        yield removeValidationError({ field: 'contactPersonEmail' });
    }
}

function* validateContactPersonPhone() {
    const contactperson = yield select((state) => state.adData?.contactList[0]);

    const error =
        contactperson &&
        contactperson.phone &&
        contactperson.phone.length > 0 &&
        !contactperson.phone.match(/^(\(?\+?[0-9]*\)?)?[0-9_\- ()]*$/);

    if (error) {
        yield addValidationError({
            field: 'contactPersonPhone',
            message: 'Ugyldig telefonnummer',
        });
    } else {
        yield removeValidationError({ field: 'contactPersonPhone' });
    }
}

export function* validateNotat() {
    const notat = yield select((state) => state.stillingsinfoData.notat);

    if (notat && notat.length > MAX_LENGTH_NOTAT) {
        yield addValidationError({
            field: 'notat',
            message: 'Kommentaren inneholder for mange tegn',
        });
    } else {
        yield removeValidationError({ field: 'notat' });
    }
}

function* validateApplicationdueDate() {
    const state = yield select();
    const { applicationdue } = state.adData?.properties;

    if (valueIsNotSet(applicationdue)) {
        yield addValidationError({
            field: 'applicationdue',
            message: 'Søknadsfrist mangler',
        });
    } else if (!isValidISOString(applicationdue) && applicationdue !== 'Snarest') {
        yield addValidationError({
            field: 'applicationdue',
            message: 'Søknadsfrist er ugyldig',
        });
    } else {
        yield removeValidationError({ field: 'applicationdue' });
    }
}

function* validateEmploymentStartTime() {
    const state = yield select();
    const { starttime } = state.adData?.properties;

    const erGyldig =
        starttime === undefined || starttime === 'Etter avtale' || isValidISOString(starttime);

    if (erGyldig) {
        yield removeValidationError({ field: 'starttime' });
    } else {
        yield addValidationError({
            field: 'starttime',
            message: 'Oppstartstidspunkt er ugyldig',
        });
    }
}

function* validateEngagementType() {
    const state = yield select();
    const { engagementtype } = state.adData?.properties;

    if (valueIsNotSet(engagementtype)) {
        yield addValidationError({
            field: 'engagementtype',
            message: 'Ansettelsesform mangler',
        });
    } else {
        yield removeValidationError({ field: 'engagementtype' });
    }
}

function* validatePositionCount() {
    const state: State = yield select();
    const positioncount = state.adData?.properties.positioncount;

    const error = positioncount && !positioncount.match(/^[1-9]\d*$/);

    if (valueIsNotSet(positioncount) || error) {
        yield addValidationError({
            field: 'positioncount',
            message: 'Antall stillinger mangler',
        });
    } else {
        yield removeValidationError({ field: 'positioncount' });
    }
}

function* validateExtent() {
    const state = yield select();
    const { extent } = state.adData?.properties;

    if (valueIsNotSet(extent)) {
        yield addValidationError({ field: 'extent', message: 'Omfang mangler' });
    } else {
        yield removeValidationError({ field: 'extent' });
    }
}

function* validateSector() {
    const state = yield select();
    const { sector } = state.adData?.properties;

    if (valueIsNotSet(sector)) {
        yield addValidationError({ field: 'sector', message: 'Sektor mangler' });
    } else {
        yield removeValidationError({ field: 'sector' });
    }
}

function* validateWorkday() {
    const state = yield select();
    const { workday } = state.adData?.properties;

    if (valueIsNotSet(workday) || !isJson(workday) || valueIsNotSet(JSON.parse(workday))) {
        yield addValidationError({
            field: 'workday',
            message: 'Arbeidsdager mangler',
        });
    } else {
        yield removeValidationError({ field: 'workday' });
    }
}

function* validateWorkhours() {
    const state: State = yield select();
    const workhours = state.adData?.properties.workhours;

    if (valueIsNotSet(workhours) || !isJson(workhours) || valueIsNotSet(JSON.parse(workhours!))) {
        yield addValidationError({
            field: 'workhours',
            message: 'Arbeidstid mangler',
        });
    } else {
        yield removeValidationError({ field: 'workhours' });
    }
}

function* validateInkluderingsmuligheter() {
    const state: State = yield select();
    const { kanInkludere } = state.ad;
    const tags = state.adData?.properties.tags;

    if (kanInkludere === KanInkludere.Nei || tagsInneholderInkluderingsmuligheter(tags)) {
        yield removeValidationError({ field: 'inkluderingsmuligheter' });
    } else {
        yield addValidationError({
            field: 'inkluderingsmuligheter',
            message:
                'Mulighet for inkludering mangler – velg én eller flere inkluderingsmuligheter eller oppgi at arbeidsgiver ikke kan inkludere',
        });
    }
}

export function* validateAll() {
    const state = yield select();
    if (state.adData !== null) {
        yield validateLocation();
        yield validateExpireDate();
        yield validatePublishDate();
        yield validateTitle();
        yield validateStyrk();
        yield validateAdtext();
        yield validateApplicationEmail();
        yield validatePostalCode();
        yield validateNotat();
        yield validateApplicationdueDate();
        yield validateEngagementType();
        yield validatePositionCount();
        yield validateExtent();
        yield validateSector();
        yield validateWorkday();
        yield validateWorkhours();
        yield validateInkluderingsmuligheter();
        yield validateContactPersonName();
        yield validateContactPersonTitle();
        yield validateContactPersonEmailOrPhoneRequired();
    }
}

export function hasValidationErrors(validation: Record<ValidertFelt, string | undefined>) {
    return (
        validation.styrk !== undefined ||
        validation.location !== undefined ||
        validation.expires !== undefined ||
        validation.title !== undefined ||
        validation.adText !== undefined ||
        validation.applicationEmail !== undefined ||
        validation.contactPersonEmail !== undefined ||
        validation.contactPersonEmailOrPhone !== undefined ||
        validation.contactPersonPhone !== undefined ||
        validation.contactPersonTitle !== undefined ||
        validation.published !== undefined ||
        validation.postalCode !== undefined ||
        validation.notat !== undefined ||
        validation.applicationdue !== undefined ||
        validation.engagementtype !== undefined ||
        validation.positioncount !== undefined ||
        validation.extent !== undefined ||
        validation.sector !== undefined ||
        validation.workday !== undefined ||
        validation.workhours !== undefined ||
        validation.inkluderingsmuligheter !== undefined
    );
}

export function* validateBeforeSave() {
    const state = yield select();
    if (state.adData !== null) {
        yield validateTitle();
        yield validateStyrk();
        yield validateApplicationEmail();
        yield validateContactpersonEmailAndPhone();
        yield validateNotat();
        yield validatePostalCode();
    }
}

export function hasValidationErrorsOnSave(validation: Record<ValidertFelt, string | undefined>) {
    return (
        validation.styrk !== undefined ||
        validation.title !== undefined ||
        validation.applicationEmail !== undefined ||
        validation.contactPersonEmail !== undefined ||
        validation.contactPersonPhone !== undefined ||
        validation.postalCode !== undefined ||
        validation.notat !== undefined
    );
}

export type AdValidationState = {
    errors: Record<ValidertFelt, string | undefined>;
};

const initialState = {
    errors: {},
};

export default function adValidationReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_VALIDATION_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.field]: action.message,
                },
            };
        case REMOVE_VALIDATION_ERROR:
            return {
                errors: {
                    ...state.errors,
                    [action.field]: undefined,
                },
            };
        case RESET_VALIDATION_ERROR:
            return initialState;
        default:
            return state;
    }
}

export const validationSaga = function* saga() {
    yield takeLatest(VALIDATE_ALL, validateAll);
    yield takeLatest(SET_STYRK, validateStyrk);
    yield takeLatest(SET_EXPIRATION_DATE, validateExpireDate);
    yield takeLatest(SET_PUBLISHED, validatePublishDate);
    yield takeLatest(ADD_POSTAL_CODE_BEGIN, validatePostalCode);
    yield takeLatest(VALIDATE_LOCATION_AREA, validateLocationArea);
    yield takeLatest(
        [
            ADD_POSTAL_CODE,
            REMOVE_POSTAL_CODE,
            ADD_LOCATION_AREA,
            REMOVE_MUNICIPAL,
            REMOVE_COUNTY,
            REMOVE_COUNTRY,
            REMOVE_LOCATION_AREAS,
        ],
        validateLocation
    );
    yield takeLatest(SET_AD_TEXT, validateAdtext);
    yield takeLatest(SET_AD_TITLE, validateTitle);
    yield takeLatest(VALIDATE_APPLICATION_EMAIL, validateApplicationEmail);
    yield takeLatest(VALIDATE_CONTACTPERSON_EMAIL_AND_PHONE, validateContactpersonEmailAndPhone);
    yield takeLatest(VALIDATE_CONTACTPERSON_NAME, validateContactPersonName);
    yield takeLatest(VALIDATE_CONTACTPERSON_TITLE, validateContactPersonTitle);
    yield takeLatest(SET_NOTAT, validateNotat);
    yield takeLatest(SET_APPLICATIONDUE, validateApplicationdueDate);
    yield takeLatest(SET_EMPLOYMENT_STARTTIME, validateEmploymentStartTime);
    yield takeLatest(SET_EMPLOYMENT_ENGAGEMENTTYPE, validateEngagementType);
    yield takeLatest(SET_EMPLOYMENT_POSITIONCOUNT, validatePositionCount);
    yield takeLatest(SET_EMPLOYMENT_EXTENT, validateExtent);
    yield takeLatest(SET_EMPLOYMENT_SECTOR, validateSector);
    yield takeLatest(CHECK_EMPLOYMENT_WORKDAY, validateWorkday);
    yield takeLatest(UNCHECK_EMPLOYMENT_WORKDAY, validateWorkday);
    yield takeLatest(CHECK_EMPLOYMENT_WORKHOURS, validateWorkhours);
    yield takeLatest(UNCHECK_EMPLOYMENT_WORKHOURS, validateWorkhours);
    yield takeLatest([CHECK_TAG, UNCHECK_TAG, SET_KAN_INKLUDERE], validateInkluderingsmuligheter);
};
