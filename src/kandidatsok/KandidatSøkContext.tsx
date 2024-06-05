import { BodyShort, Loader } from '@navikt/ds-react';
import * as React from 'react';
import { IKandidatSøk, useKandidatsøk } from '../api/kandidat-søk-api/kandidatsøk';
import { ApplikasjonContext } from '../felles/ApplikasjonContext';
import useSøkekriterier, { IKandidatSøkekriterier } from './hooks/useSøkekriterier';
import { lesSessionStorage, skrivSessionStorage } from './sessionStorage';

export type Økt = Partial<{
    searchParams: string;
    sistBesøkteKandidat: string;
    markerteKandidater: string[];
    navigerbareKandidater: string[];
    totaltAntallKandidater: number;
    pageSize: number;
    fritekst: string;
}>;

interface IØkt {
    forrigeØkt: Økt;
    økt: Økt;
    setØkt: (økt: Økt) => void;
}
interface IKandidatSøkContext {
    kandidatSøk?: IKandidatSøk;
    søkekriterier?: IKandidatSøkekriterier;
    kandidatSøkØkt?: IØkt;
}

export const KandidatSøkContext = React.createContext<IKandidatSøkContext>({
    kandidatSøk: undefined,
});

interface IKandidatSøkContextProvider {
    children?: React.ReactNode | undefined;
}

const sessionStorageKey = 'kandidatsøk';

export const KandidatSøkContextProvider: React.FC<IKandidatSøkContextProvider> = ({ children }) => {
    const { søkekriterier: søkeKriterierInput } = useSøkekriterier();
    const { valgtNavKontor } = React.useContext(ApplikasjonContext);

    const forrigeØkt = React.useRef(lesSessionStorage(sessionStorageKey));

    const [økt, setØkt] = React.useState<Økt>(forrigeØkt.current);

    const kandidatSøkØkt = React.useMemo(() => {
        const onSetØkt = (oppdaterteFelter: Økt) => {
            const oppdatertØkt = {
                ...økt,
                ...oppdaterteFelter,
            };

            skrivSessionStorage(sessionStorageKey, oppdatertØkt);
            setØkt(oppdatertØkt);
        };

        return {
            forrigeØkt: forrigeØkt.current,
            økt,
            setØkt: onSetØkt,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(økt)]);

    const søkekriterier = React.useMemo(() => søkeKriterierInput, [søkeKriterierInput]);

    const {
        data: kandidatSøk,
        isLoading,
        error,
    } = useKandidatsøk({
        //TODO: Hack for å midlertidig fikse fritekst.
        søkekriterier: { ...søkekriterier, fritekst: økt.fritekst ?? null },
        navKontor: valgtNavKontor?.navKontor ?? null,
    });

    const value = React.useMemo(
        () => ({ kandidatSøk, kandidatSøkØkt, søkekriterier }),
        [kandidatSøk, kandidatSøkØkt, søkekriterier]
    );

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
