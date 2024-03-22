import { EsQuery } from 'felles/domene/elastic/ElasticSearch';
import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import { Søkekriterier } from '../../Stillingssøk';
import { Søkefelt } from '../../søkefelter/Søkefelter';
import geografi from './geografi';
import inkludering from './inkludering';
import { kunMineStillinger } from './mine-stillinger';
import publisert from './publisert';
import sorterTreff from './sortering';
import { status } from './status';
import { stillingskategori } from './stillingskategori';
import søkefelt from './søkefelt';

export const maksAntallTreffPerSøk = 40;

interface IlagQuery {
    søkekriterier: Søkekriterier;
    navIdent?: string;
    ikkePubliserte?: boolean;
    fallbackIngenValgteStillingskategorier: Set<Stillingskategori>;
}

export const lagQuery = ({
    søkekriterier,
    navIdent,
    ikkePubliserte,
    fallbackIngenValgteStillingskategorier,
}: IlagQuery): EsQuery<EsRekrutteringsbistandstilling> => {
    return {
        size: maksAntallTreffPerSøk,
        from: regnUtFørsteTreffFra(søkekriterier.side, maksAntallTreffPerSøk),
        track_total_hits: true,
        query: lagIndreQuery({
            søkekriterier,
            navIdent,
            ikkePubliserte,
            fallbackIngenValgteStillingskategorier,
        }),
        ...sorterTreff(søkekriterier.sortering, søkekriterier.tekst),
        ...aggregeringer({ søkekriterier, fallbackIngenValgteStillingskategorier }),
    };
};

interface IlagIndreQuery {
    søkekriterier: Søkekriterier;
    alternativtFelt?: Søkefelt;
    navIdent?: string;
    ikkePubliserte?: boolean;
    fallbackIngenValgteStillingskategorier: Set<Stillingskategori>;
}

export const lagIndreQuery = ({
    søkekriterier,
    alternativtFelt,
    navIdent,
    ikkePubliserte,
    fallbackIngenValgteStillingskategorier,
}: IlagIndreQuery) => {
    const minimum_should_match = søkekriterier.tekst.size === 0 ? '0' : '1';
    const identSøk = navIdent ? kunMineStillinger(navIdent) : '';

    return {
        bool: {
            should: [
                ...søkefelt(
                    søkekriterier.tekst,
                    alternativtFelt ? new Set<Søkefelt>([alternativtFelt]) : søkekriterier.felter
                ),
            ],
            minimum_should_match,
            filter: [
                ...identSøk,
                ...publisert(søkekriterier.publisert),
                ...geografi(søkekriterier.fylker, søkekriterier.kommuner),
                // @ts-ignore TODO: written before strict-mode enabled
                ...status(søkekriterier.statuser, ikkePubliserte),
                ...stillingskategori({
                    valgte: søkekriterier.stillingskategorier,
                    fallbackIngenValgte: fallbackIngenValgteStillingskategorier,
                }),
                ...inkludering(
                    søkekriterier.hovedinkluderingstags,
                    søkekriterier.subinkluderingstags
                ),
            ],
        },
    };
};

type IAggregeringer = {
    søkekriterier: Søkekriterier;
    fallbackIngenValgteStillingskategorier: Set<Stillingskategori>;
};
const aggregeringer = ({
    søkekriterier,
    fallbackIngenValgteStillingskategorier,
}: IAggregeringer) => {
    if (søkekriterier.tekst.size <= 0) {
        return {};
    }

    const indreQueryMedAlternativFelt = (alternativtFelt: Søkefelt) =>
        lagIndreQuery({
            søkekriterier,
            alternativtFelt,
            fallbackIngenValgteStillingskategorier,
        });

    const queriesForFeltaggregering: Partial<Record<Søkefelt, object>> = {
        arbeidsgiver: indreQueryMedAlternativFelt(Søkefelt.Arbeidsgiver),
        tittel: indreQueryMedAlternativFelt(Søkefelt.Tittel),
        annonsetekst: indreQueryMedAlternativFelt(Søkefelt.Annonsetekst),
        annonsenummer: indreQueryMedAlternativFelt(Søkefelt.Annonsenummer),
    };

    return {
        aggs: {
            globalAggregering: {
                global: {},
                aggs: {
                    felter: {
                        filters: {
                            filters: queriesForFeltaggregering,
                        },
                    },
                },
            },
        },
    };
};

const regnUtFørsteTreffFra = (side: number, antallTreffPerSide: number) =>
    side * antallTreffPerSide - antallTreffPerSide;
