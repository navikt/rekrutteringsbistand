// @ts-ignore TODO: written before strict-mode enabled
import deepEqual from 'deep-equal';
import { put, select, takeLatest } from 'redux-saga/effects';
import { hentRekrutteringsbistandstilling, kopierStilling, postStilling } from '../api/api';
import { getReportee } from '../reportee/reporteeReducer';
import {
    SET_NAV_IDENT_STILLINGSINFO,
    SET_STILLINGSINFO_DATA,
} from '../stillingsinfo/stillingsinfoDataReducer';
import { OPPRETT_STILLINGSINFO, UPDATE_STILLINGSINFO } from '../stillingsinfo/stillingsinfoReducer';
import {
    CHECK_TAG,
    REMOVE_AD_DATA,
    SET_ADMIN_STATUS,
    SET_AD_DATA,
    SET_AD_STATUS,
    SET_FIRST_PUBLISHED,
    SET_NAV_IDENT,
    SET_REPORTEE,
    SET_UPDATED_BY,
    SET_EXPIRATION_DATE,
} from './adDataReducer';
import {
    hasValidationErrors,
    hasValidationErrorsOnSave,
    validateAll,
    validateBeforeSave,
} from './adValidationReducer';
import { KanInkludere } from './edit/registrer-inkluderingsmuligheter/DirektemeldtStilling';
import { tagsInneholderInkluderingsmuligheter } from './tags/utils';

import { sendEvent } from 'felles/amplitude';
import { api } from 'felles/api';
import Stilling, {
    AdminStatus,
    Kilde,
    Privacy,
    Rekrutteringsbistandstilling,
    Status,
    System,
} from 'felles/domene/stilling/Stilling';
import { Nettstatus } from 'felles/nettressurs';
import { ApiError, fetchDelete, fetchPut } from '../api/apiUtils';
import { VarslingAction, VarslingActionType } from '../common/varsling/varslingReducer';
import { State } from '../redux/store';
import { formatISOString } from '../utils/datoUtils';

export const FETCH_AD = 'FETCH_AD';
export const FETCH_AD_BEGIN = 'FETCH_AD_BEGIN';
export const FETCH_AD_SUCCESS = 'FETCH_AD_SUCCESS';
export const FETCH_AD_FAILURE = 'FETCH_AD_FAILURE';

export const SAVE_AD = 'SAVE_AD';
export const SAVE_AD_BEGIN = 'SAVE_AD_BEGIN';
export const SAVE_AD_SUCCESS = 'SAVE_AD_SUCCESS';
export const SAVE_AD_FAILURE = 'SAVE_AD_FAILURE';

export const CREATE_AD = 'CREATE_AD';
export const CREATE_AD_BEGIN = 'CREATE_AD_BEGIN';
export const CREATE_AD_SUCCESS = 'CREATE_AD_SUCCESS';
export const CREATE_AD_FAILURE = 'CREATE_AD_FAILURE';

export const DELETE_AD_BEGIN = 'DELETE_AD_BEGIN';
export const DELETE_AD_SUCCESS = 'DELETE_AD_SUCCESS';
export const DELETE_AD_FAILURE = 'DELETE_AD_FAILURE';
export const FORKAST_NY_STILLING = 'FORKAST_NY_STILLING';
export const FORKAST_NY_STILLING_SUCCESS = 'FORKAST_NY_STILLING_SUCCESS';
export const FORKAST_NY_STILLING_FAILURE = 'FORKAST_NY_STILLING_FAILURE';

export const SHOW_DELETE_AD_MODAL = 'SHOW_DELETE_AD_MODAL';
export const HIDE_DELETE_AD_MODAL = 'HIDE_DELETE_AD_MODAL';

export const EDIT_AD = 'EDIT_AD';
export const PREVIEW_EDIT_AD = 'PREVIEW_EDIT_AD';

export const PUBLISH_AD = 'PUBLISH_AD';
export const PUBLISH_AD_CHANGES = 'PUBLISH_AD_CHANGES';
export const SHOW_PUBLISH_ERROR_MODAL = 'SHOW_PUBLISH_ERROR_MODAL';
export const HIDE_PUBLISH_ERROR_MODAL = 'HIDE_PUBLISH_ERROR_MODAL';

export const STOP_AD = 'STOP_AD';
export const STOP_AD_FROM_MY_ADS = 'STOP_AD_FROM_MY_ADS';

