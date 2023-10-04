export const kunMineStillinger = (navIdent: string) => [
    {
        bool: {
            should: [
                {
                    term: {
                        'stilling.administration.navIdent': navIdent,
                    },
                },
                {
                    term: {
                        'stillingsinfo.eierNavident': navIdent,
                    },
                },
            ],
        },
    },
];
