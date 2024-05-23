import {
    AlertType,
    type VisVarslingAction as RealVisVarslingAction,
} from 'felles/varsling/Varsling';
import { ReactNode } from 'react';

export type VarslingState = {
    visVarsling?: (prop: RealVisVarslingAction) => void;
};

const initialState: VarslingState = {
    visVarsling: undefined,
};

export enum VarslingActionType {
    SetVisVarsling = 'SET_VIS_VARSLING',
    VisVarsling = 'VIS_VARSLING',
}

type VisVarslingAction = {
    type: VarslingActionType.VisVarsling;
    innhold: ReactNode;
    alertType?: AlertType;
    varighetMs?: number;
};

type SetVisVarslingAction = {
    type: VarslingActionType.SetVisVarsling;
    visVarsling?: (prop: RealVisVarslingAction) => void;
};

export type VarslingAction = SetVisVarslingAction | VisVarslingAction;

const varslingReducer = (
    state: VarslingState = initialState,
    action: VarslingAction
): VarslingState => {
    switch (action.type) {
        case VarslingActionType.SetVisVarsling:
            // eslint-disable-next-line no-case-declarations
            const { visVarsling } = action;
            return { visVarsling };

        case VarslingActionType.VisVarsling:
            // eslint-disable-next-line no-case-declarations
            const { innhold, alertType, varighetMs } = action;
            state.visVarsling?.({ innhold, alertType, varighetMs });
            return state;

        default:
            return state;
    }
};

export default varslingReducer;
