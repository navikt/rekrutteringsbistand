/**
 * Endepunkt /kandidat-api/veileder/kandidater/${kandidatnr}/listeoversikt
 */

import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import {
    mockAlleKandidatlister,
    opprettMockKandidatlisteForKandidat,
} from '../../../mock/kandidat-api/mockKandidatliste';
import { getAPI } from '../fetcher';

//TODO Bytt ut?
const convertToUrlParams = (query: any) =>
    Object.keys(query)
        .map((key) => {
            if (Array.isArray(query[key])) {
                const encodedKey = encodeURIComponent(key);
                return query[key]
                    .map((v: any) => `${encodedKey}=${encodeURIComponent(v)}`)
                    .reduce(
                        (accumulator: unknown, current: unknown) => `${accumulator}&${current}`,
                        ''
                    );
            } else {
                if (query[key]) {
                    return `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`;
                }
            }

            return '';
        })
        .join('&')
        .replace(/%20/g, '+');

interface HentKandidatHistorikkProps {
    kandidatnr?: string;
    filtrerPaaStilling?: string;
}

const hentKandidatHistorikkEndepunkt = (props: HentKandidatHistorikkProps) =>
    props.kandidatnr
        ? `/kandidat-api/veileder/kandidater/${props.kandidatnr}/listeoversikt?${convertToUrlParams(
              {
                  inkluderSlettede: 'true',
                  filtrerPaaStilling: props.filtrerPaaStilling,
              }
          )}`
        : undefined;

export const useHentKandidatHistorikk = (props: HentKandidatHistorikkProps) => {
    const swrData = useSWR(hentKandidatHistorikkEndepunkt(props), getAPI);
    return {
        ...swrData,
    };
};

// const hentKandidatHistorikkMock: hentKandidatHistorikkDTO = {};

export const hentKandidatHistorikkMockMsw = http.get(
    `/kandidat-api/veileder/kandidater/:kandidatnr/listeoversikt`,
    ({ params }) => {
        const { kandidatnr } = params;

        const kandidatlister = mockAlleKandidatlister.filter((liste) =>
            liste.kandidater.some((kandidat) => kandidat.kandidatnr === kandidatnr)
        );

        const kandidatlisterMedKandidaten = kandidatlister.map((liste) =>
            opprettMockKandidatlisteForKandidat(
                liste,
                // @ts-ignore TODO: written before strict-mode enabled
                liste.kandidater.find((kandidat) => kandidat.kandidatnr === kandidatnr)
            )
        );

        return HttpResponse.json(kandidatlisterMedKandidaten);
    }
);
