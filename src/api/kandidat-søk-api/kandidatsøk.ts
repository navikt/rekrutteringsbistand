/**
 * Endepunkt /kandidatsok-api/api//kandidatsøk
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { mockKandidatsøkKandidater } from '../../../mock/kandidatsok-proxy/mockKandidat';
import { postApi } from '../fetcher';
import { Jobbønske, JobbønskeSted } from 'felles/domene/kandidat/Jobbprofil';

const kandidatsøkEndepunkt = '/kandidatsok-api/api/kandidatsøk';

export type KandidatsøkDTO = {
    kandidatsøkKandidater: KandidatsøkKandidater;
    isLoading: boolean;
    error: any;
};

export type KandidatsøkKandidat = {
    fodselsnummer: string;
    fornavn: string;
    etternavn: string;
    arenaKandidatnr: string;
    kvalifiseringsgruppekode: string;
    yrkeJobbonskerObj: Jobbønske[];
    geografiJobbonsker: JobbønskeSted[];
    kommuneNavn: string;
    postnummer: string;
};

export type KandidatsøkKandidater = KandidatsøkKandidat[];

export interface KandidatsøkProps {
    multisøkefelt: string;
    arbeidsønsker: string;
    sted: string;
    innsatsgrupper: string[];
    hovedmål: string[];
    kompetanse: string[];
    førerkort: string[];
    språk: string[];
    arbeidserfaring: string[];
    nyligArbeidserfaring: string;
    utdanningsnivå: string[];
    prioriterteMålgrupper: string[];
    veilederIdent: string; //(evt isteden boolean + hente fra context)
    kontorOrgEnhet: string;
    navKontor: string[];
}

export const useKandidatsøk = (props: KandidatsøkProps): KandidatsøkDTO => {
    const swrData = useSWR({ path: kandidatsøkEndepunkt, props }, ({ path }) =>
        postApi(path, { ...props })
    );
    const kandidatsøkKandidater: KandidatsøkKandidater = swrData?.data?.hits?.hits.map(
        (k: any) => k._source
    );

    return {
        ...swrData,
        kandidatsøkKandidater,
    };
};

export const kandidatsøkMockMsw = http.get(kandidatsøkEndepunkt, (_) =>
    HttpResponse.json({
        hits: {
            hits: [
                {
                    _source: mockKandidatsøkKandidater,
                },
            ],
        },
    })
);
