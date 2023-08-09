import { rest } from 'msw';
import { api } from '../../src/felles/api';

export const hentAntallFormidlinger = (navKontor: string) => {
    return navKontor === '0239'
        ? {
              antallFåttJobben: 26,
              antallFåttJobbenIPrioritertMålgruppe: 21,
              antallPresentert: 108,
              antallPresentertIPrioritertMålgruppe: 99,
          }
        : {
              antallFåttJobben: 13,
              antallFåttJobbenIPrioritertMålgruppe: 9,
              antallPresentert: 78,
              antallPresentertIPrioritertMålgruppe: 67,
          };
};

export const statistikkApiMock = [
    rest.get(`${api.statistikk}/statistikk`, (req, res, ctx) => {
        const searchParams = req.url.searchParams;
        const navKontor = searchParams.get('navKontor');

        return res(ctx.json(hentAntallFormidlinger(navKontor)));
    }),
];
