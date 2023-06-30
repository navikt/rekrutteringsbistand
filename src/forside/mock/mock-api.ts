import fetchMock from 'fetch-mock';
import { forespørslerApiUrl, Svarstatistikk } from '../statistikk/useSvarstatistikk';
import { statistikkApiUrl } from '../statistikk/useUtfallsstatistikk';
import { hentAntallFormidlinger, hentForespørslerstatistikk } from './testdata';

fetchMock.config.fallbackToNetwork = true;
fetchMock.config.warnOnFallback = false;

fetchMock.get(`begin:${statistikkApiUrl}`, (url) => {
    const searchQuery = url.split('?').pop();
    const navKontor = new URLSearchParams(searchQuery).get('navKontor');
    const fraOgMed = new URLSearchParams(searchQuery).get('fraOgMed');
    if (fraOgMed != null && +fraOgMed.substring(5, 7) % 2 === 1) {
        return hentAntallFormidlinger('0000');
    }

    return hentAntallFormidlinger(navKontor || '0000');
});

fetchMock.get(`begin:${forespørslerApiUrl}`, (url): Svarstatistikk => {
    const searchQuery = url.split('?').pop();
    const navKontor = new URLSearchParams(searchQuery).get('navKontor');

    const fraOgMed = new URLSearchParams(searchQuery).get('fraOgMed');
    if (fraOgMed != null && +fraOgMed.substring(5, 7) % 2 === 1) {
        return hentForespørslerstatistikk('0000');
    }

    return hentForespørslerstatistikk(navKontor || '0000');
});
