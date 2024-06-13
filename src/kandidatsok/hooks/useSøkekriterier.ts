import { useCallback, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mål as Hovedmål } from '../filter/Hovedmål';
import { FiltrerbarInnsatsgruppe } from '../filter/Jobbmuligheter';
import { Nivå as Utdanningsnivå } from '../filter/Utdanningsnivå';
import { PrioritertMålgruppe } from '../filter/prioriterte-målgrupper/PrioriterteMålgrupper';
import { Sortering } from '../kandidater/sortering/Sortering';

import { Portefølje } from '../../api/kandidat-søk-api/kandidatsøk';
import { KandidatSøkContext, Økt } from '../KandidatSøkContext';
import { FilterParam } from './useQuery';

export const LISTEPARAMETER_SEPARATOR = ';';
export const LISTEPARAMETER_SEPARATOR_REPLACEMENT = '·';

export enum Førerkortklasse {
    LettMotorsykkel = 'A1 - Lett motorsykkel',
    MellomtungMotorsykkel = 'A2 - Mellomtung motorsykkel',
    TungMotorsykkel = 'A - Tung motorsykkel',
    Personbil = 'B - Personbil',
    PersonbilMedTilhenger = 'BE - Personbil med tilhenger',
    LettLastebil = 'C1 - Lett lastebil',
    LettLastebilMedTilhenger = 'C1E - Lett lastebil med tilhenger',
    Lastebil = 'C - Lastebil',
    LastebilMedTilhenger = 'CE - Lastebil med tilhenger',
    Minibuss = 'D1 - Minibuss',
    MinibussMedTilhenger = 'D1E - Minibuss med tilhenger',
    Buss = 'D - Buss',
    BussMedTilhenger = 'DE - Buss med tilhenger',
    Traktor = 'T - Traktor',
    Snøscooter = 'S - Snøscooter',
}

export type IKandidatSøkekriterier = {
    fritekst: string | null;
    portefølje: Portefølje;
    valgtKontor: Set<string>;
    innsatsgruppe: Set<FiltrerbarInnsatsgruppe>;
    side: number;
    ønsketYrke: Set<string>;
    ønsketSted: Set<string>;
    borPåØnsketSted: boolean | null;
    kompetanse: Set<string>;
    førerkort: Set<Førerkortklasse>;
    prioritertMålgruppe: Set<PrioritertMålgruppe>;
    hovedmål: Set<Hovedmål>;
    utdanningsnivå: Set<Utdanningsnivå>;
    arbeidserfaring: Set<string>;
    ferskhet: number | null;
    språk: Set<string>;
    sortering: Sortering;
    orgenhet: string | null;
};

type Returverdi = {
    setSearchParam: (parameter: FilterParam, value: string | null) => void;
    søkekriterier: IKandidatSøkekriterier;
    fjernSøkekriterier: () => void;
};

const useSøkekriterier = (): Returverdi => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { kandidatSøkØkt } = useContext(KandidatSøkContext);
    const økt = kandidatSøkØkt?.økt;
    const [søkekriterier, setSøkekriterier] = useState<IKandidatSøkekriterier>(
        searchParamsTilSøkekriterier(searchParams, økt ?? {})
    );

    useEffect(() => {
        setSøkekriterier(searchParamsTilSøkekriterier(searchParams, økt ?? {}));
    }, [searchParams, økt]);

    const setSearchParam = useCallback(
        (parameter: FilterParam, value: string | null) => {
            if (value !== null && value.length > 0) {
                searchParams.set(parameter, value);
            } else {
                searchParams.delete(parameter);
            }

            if (parameter !== FilterParam.Side && søkekriterier.side > 1) {
                searchParams.delete(FilterParam.Side);
            }
            if (parameter !== FilterParam.Fritekst) {
                searchParams.delete(FilterParam.Fritekst);
            }

            setSearchParams(searchParams, {
                replace: true,
            });
        },
        [searchParams, setSearchParams, søkekriterier.side]
    );

    useEffect(() => {
        if (!søkekriterier.portefølje) {
            setSearchParam(FilterParam.Portefølje, Portefølje.MINE_BRUKERE);
        }
    }, [søkekriterier, setSearchParam]);

    const fjernSøkekriterier = () => {
        Object.values(FilterParam).forEach((key) => searchParams.delete(key));
        setSearchParams(searchParams, {
            replace: true,
        });
    };

    return {
        setSearchParam,
        søkekriterier,
        fjernSøkekriterier,
    };
};

export const searchParamsTilSøkekriterier = (
    searchParams: URLSearchParams,
    økt: Økt
): IKandidatSøkekriterier => ({
    orgenhet: null,
    fritekst: økt.fritekst ? økt.fritekst : null,
    portefølje: searchParams.get(FilterParam.Portefølje) as Portefølje,
    valgtKontor: searchParamTilSet(searchParams.get(FilterParam.ValgtKontor)),
    innsatsgruppe: searchParamTilSet(searchParams.get(FilterParam.Innsatsgruppe)),
    side: Number(searchParams.get(FilterParam.Side)) || 1,
    ønsketYrke: searchParamTilSet(searchParams.get(FilterParam.ØnsketYrke)),
    ønsketSted: searchParamTilSet(searchParams.get(FilterParam.ØnsketSted), '_'),
    borPåØnsketSted: searchParamTilBoolean(searchParams.get(FilterParam.BorPåØnsketSted)),
    kompetanse: searchParamTilSet(searchParams.get(FilterParam.Kompetanse)),
    førerkort: searchParamTilSet(searchParams.get(FilterParam.Førerkort)),
    prioritertMålgruppe: searchParamTilSet(searchParams.get(FilterParam.PrioritertMålgruppe)),
    hovedmål: searchParamTilSet(searchParams.get(FilterParam.Hovedmål)),
    utdanningsnivå: searchParamTilSet(searchParams.get(FilterParam.Utdanningsnivå)),
    arbeidserfaring: searchParamTilSet(searchParams.get(FilterParam.Arbeidserfaring)),
    ferskhet: searchParams.get(FilterParam.Ferskhet)
        ? Number(searchParams.get(FilterParam.Ferskhet))
        : null,
    språk: searchParamTilSet(searchParams.get(FilterParam.Språk)),
    sortering: (searchParams.get(FilterParam.Sortering) as Sortering) || Sortering.SisteFørst,
});

function searchParamTilSet<SetType = string>(
    searchParam: string | null,
    separator = LISTEPARAMETER_SEPARATOR
) {
    return new Set(
        splittSearchParamTilStrings(searchParam, separator)
    ) as Set<unknown> as Set<SetType>;
}

function splittSearchParamTilStrings(searchParam: string | null, separator: string) {
    if (searchParam === null) {
        return null;
    }

    return searchParam
        .split(separator)
        .map((verdi) =>
            verdi.replaceAll(LISTEPARAMETER_SEPARATOR_REPLACEMENT, LISTEPARAMETER_SEPARATOR)
        );
}

export function kombinerStringsTilSearchParam(verdier: string[]) {
    const medReplacementChar = verdier.map((verdi) =>
        verdi.replaceAll(LISTEPARAMETER_SEPARATOR, LISTEPARAMETER_SEPARATOR_REPLACEMENT)
    );
    return medReplacementChar.join(LISTEPARAMETER_SEPARATOR);
}

function searchParamTilBoolean(searchParam: string | null) {
    return searchParam ? Boolean(searchParam) : null;
}

export default useSøkekriterier;
