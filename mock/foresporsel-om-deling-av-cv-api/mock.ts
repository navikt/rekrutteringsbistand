import { addDays, startOfDay, subDays } from 'date-fns';
import { AktørId } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { rest } from 'msw';
import { api } from '../../src/felles/api';
import { Svarstatistikk } from '../../src/forside/statistikk/useSvarstatistikk';
import {
    ForespørselDeltStatus,
    ForespørselOmDelingAvCv,
    IdentType,
    TilstandPåForespørsel,
} from '../../src/kandidat/kandidatliste/knappe-rad/forespørsel-om-deling-av-cv/Forespørsel';
import { mockAlleKandidatlister } from '../kandidat-api/mockKandidatliste';
import { mockVeileder } from '../meg/mock';

export const forespørselOmDelingAvCvMock = [
    rest.get(`${api.forespørselOmDelingAvCv}/foresporsler/:stillingsId`, (req, res, ctx) => {
        const kandidatliste = mockAlleKandidatlister.find(
            (liste) => liste.stillingId === req.params.stillingsId
        );

        if (!kandidatliste) {
            return res(ctx.json([]));
        }

        const forespørslerForKandidatliste = opprettMockForespørslerOmDelingAvCv(
            kandidatliste,
            mockVeileder
        );

        return res(ctx.json(forespørslerForKandidatliste));
    }),

    // TODO: Henting for kandidat, posting og resending på kandidat

    rest.get(`${api.forespørselOmDelingAvCv}/statistikk`, (req, res, ctx) => {
        const searchParams = req.url.searchParams;
        const navKontor = searchParams.get('navKontor');

        return res(ctx.json(hentForespørslerstatistikk(navKontor)));
    }),
];

export const opprettMockForespørslerOmDelingAvCv = (
    kandidatliste: Kandidatliste,
    eier: any
): Record<AktørId, ForespørselOmDelingAvCv[]> => ({
    [kandidatliste.kandidater[0].aktørid]: [
        opprettMockForespørselOmDelingAvCv(kandidatliste, eier),
    ],
});

const opprettMockForespørselOmDelingAvCv = (
    kandidatliste: Kandidatliste,
    eier: any
): ForespørselOmDelingAvCv => ({
    aktørId: kandidatliste.kandidater[0].aktørid,
    stillingsId: kandidatliste.stillingId,
    deltAv: eier.navIdent,
    navKontor: eier.navKontor,
    deltTidspunkt: subDays(new Date(), 10).toISOString(),
    deltStatus: ForespørselDeltStatus.Sendt,
    svarfrist: startOfDay(addDays(new Date(), 5)).toISOString(),
    tilstand: TilstandPåForespørsel.HarSvart,

    svar: {
        harSvartJa: false,
        svarTidspunkt: startOfDay(subDays(new Date(), 1)).toISOString(),
        svartAv: {
            ident: eier.ident,
            identType: IdentType.NavIdent,
        },
    },
});

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
