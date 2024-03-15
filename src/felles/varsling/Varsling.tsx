import React, {
    createContext,
    Dispatch,
    FunctionComponent,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
} from 'react';
import css from './Varsling.module.css';
import { Alert, type AlertProps } from '@navikt/ds-react';

export type VisVarslingAction = {
    innhold: ReactNode;
    alertType?: AlertType;
    varighetMs?: number;
};

export type AlertType = AlertProps['variant'];

type VarslingState = {
    innhold: ReactNode;
    alertType: AlertType;
};

const emptyVarslingState: VarslingState = {
    innhold: null,
    alertType: 'info',
};

type Context = [VarslingState | undefined, Dispatch<SetStateAction<VarslingState>>];

const VarslingContext = createContext<Context>([
    undefined,
    () => {
        console.error('VarslingContext has no provider');
    },
]);

export const VarslingContextProvider = ({ children }: { children: ReactNode }) => {
    const stateAndSetState = React.useState<VarslingState>({
        innhold: null,
        alertType: 'info',
    });

    return <VarslingContext.Provider value={stateAndSetState}>{children}</VarslingContext.Provider>;
};

export const useVisVarsling = (): ((props: VisVarslingAction) => void) => {
    const [, setState] = useContext(VarslingContext);

    return useCallback(
        ({ innhold, alertType = 'info', varighetMs = 4000 }) => {
            setState({
                innhold,
                alertType,
            });

            setTimeout(() => {
                setState((state) => {
                    if (state.innhold === innhold) {
                        return emptyVarslingState;
                    } else {
                        return state;
                    }
                });
            }, varighetMs);
        },
        [setState]
    );
};

export const Varsling: FunctionComponent = () => {
    const [state] = useContext(VarslingContext);

    if (state === undefined || state.innhold === null) {
        return null;
    }

    return (
        <Alert fullWidth className={css.varsling} variant={state.alertType} aria-live="assertive">
            {state.innhold}
        </Alert>
    );
};
