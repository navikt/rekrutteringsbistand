import { api } from 'felles/api';
import { HttpResponse, http } from 'msw';

export const hentAntallFormidlinger = (navKontor: string) => {
    return navKontor === '0239'
        ? {
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
          }
        : {
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
};

export const statistikkApiMock = [
    http.get(`${api.statistikk}/statistikk`, ({ request }) => {
        const url = new URL(request.url);
        const navKontor = url.searchParams.get('navKontor');

        return HttpResponse.json(hentAntallFormidlinger(navKontor));
    }),
];
