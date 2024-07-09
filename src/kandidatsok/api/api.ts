import { api, videresendTilInnlogging } from 'felles/api';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { LagreKandidaterDto } from '../kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import { MineKandidatlister } from '../kandidatliste/useMineKandidatlister';

export const hentMineKandidatlister = async (
    side: number,
    pageSize: number
): Promise<MineKandidatlister> => {
    const respons = await get(
        `${api.kandidat}/veileder/kandidatlister?kunEgne=true&status=ÅPEN&pagesize=${pageSize}${
            side > 1 ? `&pagenumber=${side - 1}` : ''
        }`
    );

    return parseJsonEllerKastFeil(respons, 'Klarte ikke å hente mine kandidatlister');
};

export const hentKandidatlisteMedStillingsId = async (
    stillingsId: string
): Promise<Kandidatliste> => {
    const respons = await get(`${api.kandidat}/veileder/stilling/${stillingsId}/kandidatliste`);

    return parseJsonEllerKastFeil(
        respons,
        `Fant ikke kandidatliste med stillingsId ${stillingsId}`
    );
};

export const hentKandidatliste = async (kandidatlisteId: string): Promise<Kandidatliste> => {
    const respons = await get(`${api.kandidat}/veileder/kandidatlister/${kandidatlisteId}`);

    return parseJsonEllerKastFeil(respons, `Fant ikke kandidatliste med id ${kandidatlisteId}`);
};

export const lagreKandidaterIValgteKandidatlister = async (
    lagreKandidaterDto: LagreKandidaterDto,
    kandidatlister: string[]
) => {
    return Promise.all(
        kandidatlister.map((kandidatlisteId) =>
            lagreKandidaterIKandidatliste(lagreKandidaterDto, kandidatlisteId)
        )
    );
};

export const lagreKandidaterIKandidatliste = async (
    lagreKandidaterDto: LagreKandidaterDto,
    kandidatlisteId: string
) => {
    await post(
        `${api.kandidat}/veileder/kandidatlister/${kandidatlisteId}/kandidater`,
        lagreKandidaterDto
    );
};

const parseJsonEllerKastFeil = async (respons: Response, feil: string) => {
    if (respons.ok) {
        return await respons.json();
    } else if (respons.status === 401) {
        videresendTilInnlogging();
        throw new Error('Er ikke logget inn');
    } else {
        throw respons;
    }
};

export const post = (url: string, body: object) =>
    fetch(url, {
        body: JSON.stringify(body),
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

export const get = (url: string) =>
    fetch(url, {
        method: 'GET',
        credentials: 'include',
    });