export const DELETE_AD = 'DELETE_AD';
export const SHOW_DELETE_MODAL = 'SHOW_DELETE_MODAL';

export const SHOW_STOP_AD_MODAL = 'SHOW_STOP_AD_MODAL';
export const HIDE_STOP_AD_MODAL = 'HIDE_STOP_AD_MODAL';

export const COPY_AD_FROM_MY_ADS = 'COPY_AD_FROM_MY_ADS';

export const SHOW_AD_PUBLISHED_MODAL = 'SHOW_AD_PUBLISHED_MODAL';
export const HIDE_AD_PUBLISHED_MODAL = 'HIDE_AD_PUBLISHED_MODAL';

export const SHOW_AD_SAVED_ERROR_MODAL = 'SHOW_AD_SAVED_ERROR_MODAL';
export const HIDE_AD_SAVED_ERROR_MODAL = 'HIDE_AD_SAVED_ERROR_MODAL';

export const SHOW_STOP_MODAL_MY_ADS = 'SHOW_STOP_MODAL_MY_ADS';

export const ADD_COPIED_ADS = 'ADD_COPIED_ADS';
export const CLEAR_COPIED_ADS = 'CLEAR_COPIED_ADS';

export const LEGG_TIL_I_MINE_STILLINGER = 'LEGG_TIL_I_MINE_STILLINGER';
export const MARKER_EKSTERN_STILLING_SOM_MIN = 'MARKER_EKSTERN_STILLING_SOM_MIN';
export const MARKER_INTERN_STILLING_SOM_MIN = 'MARKER_INTERN_STILLING_SOM_MIN';

export const SET_KAN_INKLUDERE = 'SET_KAN_INKLUDERE';

export const FJERN_NETTVERKSERROR_FRA_STATE = 'FJERN_NETTVERKSERROR_FRA_STATE';

export enum NyStillingState {
    SkalBeholdes = 'skalBeholdes',
    Forkastes = 'forkastes',
    ErForkastet = 'erforkastet',
    Feil = Nettstatus.Feil,
}

export type AdState = {
    error: any;
    isSavingAd: boolean;
    isLoadingAd: boolean;
    isEditingAd: boolean;
    originalData?: Stilling;
    hasSavedChanges: boolean;
    hasChanges: boolean;
    copiedAds: any[];
    showPublishErrorModal: boolean;
    showStopAdModal: boolean;
    showDeleteAdModal: boolean;
    showAdPublishedModal: boolean;
    showAdSavedErrorModal: boolean;
    kanInkludere: KanInkludere;
    nyStillingState: NyStillingState;
    hasDeletedAd?: boolean;
};

const initialState: AdState = {
    error: undefined,
    isSavingAd: false,
    isLoadingAd: false,
    isEditingAd: false,
    originalData: undefined,
    hasSavedChanges: false,
    hasChanges: false,
    copiedAds: [],
    showPublishErrorModal: false,
    showStopAdModal: false,
    showDeleteAdModal: false,
    showAdPublishedModal: false,
    showAdSavedErrorModal: false,
    kanInkludere: KanInkludere.Ja,
    nyStillingState: NyStillingState.SkalBeholdes,
};

