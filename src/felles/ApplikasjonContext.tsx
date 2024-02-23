import { Loader } from '@navikt/ds-react';
import React from 'react';
import { useMeg } from '../api/frackend/meg';
import { Rolle } from './tilgangskontroll/TilgangskontrollForInnhold';

interface ApplikasjonContextType {
    roller?: Rolle[];
    navIdent?: string;
}

export const ApplikasjonContext = React.createContext<ApplikasjonContextType>({});

interface IApplikasjonContextProvider {
    children: React.ReactNode;
}

export const ApplikasjonContextProvider: React.FC<IApplikasjonContextProvider> = ({ children }) => {
    const { navIdent, roller, isLoading } = useMeg();

    return (
        <ApplikasjonContext.Provider value={{ roller, navIdent }}>
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Loader />
                </div>
            ) : (
                children
            )}
        </ApplikasjonContext.Provider>
    );
};
