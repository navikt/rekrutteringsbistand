import { Alert, Loader } from '@navikt/ds-react';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { IKandidatSøk, Portefølje, useKandidatsøk } from '../api/kandidat-søk-api/kandidatsøk';
import { ApplikasjonContext } from '../felles/ApplikasjonContext';
import Layout from '../felles/komponenter/layout/Layout';
import { KandidatsokQueryParam } from '../felles/lenker';
import { Rolle } from '../felles/tilgangskontroll/Roller';
import useNavigeringsstate from './hooks/useNavigeringsstate';
import useSøkekriterier, { IKandidatSøkekriterier } from './hooks/useSøkekriterier';
import useSøkekriterierFraStilling from './hooks/useSøkekriterierFraStilling';
import { lesSessionStorage, skrivSessionStorage } from './sessionStorage';

export type Økt = Partial<{
    searchParams: string;
    sistBesøkteKandidat: string;
    markerteKandidater: string[];
    navigerbareKandidater: string[];
    totaltAntallKandidater: number;
    pageSize: number;
    fritekst: string;
    stillingsId?: string | null;
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
    const [searchParams] = useSearchParams();

    const { søkekriterier: søkeKriterierInput } = useSøkekriterier();
    const { tilgangskontrollErPå, harRolle, valgtNavKontor } = React.useContext(ApplikasjonContext);
    const navigeringsstate = useNavigeringsstate();
    const stillingId = searchParams.get(KandidatsokQueryParam.Stilling);

    const brukKriterierFraStillingen = navigeringsstate.brukKriterierFraStillingen;

    useSøkekriterierFraStilling(stillingId, brukKriterierFraStillingen);
    const portefølje = () => {
        if (tilgangskontrollErPå) {
            if (
                (søkekriterier.portefølje === Portefølje.ALLE ||
                    søkekriterier.portefølje === Portefølje.VALGTE_KONTORER) &&
                !harRolle([Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET])
            ) {
                return Portefølje.MINE_BRUKERE;
            } else if (!søkekriterier.portefølje) {
                return Portefølje.MINE_BRUKERE;
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
        søkeprops: {
            ...søkekriterier,
            fritekst: økt.fritekst ?? null,
            orgenhet: valgtNavKontor?.navKontor ?? null,
        },
        portefølje: portefølje(),
    });

    React.useEffect(() => {
        if (kandidatSøk) {
            kandidatSøkØkt.setØkt({
                navigerbareKandidater: kandidatSøk?.navigering.kandidatnumre,
                totaltAntallKandidater: kandidatSøk?.antallTotalt ?? 0,
                pageSize: kandidatSøk?.kandidater.length ?? 0,
            });
        }
    }, [kandidatSøk, kandidatSøkØkt]);

    const value = React.useMemo(
        () => ({ kandidatSøk, kandidatSøkØkt, søkekriterier }),
        [kandidatSøk, kandidatSøkØkt, søkekriterier]
    );

    if (error) {
        return (
            <Layout>
                <Alert variant="error">
                    {error?.message === '403'
                        ? 'Du har ikke tilgang til kandidatsøket'
                        : error?.message ?? 'Feil ved lasting av kandidatsøk'}
                </Alert>
            </Layout>
        );
    }

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <Loader variant="interaction" size="2xlarge" />
            </div>
        );
    }

    return <KandidatSøkContext.Provider value={value}>{children}</KandidatSøkContext.Provider>;
};
