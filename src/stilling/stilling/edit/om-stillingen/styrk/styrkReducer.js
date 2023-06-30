import { put, takeLatest, throttle } from 'redux-saga/effects';
import { stillingApi } from '../../../../api/api';
import { ApiError, fetchGet } from '../../../../api/apiUtils';
import { SET_STYRK } from '../../../adDataReducer';

export const SET_STYRK_TYPEAHEAD_VALUE = 'SET_STYRK_TYPEAHEAD_VALUE';
export const FETCH_STYRK = 'FETCH_STYRK';
export const FETCH_STYRK_SUCCESS = 'FETCH_STYRK_SUCCESS';
export const FETCH_STYRK_FAILURE = 'FETCH_STYRK_FAILURE';
export const EXPAND_STYRK_BRANCH = 'EXPAND_STYRK_BRANCH';
export const COLLAPSE_STYRK_BRANCH = 'COLLAPSE_STYRK_BRANCH';
export const TOGGLE_STYRK_MODAL = 'TOGGLE_STYRK_MODAL';
export const SET_STRYK_SEARCH_STRING = 'SET_STRYK_SEARCH_STRING';
export const SET_STRYK_SEARCH_STRING_DONE = 'SET_STRYK_SEARCH_STRING_DONE';
export const RESET_STYRK_THREE = 'RESET_STYRK_THREE';

let originalStyrkThree;
let originalData = [];

function categoryMatchesQuery(category, query) {
    const queryLc = query.toLowerCase();
    return (
        category.name.toLowerCase().indexOf(queryLc) !== -1 ||
        category.alternativeNames.some(
            (altName) => altName.toLowerCase().indexOf(queryLc) !== -1
        ) ||
        category.code.startsWith(query) ||
        category.code.split('.').join('').startsWith(query)
    );
}

function createDefaultStyrkThree(categories, parentId = null) {
    return categories
        .filter((category) => category.parentId === parentId)
        .map((c) => {
            const children = createDefaultStyrkThree(categories, c.id);
            if (children.length > 0) {
                return {
                    ...c,
                    level: c.code.split('.').join().length,
                    expanded: false,
                    visible: true,
                    children,
                };
            }
            return {
                ...c,
                level: c.code.split('.').join().length,
                visible: true,
                expanded: false,
            };
        });
}

function filterStyrkThree(categories, query) {
    return categories.map((category) => {
        if (category.children) {
            const ch = filterStyrkThree(category.children, query);
            const match =
                categoryMatchesQuery(category, query) || ch.filter((c) => c.visible).length;
            return {
                ...category,
                expanded: match,
                visible: match,
                children: ch,
            };
        }
        const match = categoryMatchesQuery(category, query);
        return {
            ...category,
            visible: match,
            alternativeNames: category.alternativeNames.filter(
                (altName) => altName.toLowerCase().indexOf(query.toLowerCase()) !== -1
            ),
        };
    });
}

function collapseStrykThreeBranch(categories, code) {
    return categories.map((category) => {
        if (code.startsWith(category.code)) {
            return {
                ...category,
                expanded: !category.code.startsWith(code),
                children: category.children
                    ? collapseStrykThreeBranch(category.children, code)
                    : undefined,
            };
        }
        return category;
    });
}

function expandStyrkThreeBranch(categories, code) {
    return categories.map((category) => {
        if (code.startsWith(category.code)) {
            return {
                ...category,
                expanded: category.children && code.startsWith(category.code),
                children: category.children
                    ? expandStyrkThreeBranch(category.children, code)
                    : undefined,
            };
        }
        return category;
    });
}

function filterTypeAheadSuggestions(categories, query) {
    return categories
        .filter((s) => s.code.length >= 6 && categoryMatchesQuery(s, query))
        .map((category) => ({
            ...category,
            alternativeNames: category.alternativeNames.filter(
                (altName) => altName.toLowerCase().indexOf(query.toLowerCase()) !== -1
            ),
        }));
}

export function lookUpStyrk(code, categories = originalData) {
    return categories.find((s) => s.code === code);
}

const initialState = {
    typeAheadSuggestions: [],
    typeAheadValue: undefined,
    addedStyrkItems: [],
    styrkThree: [],
    showStyrkModal: false,
    styrkSearchString: undefined,
};

export default function styrkReducer(state = initialState, action) {
    switch (action.type) {
        case SET_STYRK:
            return {
                ...state,
                typeAheadSuggestions: [],
                typeAheadValue: undefined,
            };
        case SET_STYRK_TYPEAHEAD_VALUE:
            return {
                ...state,
                typeAheadValue: action.value,
                typeAheadSuggestions:
                    action.value.length > 1
                        ? filterTypeAheadSuggestions(originalData, action.value)
                        : [],
            };
        case FETCH_STYRK_SUCCESS:
            return {
                ...state,
                styrkThree: action.response,
            };
        case FETCH_STYRK_FAILURE:
            return {
                ...state,
                typeAheadSuggestions: [],
            };
        case RESET_STYRK_THREE:
            return {
                ...state,
                styrkThree: originalStyrkThree,
                styrkSearchString: undefined,
            };
        case EXPAND_STYRK_BRANCH:
            return {
                ...state,
                styrkThree: expandStyrkThreeBranch(state.styrkThree, action.code),
            };
        case COLLAPSE_STYRK_BRANCH:
            return {
                ...state,
                styrkThree: collapseStrykThreeBranch(state.styrkThree, action.code),
            };
        case TOGGLE_STYRK_MODAL:
            return {
                ...state,
                showStyrkModal: !state.showStyrkModal,
                styrkThree: createDefaultStyrkThree(originalData),
                styrkSearchString: '',
            };
        case SET_STRYK_SEARCH_STRING:
            return {
                ...state,
                styrkSearchString: action.value,
            };
        case SET_STRYK_SEARCH_STRING_DONE:
            return {
                ...state,
                styrkThree: action.styrkThree,
            };
        default:
            return state;
    }
}

function* getStyrk() {
    if (!originalStyrkThree) {
        try {
            const url = `${stillingApi}/rekrutteringsbistand/api/v1/categories-with-altnames?taxonomy=STYRK08NAV`;
            const response = yield fetchGet(url);
            const sorted = response.sort((a, b) => {
                if (a.code < b.code) return -1;
                if (a.code > b.code) return 1;
                return 0;
            });
            originalData = sorted;
            originalStyrkThree = createDefaultStyrkThree(originalData);
            yield put({ type: FETCH_STYRK_SUCCESS, response: originalStyrkThree });
        } catch (e) {
            if (e instanceof ApiError) {
                yield put({ type: FETCH_STYRK_FAILURE, error: e });
            } else {
                throw e;
            }
        }
    }
}

function* search(action) {
    let styrkThree;
    if (action.value.length >= 2) {
        styrkThree = filterStyrkThree(originalStyrkThree, action.value);
    } else {
        styrkThree = originalStyrkThree;
    }
    yield put({ type: SET_STRYK_SEARCH_STRING_DONE, styrkThree });
}

export const styrkSaga = function* saga() {
    yield takeLatest(FETCH_STYRK, getStyrk);
    yield throttle(250, SET_STRYK_SEARCH_STRING, search);
};
