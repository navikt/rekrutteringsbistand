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

export const lagQuery = (søkekriterier: Søkekriterier): EsQuery<EsRekrutteringsbistandstilling> => {
    return {
        size: maksAntallTreffPerSøk,
        from: regnUtFørsteTreffFra(søkekriterier.side, maksAntallTreffPerSøk),
        track_total_hits: true,
        query: lagIndreQuery(søkekriterier),
        ...sorterTreff(søkekriterier.sortering, søkekriterier.tekst),
        ...aggregeringer(søkekriterier),
    };
};

export const lagIndreQuery = (søkekriterier: Søkekriterier, alternativtFelt?: Søkefelt) => {
    const minimum_should_match = søkekriterier.tekst.size === 0 ? '0' : '1';

    const navIdent = Array.from(søkekriterier.visMine).join(', ');
    const identSøk = navIdent.length > 0 ? kunMineStillinger(navIdent) : '';

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
                ...status(søkekriterier.statuser),
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
            arbeidsgiver: lagIndreQuery(søkekriterier, Søkefelt.Arbeidsgiver),
            tittel: lagIndreQuery(søkekriterier, Søkefelt.Tittel),
            annonsetekst: lagIndreQuery(søkekriterier, Søkefelt.Annonsetekst),
            annonsenummer: lagIndreQuery(søkekriterier, Søkefelt.Annonsenummer),
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
