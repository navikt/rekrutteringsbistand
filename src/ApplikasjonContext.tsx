import { Loader } from '@navikt/ds-react';
import React from 'react';
import useInnloggetBruker from './api/frackend/hooks/useInnloggetBruker';

interface ApplikasjonContextType {
    brukerRoller?: string[];
}

export const ApplikasjonContext = React.createContext<ApplikasjonContextType>({});

interface IApplikasjonContextProvider {
    children: React.ReactNode;
}

export const ApplikasjonContextProvider: React.FC<IApplikasjonContextProvider> = ({ children }) => {
    const bruker = useInnloggetBruker();

    console.log('🎺 bruker', bruker);
    return (
        <ApplikasjonContext.Provider value={{}}>
            {bruker ? (
                children
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Loader />
                </div>
            )}
        </ApplikasjonContext.Provider>
    );
};
