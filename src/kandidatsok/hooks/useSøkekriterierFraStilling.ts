import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { encodeGeografiforslag } from '../filter/jobbønsker/ØnsketSted';
import { Stilling } from './useKontekstAvKandidatlisteEllerStilling';
import { FilterParam } from './useQuery';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from './useSøkekriterier';
import { KandidatsokQueryParam } from 'felles/lenker';
import { SuggestionsSteder, useSuggestSted } from '../../api/kandidat-søk-api/suggestSted';

const useSøkekriterierFraStilling = (
    stilling: Nettressurs<Stilling>,
    brukKriterierFraStillingen: boolean
) => {
    const { setSearchParam } = useSøkekriterier();
    const [searchParams] = useSearchParams();

    const county =
        (stilling.kind === Nettstatus.Suksess && stilling.data?.stilling.location.county) || null;

    console.log('county', county);

    const { suggestions: fylker } = useSuggestSted({ query: county });
    console.log('fylker', fylker);

    useEffect(() => {
        const anvendSøkekriterier = async (stilling: Stilling) => {
            const yrkerFraStilling = hentØnsketYrkeFraStilling(stilling);

            setSearchParam(FilterParam.ØnsketYrke, yrkerFraStilling);

            const stedFraStilling = await hentØnsketStedFraStilling(stilling, fylker);
            console.log('stedFraStilling', stedFraStilling, 'fylker', fylker);
            if (stedFraStilling) {
                console.log('setSearchParam', FilterParam.ØnsketSted, stedFraStilling);
                setSearchParam(FilterParam.ØnsketSted, stedFraStilling);
            }
        };
        console.log('søkeKriterierIkkeLagtTil', søkeKriterierIkkeLagtTil);

        if (
            stilling.kind === Nettstatus.Suksess &&
            brukKriterierFraStillingen &&
            (søkeKriterierIkkeLagtTil(searchParams) ||
                (searchParams.get('sted') === undefined && fylker))
        ) {
            anvendSøkekriterier(stilling.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stilling, brukKriterierFraStillingen, fylker]);
};

const hentØnsketYrkeFraStilling = (stilling: Stilling) => {
    const { categoryList } = stilling.stilling;
    return categoryList
        .filter(
            (category) =>
                category.categoryType === 'STYRK08' || category.categoryType === 'STYRK08NAV'
        )
        .map((category) => category.name)
        .join(LISTEPARAMETER_SEPARATOR);
};

const hentØnsketStedFraStilling = async (
    stilling: Stilling,
    fylker: SuggestionsSteder | undefined
): Promise<string | null> => {
    const { location } = stilling.stilling;
    const { municipal, municipalCode, county } = location;

    if (municipal && municipalCode) {
        const kommunekode = `NO${municipalCode?.slice(0, 2)}.${municipalCode}`;

        return encodeGeografiforslag({
            geografiKode: kommunekode,
            geografiKodeTekst: formaterStedsnavnSlikDetErRegistrertPåKandidat(municipal),
        });
    } else if (county) {
        const fylke = fylker && fylker.length > 0 ? fylker[0] : undefined;

        if (fylke) {
            const { geografiKode, geografiKodeTekst } = fylke;

            return encodeGeografiforslag({
                geografiKode,
                geografiKodeTekst,
            });
        } else {
            return null;
        }
    } else {
        return null;
    }
};

const søkeKriterierIkkeLagtTil = (searchParams: URLSearchParams) =>
    Array.from(searchParams.keys()).every(
        (param) => param === KandidatsokQueryParam.Kandidatliste
    ) || Array.from(searchParams.keys()).every((param) => param === KandidatsokQueryParam.Stilling);

const formaterStedsnavnSlikDetErRegistrertPåKandidat = (stedsnavn: string) =>
    stedsnavn
        .split(' ')
        .map((s) => (s !== 'i' ? s.charAt(0).toUpperCase() + s.substring(1).toLowerCase() : s))
        .join(' ');

export default useSøkekriterierFraStilling;
