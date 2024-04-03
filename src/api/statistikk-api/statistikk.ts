/**
 * Endepunkt /statistikk
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { formaterDatoTilApi } from '../../forside/statistikk/datoUtils';
import { getAPIwithSchema } from '../fetcher';

export const statistikkEndepunkt = (param?: URLSearchParams) =>
    `/statistikk-api/statistikk${param ? `?${param}` : ''}`;

const antallDTOSchema = z.object({
    totalt: z.number(),
    under30år: z.number(),
    innsatsgruppeIkkeStandard: z.number(),
});

const statistikkDTOSchema = z.object({
    antPresentasjoner: antallDTOSchema,
    antFåttJobben: antallDTOSchema,
});

export type AntallDTO = z.infer<typeof antallDTOSchema>;
export type StatistikkDTO = z.infer<typeof statistikkDTOSchema>;
interface IuseUtfallsstatistikk {
    navKontor: string;
    fraOgMed: Date;
    tilOgMed: Date;
}

export const useStatistikk = ({ navKontor, fraOgMed, tilOgMed }: IuseUtfallsstatistikk) => {
    return useSWR(
        statistikkEndepunkt(
            new URLSearchParams({
                fraOgMed: formaterDatoTilApi(fraOgMed),
                tilOgMed: formaterDatoTilApi(tilOgMed),
                navKontor,
            })
        ),
        getAPIwithSchema(statistikkDTOSchema)
    );
};

const statistikkMock = (navKontor: string | null): StatistikkDTO | null => {
    switch (navKontor) {
        case '0239':
            return {
                antFåttJobben: {
                    totalt: 777,
                    under30år: 333,
                    innsatsgruppeIkkeStandard: 111,
                },
                antPresentasjoner: {
                    totalt: 888,
                    under30år: 444,
                    innsatsgruppeIkkeStandard: 222,
                },
            };
        case '0000':
            return null;
        default:
            return {
                antFåttJobben: {
                    totalt: 30,
                    under30år: 2,
                    innsatsgruppeIkkeStandard: 4,
                },
                antPresentasjoner: {
                    totalt: 40,
                    under30år: 5,
                    innsatsgruppeIkkeStandard: 8,
                },
            };
    }
};

export const statistikkMockMsw = http.get(statistikkEndepunkt(), ({ request }) => {
    const url = new URL(request.url);
    const navKontor = url.searchParams.get('navKontor');

    const statistikk = statistikkMock(navKontor);

    return HttpResponse.json(statistikk);
});
