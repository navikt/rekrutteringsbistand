const geografi = (kommuner: Set<string>) => {
    if (kommuner.size === 0) return [];

    const kommunerArray = Array.from(kommuner);
    return [
        {
            nested: {
                path: 'stilling.locations',
                query: {
                    bool: {
                        should: [
                            {
                                terms: {
                                    'stilling.locations.municipalCode': kommunerArray,
                                },
                            },
                        ],
                    },
                },
            },
        },
    ];
};

export default geografi;
