import { rest } from 'msw';
import { api } from 'felles/api';

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
    rest.get(`${api.statistikk}/statistikk`, (req, res, ctx) => {
        const searchParams = req.url.searchParams;
        const navKontor = searchParams.get('navKontor');

        return res(ctx.json(hentAntallFormidlinger(navKontor)));
    }),
];
