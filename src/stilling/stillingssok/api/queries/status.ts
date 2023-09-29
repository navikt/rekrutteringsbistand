import { Status } from '../../filter/om-annonsen/Annonsestatus';

export const status = (statuser: Set<Status>, ikkePubliserte: boolean) => {
    const ingenFiltreValgt = statuser.size === 0;
    const alleFiltreValgt = statuser.size === Object.keys(Status).length;

    if (ingenFiltreValgt || alleFiltreValgt) {
        if (ikkePubliserte) {
            return [];
        }
        return alleStillinger;
    }

    let statusSpørringer: any[] = [];
    if (statuser.has(Status.Publisert)) statusSpørringer.push(publisert);
    if (statuser.has(Status.Stoppet)) statusSpørringer.push(stoppet);
    if (statuser.has(Status.Utløpt)) statusSpørringer.push(utløpt);

    //Kan implementeres senere his vi vil ha checkboxer for statusene
    // if (statuser.has(Status.IkkePublisert)) statusSpørringer.push(ikkePubliserteStillinger);
    // if (statuser.has(Status.Utkast)) statusSpørringer.push(utkast);

    return [
        {
            bool: {
                should: statusSpørringer,
            },
        },
    ];
};

const stillingenErEllerHarVærtPublisert = [
    {
        term: {
            'stilling.administration.status': 'DONE',
        },
    },
    {
        exists: {
            field: 'stilling.publishedByAdmin',
        },
    },
    {
        range: {
            'stilling.published': {
                lte: 'now/d',
            },
        },
    },
];

// const ikkePubliserteStillinger = {
//     bool: {
//         must: [
//             { term: { 'stilling.status': 'INACTIVE' } },
//             {
//                 exists: {
//                     field: 'stilling.publishedByAdmin',
//                 },
//             },
//         ],
//         must_not: {
//             range: {
//                 'stilling.expires': {
//                     lt: 'now/d',
//                 },
//             },
//         },
//     },
// };

// const utkast = {
//     bool: {
//         must: [{ term: { 'stilling.status': 'INACTIVE' } }],
//         must_not: {
//             exists: {
//                 field: 'stilling.publishedByAdmin',
//             },
//         },
//     },
// };

export const alleStillinger = [
    {
        bool: {
            must_not: [
                {
                    term: {
                        'stilling.status': 'REJECTED',
                    },
                },
                {
                    term: {
                        'stilling.status': 'DELETED',
                    },
                },
            ],
            must: stillingenErEllerHarVærtPublisert,
        },
    },
];

const publisert = {
    term: {
        'stilling.status': 'ACTIVE',
    },
};

const stoppet = {
    bool: {
        must: [{ term: { 'stilling.status': 'STOPPED' } }, ...stillingenErEllerHarVærtPublisert],
    },
};

const utløpt = {
    bool: {
        must: [
            { term: { 'stilling.status': 'INACTIVE' } },
            {
                range: {
                    'stilling.expires': {
                        lt: 'now/d',
                    },
                },
            },
            ...stillingenErEllerHarVærtPublisert,
        ],
    },
};
