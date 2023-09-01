import { addDays, startOfDay, subDays } from 'date-fns';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';
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
import { mockAlleKandidatCv } from '../kandidat-api/mockKandidatCv';
import { mockAlleKandidatlister } from '../kandidat-api/mockKandidatliste';
import { mockVeileder } from '../meg/mock';
import { mockStilling } from '../stilling-api/mockStilling';

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

    rest.get(`${api.forespørselOmDelingAvCv}/foresporsler/kandidat/:aktorId`, (req, res, ctx) => {
        const kandidat = mockAlleKandidatCv.find((cv) => cv.aktorId === req.params.aktorId);

        if (!kandidat) {
            return res(ctx.status(404));
        }

        const forespørslerForKandidat = opprettMockForespørslerOmDelingAvCvForKandidat(
            kandidat,
            mockStilling.uuid,
            mockVeileder
        );

        return res(ctx.json(forespørslerForKandidat));
    }),

    rest.post(`${api.forespørselOmDelingAvCv}/foresporsler`, (_, res, ctx) => res(ctx.status(201))),
    rest.post(`${api.forespørselOmDelingAvCv}/foresporsler/kandidat/:aktorId`, (_, res, ctx) =>
        res(ctx.status(201))
    ),

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
        opprettMockForespørselOmDelingAvCv(
            kandidatliste.kandidater[0].aktørid,
            kandidatliste.stillingId,
            eier
        ),
    ],
});

export const opprettMockForespørslerOmDelingAvCvForKandidat = (
    kandidat: KandidatCv,
    stillingsId: string,
    eier: any
): ForespørselOmDelingAvCv[] => [
    opprettMockForespørselOmDelingAvCv(kandidat.aktorId, stillingsId, eier),
];

const opprettMockForespørselOmDelingAvCv = (
    aktørId: string,
    stillingsId: string,
    eier: any
): ForespørselOmDelingAvCv => ({
    aktørId,
    stillingsId,
    deltAv: eier.navIdent,
    navKontor: eier.navKontor,
    deltTidspunkt: subDays(new Date(), 10).toISOString(),
    deltStatus: ForespørselDeltStatus.Sendt,
    svarfrist: startOfDay(addDays(new Date(), 5)).toISOString(),
    tilstand: TilstandPåForespørsel.HarSvart,

    svar: {
        harSvartJa: true,
        svarTidspunkt: startOfDay(subDays(new Date(), 1)).toISOString(),
        svartAv: {
            ident: eier.ident,
            identType: IdentType.NavIdent,
        },
    },
});

export const hentForespørslerstatistikk = (navKontor: string | null): Svarstatistikk => {
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
