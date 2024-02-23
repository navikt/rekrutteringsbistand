/**
 * Endepunkt /statistikk
 */
import { http, HttpResponse } from 'msw';
import useSWR, { SWRResponse } from 'swr';
import { z } from 'zod';
import { formaterDatoTilApi } from '../../forside/statistikk/datoUtils';
import { getAPIwithSchema } from '../fetcher';

export const foresporselStatistikkEndepunkt = (param?: URLSearchParams) =>
    `/foresporsel-om-deling-av-cv-api/statistikk${param ? `?${param}` : ''}`;

const foresporselStatistikkSchema = z.object({
    antallSvartJa: z.number(),
    antallSvartNei: z.number(),
    antallVenterPåSvar: z.number(),
    antallUtløpteSvar: z.number(),
});

export type ForesporselStatistikkDTO = z.infer<typeof foresporselStatistikkSchema>;

interface ForesporselStatistikkProps {
    navKontor: string;
    fraOgMed: Date;
    tilOgMed: Date;
}

export const useForesporselStatistikk = ({
    navKontor,
    fraOgMed,
    tilOgMed,
}: ForesporselStatistikkProps): SWRResponse<ForesporselStatistikkDTO> => {
    return useSWR(
        foresporselStatistikkEndepunkt(
            new URLSearchParams({
                fraOgMed: formaterDatoTilApi(fraOgMed),
                tilOgMed: formaterDatoTilApi(tilOgMed),
                navKontor,
            })
        ),
        getAPIwithSchema(foresporselStatistikkSchema)
    );
};

const statistikkMock = (navKontor: string | null): ForesporselStatistikkDTO => {
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

export const foresporselStatistikkMockMsw = http.get(
    foresporselStatistikkEndepunkt(),
    ({ request }) => {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const navKontor = searchParams.get('navKontor');

        return HttpResponse.json(statistikkMock(navKontor));
    }
);
