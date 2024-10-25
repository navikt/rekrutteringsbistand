import {
    formaterStedsnavn,
    lagKandidatsøkstreng,
    stedmappingFraGammeltNavn,
    stedmappingFraGammeltNummer,
} from 'felles/MappingSted';
import { Geografi, Rekrutteringsbistandstilling } from 'felles/domene/stilling/Stilling';
import { useEffect, useState } from 'react';
import { HentFylkerDTO, useHentFylker } from '../../api/stillings-api/hentFylker';
import useHentStilling from '../../felles/hooks/useStilling';
import { FilterParam } from './useQuery';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from './useSøkekriterier';

const useSøkekriterierFraStilling = (
    stillingId: string | null,
    brukKriterierFraStillingen: boolean
) => {
    const { setSearchParam } = useSøkekriterier();
    const [harLagtTilKriterier, setHarLagtTilKriterier] = useState(false);
    const { stilling: rekrutteringsbistandstilling, isLoading: isStillingLoading } =
        useHentStilling(stillingId);
    const { data: fylker, isLoading: fylkerIsLoading } = useHentFylker();

    useEffect(() => {
        const anvendSøkekriterier = async (
            rekrutteringsbistandstilling: Rekrutteringsbistandstilling
        ) => {
            const yrkerFraStilling = hentØnsketYrkeFraStilling(rekrutteringsbistandstilling);

            setSearchParam(FilterParam.ØnsketYrke, yrkerFraStilling);

            const stedFraStilling = hentØnsketStedFraStilling(rekrutteringsbistandstilling, fylker);
            if (stedFraStilling) {
                setSearchParam(FilterParam.ØnsketSted, stedFraStilling);
            }
            setHarLagtTilKriterier(true);
        };

        if (
            rekrutteringsbistandstilling &&
            brukKriterierFraStillingen &&
            !fylkerIsLoading &&
            !isStillingLoading &&
            !harLagtTilKriterier
        ) {
            anvendSøkekriterier(rekrutteringsbistandstilling);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rekrutteringsbistandstilling, brukKriterierFraStillingen, JSON.stringify(fylker)]);
};

const hentØnsketYrkeFraStilling = (rekrutteringsbistandstilling: Rekrutteringsbistandstilling) => {
    const { categoryList } = rekrutteringsbistandstilling.stilling;
    return categoryList
        .filter(
            (category) =>
                category.categoryType === 'STYRK08' || category.categoryType === 'STYRK08NAV'
        )
        .map((category) => category.name)
        .join(LISTEPARAMETER_SEPARATOR);
};

const hentØnsketStedFraStilling = (
    rekrutteringsbistandstilling: Rekrutteringsbistandstilling,
    fylker: HentFylkerDTO | undefined
): string | null => {
    const { locationList } = rekrutteringsbistandstilling.stilling;
    if (!locationList) return null;
    return locationList
        .map((location) => lagSøkestrengFraLokasjonsListe(location, fylker))
        .join(LISTEPARAMETER_SEPARATOR);
};

const lagSøkestrengFraLokasjonsListe = (location: Geografi, fylker: HentFylkerDTO | undefined) => {
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

export default useSøkekriterierFraStilling;
