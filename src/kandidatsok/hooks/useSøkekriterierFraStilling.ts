import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Stilling } from './useKontekstAvKandidatlisteEllerStilling';
import { FilterParam } from './useQuery';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from './useSøkekriterier';
import { KandidatsokQueryParam } from 'felles/lenker';
import { HentFylkerDTO, useHentFylker } from '../../api/stillings-api/hentFylker';
import {
    formaterStedsnavn,
    lagKandidatsøkstreng,
    stedmappingFraGammeltNavn,
    stedmappingFraGammeltNummer,
} from 'felles/mappingSted';

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
        const nyttSted = stedmappingFraGammeltNummer.get(municipalCode);
        return lagKandidatsøkstreng(
            nyttSted
                ? nyttSted
                : {
                      nummer: municipalCode,
                      navn: formaterStedsnavn(municipal),
                  }
        );
    } else if (county) {
        const nåværendeCounty =
            stedmappingFraGammeltNavn.get(formaterStedsnavn(county))?.navn?.toUpperCase() || county;

        const fylke = fylker?.find((f) => f.name.toUpperCase() === nåværendeCounty);

        return fylke
            ? lagKandidatsøkstreng({ nummer: fylke.code, navn: fylke.capitalizedName })
            : null;
    } else {
        return null;
    }
};

const søkeKriterierIkkeLagtTil = (searchParams: URLSearchParams) =>
    Array.from(searchParams.keys()).every(
        (param) => param === KandidatsokQueryParam.Kandidatliste
    ) || Array.from(searchParams.keys()).every((param) => param === KandidatsokQueryParam.Stilling);

export default useSøkekriterierFraStilling;
