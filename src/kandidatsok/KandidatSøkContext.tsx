import { BodyShort, Loader } from '@navikt/ds-react';
import * as React from 'react';
import { IKandidatSøk, Portefølje, useKandidatsøk } from '../api/kandidat-søk-api/kandidatsøk';
import { ApplikasjonContext } from '../felles/ApplikasjonContext';
import { Rolle } from '../felles/tilgangskontroll/Roller';
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
    const { tilgangskontrollErPå, harRolle } = React.useContext(ApplikasjonContext);

    const portefølje = () => {
        if (tilgangskontrollErPå) {
            if (
                søkekriterier.portefølje === Portefølje.ALLE &&
                !harRolle([Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET])
            ) {
                return Portefølje.MINE_KONTORER;
            } else if (!søkekriterier.portefølje) {
                return harRolle([Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET])
                    ? Portefølje.ALLE
                    : Portefølje.MINE_KONTORER;
            } else {
                return søkekriterier.portefølje;
            }
        } else {
            return søkekriterier.portefølje ?? Portefølje.ALLE;
        }
    };

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
        søkeprops: { ...søkekriterier, fritekst: økt.fritekst ?? null },
        portefølje: portefølje(),
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
