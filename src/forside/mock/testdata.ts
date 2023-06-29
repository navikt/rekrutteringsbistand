import { Svarstatistikk } from '../statistikk/useSvarstatistikk';

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

export const hentForespørslerstatistikk = (navKontor: string): Svarstatistikk => {
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
