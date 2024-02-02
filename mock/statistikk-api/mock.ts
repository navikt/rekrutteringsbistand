export const hentAntallFormidlinger = (navKontor: string) => {
    switch (navKontor) {
        case '0239':
            return {
                antFåttJobben: {
                    totalt: 777,
                    under30år: 333,
                    innsatsgruppeIkkeStandard: 111,
                },
                antPresentasjoner: {
                    totalt: 888,
                    under30år: 444,
                    innsatsgruppeIkkeStandard: 222,
                },
            };
        case '0000':
            return null;
        default:
            return {
                antFåttJobben: {
                    totalt: 30,
                    under30år: 2,
                    innsatsgruppeIkkeStandard: 4,
                },
                antPresentasjoner: {
                    totalt: 40,
                    under30år: 5,
                    innsatsgruppeIkkeStandard: 8,
                },
            };
    }
};
