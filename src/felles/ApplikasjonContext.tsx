import { Loader } from '@navikt/ds-react';
import React from 'react';
import { useMeg } from '../api/frackend/meg';
import ErrorBoundary from './feilhåndtering/ErrorBoundary';
import { erIkkeProd } from './miljø';
import { Rolle } from './tilgangskontroll/Roller';

export type NavKontorMedNavn = {
    navKontor: string;
    navKontorNavn: string | null;
};

interface ApplikasjonContextType {
    roller?: Rolle[];
    navIdent?: string;
    harRolle: (rolle: Rolle[]) => boolean;
    tilgangskontrollErPå: boolean;
    valgtNavKontor: NavKontorMedNavn | null;
    setValgtNavKontor: (navKontor: NavKontorMedNavn | null) => void;
}

export const ApplikasjonContext = React.createContext<ApplikasjonContextType>({
    harRolle: () => false,
    tilgangskontrollErPå: false,
    setValgtNavKontor: () => null,
    valgtNavKontor: null,
});

interface IApplikasjonContextProvider {
    children: React.ReactNode;
}

export const ApplikasjonContextProvider: React.FC<IApplikasjonContextProvider> = ({ children }) => {
    const { navIdent, roller, isLoading } = useMeg();

    const [valgtNavKontor, setValgtNavKontor] = React.useState<NavKontorMedNavn | null>(null);

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
        <ApplikasjonContext.Provider
            value={{
                setValgtNavKontor,
                valgtNavKontor,
                roller,
                navIdent,
                harRolle,
                tilgangskontrollErPå,
            }}
        >
            <>
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Loader />
                    </div>
                ) : (
                    <ErrorBoundary> {children} </ErrorBoundary>
                )}
            </>
        </ApplikasjonContext.Provider>
    );
};
