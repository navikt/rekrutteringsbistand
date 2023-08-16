import { AggregationsQuery, EsQuery } from 'felles/domene/elastic/ElasticSearch';
import Kandidat from 'felles/domene/kandidat/Kandidat';
import { Søkekriterier } from '../../hooks/useSøkekriterier';
import { queryMedØnsketYrke } from './queryMedØnsketYrke';

export enum Aggregering {
    Kompetanse = 'kompetanse',
}

enum Aggregeringsfelt {
    Kompetanseord = 'kompetanseObj.kompKodeNavn.keyword',
}

export const byggAggregeringerQuery = (søkekriterier: Søkekriterier): EsQuery<Kandidat> => {
    const { ønsketYrke } = søkekriterier;

    return {
        query: {
            bool: {
                must: [...queryMedØnsketYrke(ønsketYrke, false)],
            },
        },
        _source: false,
        size: 0,
        track_total_hits: false,
        aggs: kompetanseaggregering,
    };
};

export const kompetanseaggregering: AggregationsQuery = {
    [Aggregering.Kompetanse]: {
        terms: {
            field: Aggregeringsfelt.Kompetanseord,
            size: 12,
        },
    },
};
