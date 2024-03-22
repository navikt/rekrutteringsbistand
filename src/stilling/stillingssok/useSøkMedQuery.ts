import { sendEvent } from 'felles/amplitude';
import { EsResponse } from 'felles/domene/elastic/ElasticSearch';
import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';
import { useEffect, useState } from 'react';
import { FylkeDTO, useHentFylker } from '../../api/stillings-api/hentFylker';
import { KommuneDTO, useHentKommuner } from '../../api/stillings-api/hentKommuner';
import { Stillingskategori } from '../../felles/domene/stilling/Stilling';
import { søk } from './api/api';
import { lagQuery } from './api/queries/queries';
import useStandardsøk from './standardsøk/StandardsøkContext';
import useNavigering from './useNavigering';
import { QueryParam, hentSøkekriterier, oppdaterUrlMedParam } from './utils/urlUtils';

export const DEFAULT_VALGTE_KRITERIER = '?publisert=intern&statuser=publisert';

type Returverdi = {
    navIdent?: string;
    ikkePubliserte?: boolean;
    overstyrValgteStillingskategorier?: Set<Stillingskategori>;
    fallbackIngenValgteStillingskategorier: Set<Stillingskategori>;
};

const useSøkMedQuery = ({
    navIdent,
    ikkePubliserte,
    overstyrValgteStillingskategorier,
    fallbackIngenValgteStillingskategorier,
}: Returverdi) => {
    const { navigate, searchParams, state } = useNavigering();
    const { standardsøk } = useStandardsøk();
    const [respons, setRespons] = useState<EsResponse<EsRekrutteringsbistandstilling> | null>(null);

    const [kommuneNummer, setKommuneNummer] = useState<string[]>();
    const [fylker, setFylker] = useState<FylkeDTO[]>();

    const kommuneData = useHentKommuner();
    const fylkeData = useHentFylker();

    useEffect(() => {
        if (!kommuneNummer && kommuneData.data && !kommuneData.isLoading) {
            const kommunenummer = kommuneData.data.map((kommune: KommuneDTO) => kommune.code);
            setKommuneNummer(kommunenummer);
        }
    }, [kommuneData.data, kommuneNummer, kommuneData.isLoading]);

    useEffect(() => {
        if (!fylker && fylkeData.data && !fylkeData.isLoading) {
            setFylker(fylkeData.data);
        }
    }, [fylkeData.data, fylker, fylkeData.isLoading]);

    useEffect(() => {
        const skalBrukeStandardsøk = searchParams.has(QueryParam.BrukStandardsøk);
        if (skalBrukeStandardsøk) return;

        let søkekriterier = hentSøkekriterier(searchParams);
        if (overstyrValgteStillingskategorier) {
            søkekriterier = {
                ...søkekriterier,
                stillingskategorier: overstyrValgteStillingskategorier,
            };
        }

        const fylkerUtenValgteKommuner = Array.from(søkekriterier.fylker).filter(
            (fylke) =>
                !Array.from(søkekriterier.kommuner).some((kommune) => kommune.startsWith(fylke))
        );

        const harByttetSide = state?.harByttetSide;
        const resetSidetall = !harByttetSide && søkekriterier.side > 1;

        if (fylkerUtenValgteKommuner && kommuneNummer && fylker) {
            const fylkeNavn = fylkerUtenValgteKommuner.map(
                (fylke) => fylker.find((f) => f.code === fylke)?.name ?? 'Ukjent fylke'
            );

            søkekriterier = {
                ...søkekriterier,
                fylker: new Set(fylkeNavn),
            };
        }

        const søkMedQuery = async () => {
            let respons = await søk(
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
        searchParams,
        navigate,
        state,
        navIdent,
        ikkePubliserte,
        overstyrValgteStillingskategorier,
        fallbackIngenValgteStillingskategorier,
        kommuneNummer,
        fylker,
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
