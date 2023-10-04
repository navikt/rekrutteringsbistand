import { EsQuery } from 'felles/domene/elastic/ElasticSearch';
import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';
import { kunMineStillinger } from '../../../api/openSearchQuery';
import { Søkekriterier } from '../../Stillingssøk';
import { Søkefelt } from '../../søkefelter/Søkefelter';
import geografi from './geografi';
import inkludering from './inkludering';
import publisert from './publisert';
import sorterTreff from './sortering';
import { status } from './status';
import { stillingskategori } from './stillingskategori';
import søkefelt from './søkefelt';

export const maksAntallTreffPerSøk = 40;

export const lagQuery = (
    søkekriterier: Søkekriterier,
    navIdent?: string,
    ikkePubliserte?: boolean
): EsQuery<EsRekrutteringsbistandstilling> => {
    return {
        size: maksAntallTreffPerSøk,
        from: regnUtFørsteTreffFra(søkekriterier.side, maksAntallTreffPerSøk),
        track_total_hits: true,
        query: lagIndreQuery({ søkekriterier, navIdent, ikkePubliserte }),
        ...sorterTreff(søkekriterier.sortering, søkekriterier.tekst),
        ...aggregeringer(søkekriterier),
    };
};

export const lagIndreQuery = ({
    søkekriterier,
    alternativtFelt,
    navIdent,
    ikkePubliserte,
}: {
    søkekriterier: Søkekriterier;
    alternativtFelt?: Søkefelt;
    navIdent?: string;
    ikkePubliserte?: boolean;
}) => {
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
                ...status(søkekriterier.statuser, ikkePubliserte),
                ...stillingskategori(søkekriterier.stillingskategorier),
                ...inkludering(
                    søkekriterier.hovedinkluderingstags,
                    søkekriterier.subinkluderingstags
                ),
            ],
        },
    };
};

const aggregeringer = (søkekriterier: Søkekriterier) => {
    let queriesForFeltaggregering: Partial<Record<Søkefelt, object>> = {};

    if (søkekriterier.tekst.size > 0) {
        queriesForFeltaggregering = {
            ...queriesForFeltaggregering,
            arbeidsgiver: lagIndreQuery({ søkekriterier, alternativtFelt: Søkefelt.Arbeidsgiver }),
            tittel: lagIndreQuery({ søkekriterier, alternativtFelt: Søkefelt.Tittel }),
            annonsetekst: lagIndreQuery({ søkekriterier, alternativtFelt: Søkefelt.Annonsetekst }),
            annonsenummer: lagIndreQuery({
                søkekriterier,
                alternativtFelt: Søkefelt.Annonsenummer,
            }),
        };
    } else {
        return {};
    }

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