export default function adReducer(state = initialState, action: any) {
    switch (action.type) {
        case REMOVE_AD_DATA:
            return {
                ...initialState,
            };
        case FETCH_AD_BEGIN:
            return {
                ...state,
                hasSavedChanges: false,
                isLoadingAd: true,
                error: undefined,
                originalData: undefined,
                hasChanges: false,
            };
        case FETCH_AD_SUCCESS:
            return {
                ...state,
                isLoadingAd: false,
                isEditingAd: false,
                originalData: { ...action.response },
                kanInkludere: kanInkludere(action.response.properties.tags),
            };
        case FETCH_AD_FAILURE:
            return {
                ...state,
                error: action.error,
                isLoadingAd: false,
            };
        case SAVE_AD_BEGIN:
            return {
                ...state,
                isSavingAd: true,
                hasSavedChanges: false,
                hasChanges: false,
            };
        case CREATE_AD_BEGIN:
        case DELETE_AD_BEGIN:
            return {
                ...state,
                isLoadingAd: true,
                isSavingAd: true,
                hasSavedChanges: false,
                hasChanges: false,
                hasDeletedAd: false,
            };
        case DELETE_AD_SUCCESS:
            return {
                ...state,
                isSavingAd: false,
                isLoadingAd: false,
                hasDeletedAd: true,
            };
        case FORKAST_NY_STILLING:
            return {
                ...state,
                nyStillingState: NyStillingState.Forkastes,
            };
        case FORKAST_NY_STILLING_SUCCESS:
            return {
                ...state,
                nyStillingState: NyStillingState.ErForkastet,
            };
        case FORKAST_NY_STILLING_FAILURE:
            return {
                ...state,
                nyStillingState: NyStillingState.Feil,
            };
        case CREATE_AD_SUCCESS:
            return {
                ...state,
                isSavingAd: false,
                isLoadingAd: false,
                hasSavedChanges: true,
                isEditingAd: true,
                originalData: { ...action.response },
                hasChanges: true,
            };
        case SAVE_AD_SUCCESS:
            return {
                ...state,
                isSavingAd: false,
                hasSavedChanges: true,
                originalData: { ...action.response },
            };
        case CREATE_AD_FAILURE:
        case SAVE_AD_FAILURE:
        case DELETE_AD_FAILURE:
            return {
                ...state,
                isSavingAd: false,
                isLoadingAd: false,
                error: action.error,
                showPublishErrorModal: false,
                showStopAdModal: false,
                showDeleteAdModal: false,
                showAdPublishedModal: false,
                showAdSavedErrorModal: false,
            };
        case EDIT_AD:
            return {
                ...state,
                isEditingAd: true,
                hasChanges: true,
            };
        case PREVIEW_EDIT_AD:
            return {
                ...state,
                isEditingAd: false,
            };
        case SHOW_PUBLISH_ERROR_MODAL:
            return {
                ...state,
                showPublishErrorModal: true,
            };
        case HIDE_PUBLISH_ERROR_MODAL:
            return {
                ...state,
                showPublishErrorModal: false,
            };
        case SHOW_STOP_AD_MODAL:
            return {
                ...state,
                showStopAdModal: true,
            };
        case HIDE_STOP_AD_MODAL:
            return {
                ...state,
                showStopAdModal: false,
            };
        case SHOW_DELETE_AD_MODAL:
            return {
                ...state,
                showDeleteAdModal: true,
            };
        case HIDE_DELETE_AD_MODAL:
            return {
                ...state,
                showDeleteAdModal: false,
            };
        case SHOW_AD_PUBLISHED_MODAL:
            return {
                ...state,
                showAdPublishedModal: true,
            };
        case HIDE_AD_PUBLISHED_MODAL:
            return {
                ...state,
                showAdPublishedModal: false,
            };
        case SHOW_AD_SAVED_ERROR_MODAL:
            return {
                ...state,
                showAdSavedErrorModal: true,
            };
        case HIDE_AD_SAVED_ERROR_MODAL:
            return {
                ...state,
                showAdSavedErrorModal: false,
            };
        case ADD_COPIED_ADS:
            return {
                ...state,
                copiedAds: [...state.copiedAds, action.adUuid],
            };
        case CLEAR_COPIED_ADS:
            return {
                ...state,
                copiedAds: [],
            };
        case SET_KAN_INKLUDERE:
            return {
                ...state,
                kanInkludere: action.kanInkludere,
            };
        case CHECK_TAG:
            return {
                ...state,
                kanInkludere: KanInkludere.Ja,
            };
        case FJERN_NETTVERKSERROR_FRA_STATE:
            return {
                ...state,
                error: undefined,
            };

        default:
            return state;
    }
}

function kanInkludere(tags: string | null) {
    if (tags == null) return null;
    return tagsInneholderInkluderingsmuligheter(tags) ? KanInkludere.Ja : KanInkludere.Nei;
}

