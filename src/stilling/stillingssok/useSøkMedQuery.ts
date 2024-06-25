import { sendEvent } from 'felles/amplitude';
import { EsResponse } from 'felles/domene/elastic/ElasticSearch';
import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FylkeDTO, useHentFylker } from '../../api/stillings-api/hentFylker';
import { ApplikasjonContext } from '../../felles/ApplikasjonContext';
import { Stillingskategori } from '../../felles/domene/stilling/Stilling';
import { Rolle } from '../../felles/tilgangskontroll/Roller';
import { søk } from './api/api';
import { lagQuery } from './api/queries/queries';
import { Status } from './filter/om-annonsen/Annonsestatus';
import useStandardsøk from './standardsøk/StandardsøkContext';
import useNavigering from './useNavigering';
import { QueryParam, hentSøkekriterier, oppdaterUrlMedParam } from './utils/urlUtils';

export const DEFAULT_VALGTE_KRITERIER = '?publisert=intern&statuser=publisert';

type Returverdi = {
    navIdent?: string;
    ikkePubliserte?: boolean;
    visBareStillingskategori?: Set<Stillingskategori>;
    fallbackIngenValgteStillingskategorier: Set<Stillingskategori>;
};

const useSøkMedQuery = ({
    navIdent,
    ikkePubliserte,
    visBareStillingskategori,
    fallbackIngenValgteStillingskategorier,
}: Returverdi) => {
    const { navigate, searchParams, state } = useNavigering();
    const { standardsøk } = useStandardsøk();
    const [respons, setRespons] = useState<EsResponse<EsRekrutteringsbistandstilling> | null>(null);
    const { harRolle } = useContext(ApplikasjonContext);

    const { data: fylkeData } = useHentFylker();

    const hentFylkeNavn = useCallback(
        (fylke: string) => {
            return fylkeData?.find((f: FylkeDTO) => f.code === fylke)?.name ?? 'Ukjent fylke';
        },
        [fylkeData]
    );

    useEffect(() => {
        const skalBrukeStandardsøk = searchParams.has(QueryParam.BrukStandardsøk);
        if (skalBrukeStandardsøk) return;

        let søkekriterier = hentSøkekriterier(searchParams);

        if (visBareStillingskategori) {
            søkekriterier = {
                ...søkekriterier,
                stillingskategorier: visBareStillingskategori,
            };
        }

        const fylkerUtenValgteKommuner = Array.from(søkekriterier.fylker).filter(
            (fylke) =>
                !Array.from(søkekriterier.kommuner).some((kommune) => kommune.startsWith(fylke))
        );

        const harByttetSide = state?.harByttetSide;
        const resetSidetall = !harByttetSide && søkekriterier.side > 1;

        if (fylkerUtenValgteKommuner) {
            const fylkeNavn = fylkerUtenValgteKommuner.map((f) => hentFylkeNavn(f));

            søkekriterier = {
                ...søkekriterier,
                fylker: new Set(fylkeNavn),
            };
        }

        // Viser kun publiserte stillinger, men mulighet til å velge for formidlinger
        if (
            !visBareStillingskategori &&
            !harRolle([Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET])
        ) {
            søkekriterier = {
                ...søkekriterier,
                statuser: new Set([Status.Publisert]),
            };
        }

        const søkMedQuery = async () => {
            const respons = await søk(
                lagQuery({
                    søkekriterier,
                    navIdent,
                    ikkePubliserte,
                    fallbackIngenValgteStillingskategorier,
                })
            );
            setRespons(respons);
        };

        if (resetSidetall) {
            oppdaterUrlMedParam({
                navigate,
                searchParams,
                parameter: QueryParam.Side,
                verdi: null,
            });
        } else {
            søkMedQuery();
        }
    }, [
        harRolle,
        searchParams,
        navigate,
        state,
        navIdent,
        ikkePubliserte,
        visBareStillingskategori,
        fallbackIngenValgteStillingskategorier,
        hentFylkeNavn,
    ]);

    useEffect(() => {
        const skalBrukeStandardsøk = searchParams.has(QueryParam.BrukStandardsøk);

        if (skalBrukeStandardsøk && standardsøk.harHentetStandardsøk) {
            if (standardsøk.standardsøk !== null) {
                navigate(
                    { search: standardsøk.standardsøk },
                    {
                        replace: true,
                    }
                );
            } else {
                navigate({ search: DEFAULT_VALGTE_KRITERIER }, { replace: true });
            }

            sendEvent('stillingssøk', 'har_lagret_standardsøk', {
                harLagretStandardsøk: !!standardsøk,
            });
        }
    }, [searchParams, navigate, standardsøk]);

    return respons;
};

export default useSøkMedQuery;
