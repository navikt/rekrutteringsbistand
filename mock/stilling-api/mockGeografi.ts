export const mockCounties = [{ code: '03', name: 'OSLO' }];
export const mockCountries = [{ code: 'NO', name: 'NORGE' }];
export const mockMunicipals = [{ code: '0301', name: 'OSLO', countyCode: '03' }];

export const mockCategoriesWithAltnames = [
    {
        id: 939,
        code: '2',
        categoryType: 'STYRK08NAV',
        name: ' AKADEMISKE YRKER',
        description: null,
        parentId: null,
        alternativeNames: [],
    },
    {
        id: 1387,
        code: '22',
        categoryType: 'STYRK08NAV',
        name: 'Medisinske yrker',
        description: null,
        parentId: 939,
        alternativeNames: [],
    },
    {
        id: 1416,
        code: '222',
        categoryType: 'STYRK08NAV',
        name: 'Sykepleiere og spesialsykepleiere',
        description: null,
        parentId: 1387,
        alternativeNames: [],
    },
    {
        id: 1443,
        code: '2223',
        categoryType: 'STYRK08NAV',
        name: 'Sykepleiere',
        description: null,
        parentId: 1416,
        alternativeNames: [],
    },
    {
        id: 1445,
        code: '2223.02',
        categoryType: 'STYRK08NAV',
        name: 'Sykepleier',
        description: null,
        parentId: 1443,
        alternativeNames: [],
    },
];

export const mockPostdata = [
    {
        postalCode: '1001',
        city: 'OSLO',
        municipality: { code: '0301', name: 'OSLO', countyCode: '03' },
        county: { code: '03', name: 'OSLO' },
    },
];
