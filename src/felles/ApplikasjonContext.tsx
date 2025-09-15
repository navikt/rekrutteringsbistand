import { Loader } from '@navikt/ds-react';
import { getMiljø, Miljø } from 'felles/miljø';
import React from 'react';
import { useMeg } from '../api/frackend/meg';
import Stilling, { Stillingbase, Stillingsinfo } from './domene/stilling/Stilling';
import ErrorBoundary from './feilhåndtering/ErrorBoundary';
import { Rolle } from './tilgangskontroll/Roller';

export type NavKontorMedNavn = {
    navKontor: string;
    navKontorNavn: string | null;
};

interface ApplikasjonContextType {
    roller?: Rolle[];
    navIdent: string;
    eierSjekk: (stillingsData?: Stillingbase | Stillingsinfo | Stilling | null) => boolean;
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
    eierSjekk: () => false,
    navIdent: '',
});

interface IApplikasjonContextProvider {
    children: React.ReactNode;
}

export const ApplikasjonContextProvider: React.FC<IApplikasjonContextProvider> = ({ children }) => {
    const { navIdent, roller, isLoading } = useMeg();

    const [valgtNavKontor, setValgtNavKontor] = React.useState<NavKontorMedNavn | null>(null);

    const tilgangskontrollErPå = true;

    const harRolle = (rolle: Rolle[]) =>
        tilgangskontrollErPå
            ? rolle.some(
                  (r) =>
                      roller?.includes(r) ||
                      roller?.includes(Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER)
              )
            : true;

    const eierSjekk = (stillingsData?: Stillingbase | Stillingsinfo | Stilling | null) => {
        if (
            stillingsData &&
            'administration' in stillingsData &&
            stillingsData?.administration?.navIdent === navIdent
        ) {
            return true;
        } else if (
            stillingsData &&
            'eierNavident' in stillingsData &&
            stillingsData?.eierNavident === navIdent
        ) {
            return true;
        } else if (harRolle([Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER])) {
            return true;
        }
        return false;
    };

    if (!roller) {
        return <Loader />;
    }

    if (!roller?.includes(Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER)) {
        const href =
            getMiljø() === Miljø.ProdGcp
                ? 'https://rekrutteringsbistand.intern.nav.no/'
                : 'https://rekrutteringsbistand.intern.dev.nav.no/';

        window.location.href = href;

        return (
            <div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <div>Sender bruker til ny løsning...</div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Loader />
                </div>
            </div>
        );
    }
    return (
        <ApplikasjonContext.Provider
            value={{
                setValgtNavKontor,
                valgtNavKontor,
                roller,
                navIdent,
                harRolle,
                tilgangskontrollErPå,
                eierSjekk,
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
