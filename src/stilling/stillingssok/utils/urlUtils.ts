import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import { NavigateFunction } from 'react-router-dom';
import { Søkekriterier } from '../Stillingssøk';
import { Status } from '../filter/om-annonsen/Annonsestatus';
import { Publisert } from '../filter/om-annonsen/HvorErAnnonsenPublisert';
import { Sortering } from '../sorter/Sorter';
import { Søkefelt } from '../søkefelter/Søkefelter';

export enum QueryParam {
    // Filtre
    Tekst = 'q',
    Publisert = 'publisert',
    Side = 'side',
    Fylker = 'fylker',
    Kommuner = 'kommuner',
    Statuser = 'statuser',
    Stillingskategorier = 'stillingskategori',
    HovedInkluderingTags = 'hovedinkluderingstags',
    SubInkluderingTags = 'subinkluderingstags',
    Felter = 'felter',
    Sortering = 'sortering',

    // Valgmuligheter
    BrukStandardsøk = 'brukStandardsok',
    BrukKriterierFraKandidat = 'brukKriterierFraKandidat',
    Portofølje = 'portefolje',
    Modal = 'modal',
}

export type Navigeringsstate =
    | {
          harByttetSide?: boolean;
          harSlettetKriterier?: boolean;
          brukStandardsøk?: boolean;
      }
    | undefined;

export type QueryParamValue = string | boolean | null | number | string[];

const parseQueryParamSomSet = (searchParams: URLSearchParams) => (queryParam: QueryParam) => {
    const verdiFraUrl = searchParams.get(queryParam);
    return verdiFraUrl ? new Set<string>(verdiFraUrl.split(',')) : new Set<string>();
};

export const hentSøkekriterier = (searchParams: URLSearchParams): Søkekriterier => {
    const hentSøkekriterie = parseQueryParamSomSet(searchParams);

    return {
        side: parseInt(searchParams.get(QueryParam.Side) ?? '1'),
        tekst: hentSøkekriterie(QueryParam.Tekst),
        publisert: hentSøkekriterie(QueryParam.Publisert) as Set<Publisert>,
        fylker: hentSøkekriterie(QueryParam.Fylker),
        kommuner: hentSøkekriterie(QueryParam.Kommuner),
        hovedinkluderingstags: hentSøkekriterie(QueryParam.HovedInkluderingTags),
        subinkluderingstags: hentSøkekriterie(QueryParam.SubInkluderingTags),
        statuser: hentSøkekriterie(QueryParam.Statuser) as Set<Status>,
        stillingskategorier: hentSøkekriterie(
            QueryParam.Stillingskategorier
        ) as Set<Stillingskategori>,
        sortering:
            (searchParams.get(QueryParam.Sortering) as Sortering) ?? Sortering.Publiseringsdato,
        felter: hentSøkekriterie(QueryParam.Felter) as Set<Søkefelt>,
        portefolje: hentSøkekriterie(QueryParam.Portofølje),
    };
};

const oppdaterQueryParametere = (
    searchParams: URLSearchParams,
    param: QueryParam,
    value: QueryParamValue
): string => {
    if (
        value === null ||
        (typeof value === 'string' && value.length === 0) ||
        (typeof value === 'boolean' && value === false) ||
        (value instanceof Array && value.length === 0)
    ) {
        searchParams.delete(param);
    } else {
        searchParams.set(param, String(value));
    }

    return searchParams.toString();
};

export const oppdaterUrlMedParam = ({
    navigate,
    searchParams,
    parameter,
    verdi,
    state,
}: {
    navigate: NavigateFunction;
    searchParams: URLSearchParams;
    parameter: QueryParam;
    verdi: QueryParamValue;
    state?: Navigeringsstate;
}) => {
    let oppdaterteParams = oppdaterQueryParametere(searchParams, parameter, verdi);
    navigate({ search: oppdaterteParams }, { replace: true, state });
};
