import { Chips, Loader } from '@navikt/ds-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { useHentFylker } from '../../../../api/stillings-api/hentFylker';
import { useHentKommuner } from '../../../../api/stillings-api/hentKommuner';
import capitalizeLocation from '../../../stilling/edit/arbeidssted/capitalizeLocation';
import { hentSøkekriterier, oppdaterUrlMedParam, QueryParam } from '../../utils/urlUtils';
import { hentIgnorerteFiltre } from '../filtermeny/Filtermeny';
import { Hovedtag, Subtag, visningsnavnForFilter } from '../inkludering/tags';
import { statusTilVisningsnavn } from '../om-annonsen/Annonsestatus';
import { publisertTilVisningsnavn } from '../om-annonsen/HvorErAnnonsenPublisert';
import { stillingskategoriTilVisningsnavn } from '../om-annonsen/VelgStillingskategori';

type Props = {
    finnerStillingForKandidat: boolean | undefined;
};

const ValgteKrierier = ({ finnerStillingForKandidat }: Props) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { pathname } = useLocation();
    const {
        statuser,
        publisert,
        stillingskategorier,
        fylker,
        kommuner,
        hovedinkluderingstags,
        subinkluderingstags,
        tekst,
    } = hentSøkekriterier(searchParams);

    const fylkerData = useHentFylker();
    const kommunerData = useHentKommuner();

    if (fylkerData.isLoading || kommunerData.isLoading) {
        return <Loader />;
    }
    const handleTømFiltreClick = () => {
        const parametre = new URLSearchParams(searchParams);

        const kriterierSomIkkeSkalTømmes = hentIgnorerteFiltre(finnerStillingForKandidat);

        for (const key of Array.from(parametre.keys())) {
            if (!kriterierSomIkkeSkalTømmes.includes(key as QueryParam)) {
                parametre.delete(key);
            }
        }

        navigate(
            {
                pathname,
                search: parametre.toString(),
            },
            {
                replace: true,
                state: {
                    harSlettetKriterier: true,
                },
            }
        );
    };

    function handleClick<T>(skalFjernes: T, elementer: Set<T>, parameter: QueryParam) {
        const oppdaterteElementer = new Set<any>(elementer);
        oppdaterteElementer.delete(skalFjernes);

        oppdaterUrlMedParam({
            searchParams,
            navigate,
            parameter: parameter,
            verdi: Array.from(oppdaterteElementer),
        });
    }

    const valgteKommuner = Array.from(kommuner);
    const fylkerUtenValgteKommuner = Array.from(fylker).filter(
        (fylke) => !valgteKommuner.some((kommune) => kommune.startsWith(fylke))
    );

    const valgteSubinkluderingstags = Array.from(subinkluderingstags);
    const hovedInkluderingstagsUtenValgteSubinkluderingtags = Array.from(
        hovedinkluderingstags
    ).filter(
        (hovedinkluderingstag) =>
            !valgteSubinkluderingstags.some((subinkluderingstag) =>
                subinkluderingstag.startsWith(`${hovedinkluderingstag}__`)
            )
    );

    return (
        <Chips>
            <Chips.Removable onDelete={handleTømFiltreClick}>Tøm alle filtre</Chips.Removable>
            {!finnerStillingForKandidat
                ? Array.from(statuser).map((status) => (
                      <Chips.Removable
                          key={status}
                          variant="neutral"
                          onDelete={() => {
                              handleClick(status, statuser, QueryParam.Statuser);
                          }}
                      >
                          {statusTilVisningsnavn(status)}
                      </Chips.Removable>
                  ))
                : []}
            {Array.from(publisert).map((derAnnonsenErpublisert) => (
                <Chips.Removable
                    key={derAnnonsenErpublisert}
                    variant="neutral"
                    onDelete={() => {
                        handleClick(derAnnonsenErpublisert, publisert, QueryParam.Publisert);
                    }}
                >
                    {publisertTilVisningsnavn(derAnnonsenErpublisert)}
                </Chips.Removable>
            ))}
            {Array.from(stillingskategorier).map((kategori) => (
                <Chips.Removable
                    key={kategori}
                    variant="neutral"
                    onDelete={() => {
                        handleClick(kategori, stillingskategorier, QueryParam.Stillingskategorier);
                    }}
                >
                    {stillingskategoriTilVisningsnavn(kategori)}
                </Chips.Removable>
            ))}
            {fylkerUtenValgteKommuner.map((fylke) => (
                <Chips.Removable
                    key={fylke}
                    variant="neutral"
                    onDelete={() => {
                        handleClick(fylke, fylker, QueryParam.Fylker);
                    }}
                >
                    {capitalizeLocation(
                        fylkerData?.data?.find((fylkeData: any) => fylkeData.code === fylke)?.name
                    )}
                </Chips.Removable>
            ))}
            {valgteKommuner.map((kommune) => (
                <Chips.Removable
                    key={kommune}
                    variant="neutral"
                    onDelete={() => {
                        handleClick(kommune, kommuner, QueryParam.Kommuner);
                    }}
                >
                    {capitalizeLocation(
                        kommunerData?.data?.find((kommuneData: any) => kommuneData.code === kommune)
                            ?.name
                    )}
                </Chips.Removable>
            ))}
            {hovedInkluderingstagsUtenValgteSubinkluderingtags.map((hovedinkluderingtag) => (
                <Chips.Removable
                    key={hovedinkluderingtag}
                    variant="neutral"
                    onDelete={() => {
                        handleClick(
                            hovedinkluderingtag,
                            hovedinkluderingstags,
                            QueryParam.HovedInkluderingTags
                        );
                    }}
                >
                    {visningsnavnForFilter[hovedinkluderingtag as Hovedtag]}
                </Chips.Removable>
            ))}
            {valgteSubinkluderingstags.map((subinkluderingtag) => (
                <Chips.Removable
                    key={subinkluderingtag}
                    variant="neutral"
                    onDelete={() => {
                        handleClick(
                            subinkluderingtag,
                            subinkluderingstags,
                            QueryParam.SubInkluderingTags
                        );
                    }}
                >
                    {visningsnavnForFilter[subinkluderingtag as Subtag]}
                </Chips.Removable>
            ))}
            {Array.from(tekst).map((term) => (
                <Chips.Removable
                    key={term}
                    variant="neutral"
                    onDelete={() => {
                        handleClick(term, tekst, QueryParam.Tekst);
                    }}
                >
                    {term}
                </Chips.Removable>
            ))}
        </Chips>
    );
};

export default ValgteKrierier;
