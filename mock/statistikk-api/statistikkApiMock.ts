import { rest } from 'msw';
import { api } from '../../src/felles/api';

export const hentAntallFormidlinger = (navKontor: string) => {
    return navKontor === '0239'
        ? {
              antallFåttJobben: 26,
              antallPresentert: 108,
          }
        : {
              antallFåttJobben: 13,
              antallPresentert: 78,
          };
};

export const statistikkApiMock = [
    rest.get(`${api.statistikk}/statistikk`, (req, res, ctx) => {
        const searchParams = req.url.searchParams;
        const navKontor = searchParams.get('navKontor');

        return res(ctx.json(hentAntallFormidlinger(navKontor)));
    }),
];
