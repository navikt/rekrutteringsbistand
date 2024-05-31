import { BodyShort, Loader } from '@navikt/ds-react';
import * as React from 'react';
import { IKandidatSøk, useKandidatsøk } from '../api/kandidat-søk-api/kandidatsøk';
import { ApplikasjonContext } from '../felles/ApplikasjonContext';
import useSøkekriterier, { IKandidatSøkekriterier } from './hooks/useSøkekriterier';

interface IKandidatSøkContext {
    kandidatSøk?: IKandidatSøk;
    søkekriterier?: IKandidatSøkekriterier;
}

export const KandidatSøkContext = React.createContext<IKandidatSøkContext>({
    kandidatSøk: undefined,
});

interface IKandidatSøkContextProvider {
    children?: React.ReactNode | undefined;
}

export const KandidatSøkContextProvider: React.FC<IKandidatSøkContextProvider> = ({ children }) => {
    const { søkekriterier: søkeKriterierInput } = useSøkekriterier();
    const { valgtNavKontor } = React.useContext(ApplikasjonContext);

    const søkekriterier = React.useMemo(() => søkeKriterierInput, [søkeKriterierInput]);

    const {
        data: kandidatSøk,
        isLoading,
        error,
    } = useKandidatsøk({ søkekriterier, navKontor: valgtNavKontor ?? null });

    const value = React.useMemo(() => ({ kandidatSøk }), [kandidatSøk]);

    if (error) {
        return (
            <BodyShort
                // className={css.feilmelding}
                aria-live="assertive"
            >
                {error.message === '403' ? 'Du har ikke tilgang til kandidatsøket' : error.message}
            </BodyShort>
        );
    }

    if (isLoading) {
        return (
            <Loader
                variant="interaction"
                size="2xlarge"
                // className={css.lasterInn}
            />
        );
    }

    return <KandidatSøkContext.Provider value={value}>{children}</KandidatSøkContext.Provider>;
};
