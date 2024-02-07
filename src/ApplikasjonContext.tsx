import { Loader } from '@navikt/ds-react';
import React from 'react';
import { useMegHook } from './api/frackend/meg';

interface ApplikasjonContextType {
    brukerRoller?: string[];
}

export const ApplikasjonContext = React.createContext<ApplikasjonContextType>({});

interface IApplikasjonContextProvider {
    children: React.ReactNode;
}

export const ApplikasjonContextProvider: React.FC<IApplikasjonContextProvider> = ({ children }) => {
    const { navIdent } = useMegHook();

    return (
        <ApplikasjonContext.Provider value={{}}>
            {navIdent ? (
                children
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Loader />
                </div>
            )}
        </ApplikasjonContext.Provider>
    );
};
