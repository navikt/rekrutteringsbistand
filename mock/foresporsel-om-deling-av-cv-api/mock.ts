import { rest } from 'msw';
import { api } from '../../src/felles/api';
import { Svarstatistikk } from '../../src/forside/statistikk/useSvarstatistikk';

export const hentForespørslerstatistikk = (navKontor?: string): Svarstatistikk => {
    return navKontor === '0239'
        ? {
              antallSvartJa: 26,
              antallSvartNei: 108,
              antallUtløpteSvar: 22,
              antallVenterPåSvar: 0,
          }
        : {
              antallSvartJa: 13,
              antallSvartNei: 78,
              antallUtløpteSvar: 100,
              antallVenterPåSvar: 0,
          };
};

export const forespørselOmDelingAvCvMock = [
    rest.get(`${api.forespørselOmDelingAvCv}/statistikk`, (req, res, ctx) => {
        const searchParams = req.url.searchParams;
        const navKontor = searchParams.get('navKontor');

        return res(ctx.json(hentForespørslerstatistikk(navKontor)));
    }),
];