function* getRekrutteringsbistandstilling(action: any): Generator<unknown, any, any> {
    yield put({ type: FETCH_AD_BEGIN });
    try {
        const response = yield hentRekrutteringsbistandstilling(action.uuid);
        yield put({ type: FETCH_AD_SUCCESS, response: response.stilling });
        const stillingsinfo = response.stillingsinfo || {
            eierNavident: undefined,
            eierNavn: undefined,
            stillingsid: response.stilling.uuid,
        };

        yield put({
            type: SET_STILLINGSINFO_DATA,
            data: stillingsinfo,
        });
        if (action.edit) {
            yield put({ type: EDIT_AD });
        }
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_AD_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* showStopModalMyAds(action: any): Generator<unknown, any, any> {
    yield getRekrutteringsbistandstilling(action);
    yield put({ type: SHOW_STOP_AD_MODAL });
}

function needClassify(originalAdData: any, adData: any) {
    return !deepEqual(originalAdData.categoryList, adData.categoryList);
}

function* createAd(action: any): Generator<unknown, any, any> {
    yield put({ type: CREATE_AD_BEGIN });

    try {
        const reportee = yield getReportee();

        const stillingDto = {
            createdBy: System.Rekrutteringsbistand,
            updatedBy: System.Rekrutteringsbistand,
            source: Kilde.Intern,
            privacy: Privacy.Intern,
            administration: {
                status: AdminStatus.Pending,
                reportee: reportee.displayName,
                navIdent: reportee.navIdent,
            },
            employer: action.arbeidsgiver,
        };

        const response: Rekrutteringsbistandstilling = yield postStilling(
            stillingDto as Stilling,
            action.kategori
        );

        sendEvent('stilling', 'opprett', {
            stillingskategori: response.stillingsinfo?.stillingskategori,
        });

        yield put({ type: SET_AD_DATA, data: response.stilling });
        yield put({ type: SET_REPORTEE, reportee: reportee.displayName });
        yield put({ type: SET_NAV_IDENT, navIdent: reportee.navIdent });
        yield put({ type: CREATE_AD_SUCCESS, response: response.stilling });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: CREATE_AD_FAILURE, error: e });
        }
        throw e;
    }
}

function* saveRekrutteringsbistandStilling(): Generator<unknown, any, any> {
    let state = yield select();
    yield put({ type: SAVE_AD_BEGIN });
    try {
        yield put({ type: SET_UPDATED_BY });

        state = yield select();

        // Modified category list requires store/PUT with (re)classification
        let putUrl = `${api.stilling}/rekrutteringsbistandstilling`;
        if (
            typeof state.ad.originalData === 'undefined' ||
            needClassify(state.ad.originalData, state.adData)
        ) {
            putUrl += '?classify=true';
        }

        const data = {
            stilling: state.adData,
            stillingsinfoid: state.stillingsinfoData
                ? state.stillingsinfoData.stillingsinfoid
                : undefined,
        };

        const response = yield fetchPut(putUrl, data);

        yield put({ type: SAVE_AD_SUCCESS, response: response.stilling });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: SAVE_AD_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* publishAd(): Generator<unknown, any, any> {
    yield validateAll();
    const state: State = yield select();
    if (hasValidationErrors(state.adValidation.errors)) {
        yield put({ type: SHOW_PUBLISH_ERROR_MODAL });
    } else {
        yield put({ type: SET_ADMIN_STATUS, status: AdminStatus.Done });
        yield put({ type: SET_AD_STATUS, status: Status.Aktiv });
        if (state.adData?.firstPublished === false) {
            yield put({ type: SET_FIRST_PUBLISHED });
        }
        yield put({ type: SHOW_AD_PUBLISHED_MODAL });
        yield saveRekrutteringsbistandStilling();
    }
}

function* stopAd() {
    yield put({ type: SET_ADMIN_STATUS, status: AdminStatus.Done });
    yield put({ type: SET_AD_STATUS, status: Status.Stoppet });
    yield put({ type: SET_EXPIRATION_DATE, expires: formatISOString(new Date().toString()) });
    yield saveRekrutteringsbistandStilling();
}

function* saveAd(action: any) {
    yield validateBeforeSave();
    const state: State = yield select();

    if (hasValidationErrorsOnSave(state.adValidation.errors)) {
        yield put({ type: SHOW_AD_SAVED_ERROR_MODAL });
    } else {
        yield saveRekrutteringsbistandStilling();

        if (state.error !== undefined && action.showModal) {
            yield put<VarslingAction>({
                type: VarslingActionType.VisVarsling,
                innhold: 'Stillingen er lagret, og vil snart være synlig i mine stillinger.',
            });
        }
    }
}

function* publishAdChanges(): Generator<unknown, any, any> {
    yield validateAll();
    let state: State = yield select();

    if (hasValidationErrors(state.adValidation.errors)) {
        yield put({ type: SHOW_PUBLISH_ERROR_MODAL });
    } else {
        yield put({ type: SET_ADMIN_STATUS, status: AdminStatus.Done });
        yield put({ type: SET_AD_STATUS, status: Status.Aktiv });
        yield saveRekrutteringsbistandStilling();
        state = yield select();
        if (state.adData?.activationOnPublishingDate && state.adData?.status === Status.Inaktiv) {
            yield put<VarslingAction>({
                type: VarslingActionType.VisVarsling,
                innhold: `Endringene blir publisert ${formatISOString(state.adData?.published)}`,
            });
        } else {
            yield put<VarslingAction>({
                type: VarslingActionType.VisVarsling,
                innhold: `Endringene har blitt publisert, og vil snart være synlig i mine stillinger`,
            });
        }
    }
}

function* deleteAd(): Generator<unknown, any, any> {
    yield put({ type: DELETE_AD_BEGIN });
    try {
        yield put({ type: SET_UPDATED_BY });

        const state: State = yield select();
        const deleteUrl = `${api.stilling}/rekrutteringsbistandstilling/${state.adData?.uuid}`;

        const response = yield fetchDelete(deleteUrl);

        yield put({ type: DELETE_AD_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: DELETE_AD_FAILURE, error: e });
        }
        throw e;
    }
}

function* forkastNyStilling(): Generator<unknown, any, any> {
    try {
        yield put({ type: SET_UPDATED_BY });

        const state = yield select();
        const deleteUrl = `${api.stilling}/rekrutteringsbistandstilling/${state.adData?.uuid}`;

        const response = yield fetchDelete(deleteUrl);
        yield put({ type: FORKAST_NY_STILLING_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FORKAST_NY_STILLING_FAILURE, error: e });
        }
        throw e;
    }
}

