import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { encodeGeografiforslag } from '../filter/jobbønsker/ØnsketSted';
import { Stilling } from './useKontekstAvKandidatlisteEllerStilling';
import { FilterParam } from './useQuery';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from './useSøkekriterier';
import { KandidatsokQueryParam } from 'felles/lenker';
import { HentFylkerDTO, useHentFylker } from '../../api/stillings-api/hentFylker';
import { finnNåværendeKode, finnNåværendeNavnUppercase } from 'felles/MappingSted';

const useSøkekriterierFraStilling = (
    stilling: Nettressurs<Stilling>,
    brukKriterierFraStillingen: boolean
) => {
    const { setSearchParam } = useSøkekriterier();
    const [searchParams] = useSearchParams();
    const [harLagtTilKriterier, setHarLagtTilKriterier] = useState(false);

    const { data: fylker, isLoading: fylkerIsLoading } = useHentFylker();

    useEffect(() => {
        const anvendSøkekriterier = async (stilling: Stilling) => {
            const yrkerFraStilling = hentØnsketYrkeFraStilling(stilling);

            setSearchParam(FilterParam.ØnsketYrke, yrkerFraStilling);

            const stedFraStilling = hentØnsketStedFraStilling(stilling, fylker);
            if (stedFraStilling) {
                setSearchParam(FilterParam.ØnsketSted, stedFraStilling);
            }
            setHarLagtTilKriterier(true);
        };

        if (
            stilling.kind === Nettstatus.Suksess &&
            brukKriterierFraStillingen &&
            søkeKriterierIkkeLagtTil(searchParams) &&
            !fylkerIsLoading &&
            !harLagtTilKriterier
        ) {
            anvendSøkekriterier(stilling.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stilling, brukKriterierFraStillingen, JSON.stringify(fylker)]);
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

const hentØnsketStedFraStilling = (
    stilling: Stilling,
    fylker: HentFylkerDTO | undefined
): string | null => {
    const { location } = stilling.stilling;
    const { municipal, municipalCode, county } = location;

    if (municipal && municipalCode) {
        const kommunekode = `NO${municipalCode?.slice(0, 2)}.${municipalCode}`;
        return finnNåværendeKode(
            encodeGeografiforslag({
                geografiKode: kommunekode,
                geografiKodeTekst: formaterStedsnavnSlikDetErRegistrertPåKandidat(municipal),
            })
        );
    } else if (county) {
        const fylke = fylker
            ? fylker.find((f) => f.name.toUpperCase() === finnNåværendeNavnUppercase(county))
            : undefined;

        if (fylke) {
            const { code, capitalizedName } = fylke;
            return encodeGeografiforslag({
                geografiKode: `NO${code}`,
                geografiKodeTekst: capitalizedName,
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
