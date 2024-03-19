import { sendEvent } from 'felles/amplitude';
import { EsResponse } from 'felles/domene/elastic/ElasticSearch';
import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';
import { useEffect, useState } from 'react';
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
    const kommuneData = useHentKommuner();

    useEffect(() => {
        if (!kommuneNummer && kommuneData.data && !kommuneData.isLoading) {
            const kommunenummer = kommuneData.data.map((kommune: KommuneDTO) => kommune.code);
            setKommuneNummer(kommunenummer);
        }
    }, [kommuneData.data, kommuneNummer, kommuneData.isLoading]);

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

        if (fylkerUtenValgteKommuner && kommuneNummer) {
            const kommunerFraFylker = fylkerUtenValgteKommuner.map((fylke) => {
                return kommuneNummer.filter((kommune: string) => kommune.startsWith(fylke));
            });

            const kommuner = new Set<string>(
                kommunerFraFylker.reduce((acc, val) => acc.concat(val), [])
            );

            const eksisterendeKommuner = søkekriterier.kommuner;

            søkekriterier = {
                ...søkekriterier,
                kommuner: new Set([...eksisterendeKommuner, ...kommuner]),
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