function* showDeleteModal(action: any): Generator<unknown, any, any> {
    yield getRekrutteringsbistandstilling(action);
    yield put({ type: SHOW_DELETE_AD_MODAL });
}

function* leggTilIMineStillinger(action: any): Generator<unknown, any, any> {
    const state = yield select();

    const { navIdent, displayName } = state.reportee.data;
    yield put({ type: SET_NAV_IDENT_STILLINGSINFO, navIdent, displayName });
    yield put({ type: OPPRETT_STILLINGSINFO, uuid: action.uuid });
}

function* markerEksternStillingSomMin(action: any): Generator<unknown, any, any> {
    const state = yield select();

    const { navIdent, displayName } = state.reportee.data;
    yield put({ type: SET_NAV_IDENT_STILLINGSINFO, navIdent, displayName });
    yield put({ type: UPDATE_STILLINGSINFO, uuid: action.uuid });
}

function* markerInternStillingSomMin(): Generator<unknown, any, any> {
    const state = yield select();

    const { navIdent, displayName } = state.reportee.data;
    yield put({ type: SET_NAV_IDENT, navIdent });
    yield put({ type: SET_REPORTEE, reportee: displayName });

    yield saveRekrutteringsbistandStilling();
}

function* copyAdFromMyAds(action: any): Generator<unknown, any, any> {
    try {
        const response: Rekrutteringsbistandstilling = yield kopierStilling(action.uuid);

        // Mark copied ad in mineStillinger
        yield put({ type: ADD_COPIED_ADS, adUuid: response.stilling.uuid });
        // Update list with the new ad
        yield put<VarslingAction>({
            type: VarslingActionType.VisVarsling,
            innhold: `Stillingen er kopiert, og vil snart være synlig i listen etter du oppdaterer siden.`,
            varighetMs: 8000,
        });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: CREATE_AD_FAILURE, error: e });
        }
        throw e;
    }
}

export const adSaga = function* saga() {
    yield takeLatest(PUBLISH_AD, publishAd);
    yield takeLatest(STOP_AD, stopAd);
    yield takeLatest(FETCH_AD, getRekrutteringsbistandstilling);
    yield takeLatest(SAVE_AD, saveAd);
    yield takeLatest(CREATE_AD, createAd);
    yield takeLatest(PUBLISH_AD_CHANGES, publishAdChanges);
    yield takeLatest(FORKAST_NY_STILLING, forkastNyStilling);
    yield takeLatest(SHOW_STOP_MODAL_MY_ADS, showStopModalMyAds);
    yield takeLatest(SHOW_DELETE_MODAL, showDeleteModal);
    yield takeLatest(DELETE_AD, deleteAd);
    yield takeLatest(COPY_AD_FROM_MY_ADS, copyAdFromMyAds);
    yield takeLatest(LEGG_TIL_I_MINE_STILLINGER, leggTilIMineStillinger);
    yield takeLatest(MARKER_INTERN_STILLING_SOM_MIN, markerInternStillingSomMin);
    yield takeLatest(MARKER_EKSTERN_STILLING_SOM_MIN, markerEksternStillingSomMin);
};
