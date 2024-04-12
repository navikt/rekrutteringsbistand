import {
    formaterStedsnavn,
    stedmappingFraNyttNavn,
    stedmappingFraNyttNummer,
} from 'felles/MappingSted';

const beholdFylkerUtenValgteKommuner = (fylker: Set<string>, kommuner: Set<string>) => {
    const kommuneArray = Array.from(kommuner);
    const fylkerForKommuner = kommuneArray.map((kommune) => kommune.split('.')[0]);

    return new Set(Array.from(fylker).filter((fylke) => !fylkerForKommuner.includes(fylke)));
};

const geografi = (alleFylker: Set<string>, kommuner: Set<string>) => {
    const fylker = beholdFylkerUtenValgteKommuner(alleFylker, kommuner);
    if (fylker.size === 0 && kommuner.size === 0) return [];

    const kommunerInkludertGamleKoder = new Set(
        [...kommuner].flatMap((kode) => {
            const ekstraKoder =
                stedmappingFraNyttNummer.get(kode)?.map((sted) => sted.nummer) || [];
            return [kode, ...ekstraKoder];
        })
    );

    const fylkerInkludertGamleNavn = new Set(
        [...fylker].flatMap((fylke) => {
            const ekstraNavn =
                stedmappingFraNyttNavn
                    .get(formaterStedsnavn(fylke))
                    ?.map((sted) => sted.navn.toUpperCase()) || [];
            return [fylke, ...ekstraNavn];
        })
    );

    const shouldFylker =
        fylkerInkludertGamleNavn.size === 0
            ? []
            : [
                  {
                      terms: {
                          'stilling.locations.county.keyword': Array.from(
                              fylkerInkludertGamleNavn
                          ).map((fylke) => fylke.toUpperCase()),
                      },
                  },
              ];

    const shouldKommuner =
        kommunerInkludertGamleKoder.size === 0
            ? []
            : [
                  {
                      terms: {
                          'stilling.locations.municipalCode': Array.from(
                              kommunerInkludertGamleKoder
                          ),
                      },
                  },
              ];

    return [
        {
            nested: {
                path: 'stilling.locations',
                query: {
                    bool: {
                        should: [...shouldFylker, ...shouldKommuner],
                    },
                },
            },
        },
    ];
};

export default geografi;
