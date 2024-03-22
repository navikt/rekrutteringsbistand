import { addDays, startOfDay, subDays } from 'date-fns';
import Kandidat from 'felles/domene/kandidat/Kandidat';
import { AktørId } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { HttpResponse, http } from 'msw';
import { api } from '../../src/felles/api';
import {
    ForespørselDeltStatus,
    ForespørselOmDelingAvCv,
    IdentType,
    TilstandPåForespørsel,
} from '../../src/kandidat/kandidatliste/knappe-rad/forespørsel-om-deling-av-cv/Forespørsel';
import { mockAlleKandidatlister } from '../kandidat-api/mockKandidatliste';
import { mockAlleKandidater } from '../kandidat-api/mockKandidat';
import { mockVeileder } from '../mockVeileder';
import { mockStilling } from '../stilling-api/mockStilling';

export const forespørselOmDelingAvCvMock = [
    http.get(`${api.forespørselOmDelingAvCv}/foresporsler/:stillingsId`, ({ params }) => {
        const { stillingsId } = params;
        const kandidatliste = mockAlleKandidatlister.find(
            (liste) => liste.stillingId === stillingsId
        );

        if (!kandidatliste) {
            return new HttpResponse(null, { status: 200 });
        }

        const forespørslerForKandidatliste = opprettMockForespørslerOmDelingAvCv(
            kandidatliste,
            mockVeileder
        );
        return HttpResponse.json(forespørslerForKandidatliste);
    }),

    http.get(`${api.forespørselOmDelingAvCv}/foresporsler/kandidat/:aktorId`, ({ params }) => {
        const { aktorId } = params;
        const kandidat = mockAlleKandidater.find((cv) => cv.aktorId === aktorId);

        if (!kandidat) {
            return new HttpResponse(null, {
                status: 404,
            });
        }

        const forespørslerForKandidat = opprettMockForespørslerOmDelingAvCvForKandidat(
            kandidat,
            mockStilling.uuid,
            mockVeileder
        );

        return HttpResponse.json(forespørslerForKandidat);
    }),

    http.post(
        `${api.forespørselOmDelingAvCv}/foresporsler`,
        (_) => new HttpResponse(null, { status: 201 })
    ),

    http.post(
        `${api.forespørselOmDelingAvCv}/foresporsler/kandidat/:aktorId`,
        (_) => new HttpResponse(null, { status: 201 })
    ),
];

export const opprettMockForespørslerOmDelingAvCv = (
    kandidatliste: Kandidatliste,
    eier: any
): Record<AktørId, ForespørselOmDelingAvCv[]> => ({
    // @ts-ignore TODO: written before strict-mode enabled
    [kandidatliste.kandidater[0].aktørid]: [
        opprettMockForespørselOmDelingAvCv(
            // @ts-ignore TODO: written before strict-mode enabled
            kandidatliste.kandidater[0].aktørid,
            kandidatliste.stillingId,
            eier
        ),
    ],
});

export const opprettMockForespørslerOmDelingAvCvForKandidat = (
    kandidat: Kandidat,
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
