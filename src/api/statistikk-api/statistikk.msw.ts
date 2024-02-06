import { HttpResponse, http } from 'msw';
import { hentAntallFormidlinger } from '../../../mock/statistikk-api/mock';
import { statistikkEndepunkter } from './statistikk.api';

export const statistikkMockHandlers = [
    http.get(statistikkEndepunkter.statistikk(), ({ request }) => {
        const url = new URL(request.url);
        const navKontor = url.searchParams.get('navKontor');

        const statistikk = hentAntallFormidlinger(navKontor);

        return HttpResponse.json(statistikk);
        // return statistikk ? HttpResponse.json(statistikk) : new HttpResponse(null, { status: 404 });
    }),
];
