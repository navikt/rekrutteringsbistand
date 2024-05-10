import { Loader } from '@navikt/ds-react';
import React from 'react';
import { useMeg } from '../api/frackend/meg';
import { erIkkeProd } from './miljø';
import { Rolle } from './tilgangskontroll/TilgangskontrollForInnhold';

interface ApplikasjonContextType {
    roller?: Rolle[];
    navIdent?: string;
    harRolle: (rolle: Rolle[]) => boolean;
}

export const ApplikasjonContext = React.createContext<ApplikasjonContextType>({
    harRolle: () => false,
});

interface IApplikasjonContextProvider {
    children: React.ReactNode;
}

export const ApplikasjonContextProvider: React.FC<IApplikasjonContextProvider> = ({ children }) => {
    const { navIdent, roller, isLoading } = useMeg();

    // TODO Feature-toggle!
    const tilgangskontrollErPå = erIkkeProd;

    const harRolle = (rolle: Rolle[]) =>
        tilgangskontrollErPå
            ? rolle.some(
                  (r) =>
                      roller?.includes(r) ||
                      roller?.includes(Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER)
              )
            : true;

    return (
        <ApplikasjonContext.Provider value={{ roller, navIdent, harRolle }}>
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
