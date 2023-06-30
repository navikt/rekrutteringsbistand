export const SET_NAV_IDENT_STILLINGSINFO = 'SET_NAV_IDENT_STILLINGSINFO';
export const SET_STILLINGSINFO_DATA = 'SET_STILLINGSINFO_DATA';
export const SET_NOTAT = 'SET_NOTAT';

const initialState = {
    eierNavident: undefined,
    eierNavn: undefined,
    stillingsid: undefined,
    notat: undefined,
};

export default function stillingsinfoDataReducer(state = initialState, action) {
    switch (action.type) {
        case SET_STILLINGSINFO_DATA:
            return action.data;
        case SET_NAV_IDENT_STILLINGSINFO:
            return {
                ...state,
                eierNavident: action.navIdent,
                eierNavn: action.displayName,
            };
        case SET_NOTAT:
            return {
                ...state,
                notat: action.notat,
            };
        default:
            return state;
    }
}
