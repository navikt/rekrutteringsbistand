/**
 * Endepunkt /kandidatsok-api/api//kandidatsøk
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { mockKandidatsøkKandidater } from '../../../mock/kandidatsok-proxy/mockKandidat';
import { postApi } from '../fetcher';

const kandidatsøkEndepunkt = '/kandidatsok-api/api/kandidatsøk';

const jobbønskeSchema = z.object({
    styrkKode: z.string().nullable(),
    styrkBeskrivelse: z.string().nullable(),
    primaertJobbonske: z.boolean(),
    sokeTitler: z.array(z.string()),
});

const jobbønskeStedSchema = z.object({
    geografiKodeTekst: z.string(),
    geografiKode: z.string(),
});

const kandidatsøkKandidatSchema = z.object({
    fodselsnummer: z.string(),
    fornavn: z.string(),
    etternavn: z.string(),
    arenaKandidatnr: z.string(),
    kvalifiseringsgruppekode: z.string(),
    yrkeJobbonskerObj: z.array(jobbønskeSchema),
    geografiJobbonsker: z.array(jobbønskeStedSchema),
    kommuneNavn: z.string(),
    postnummer: z.string(),
});

export type KandidatsøkKandidat = z.infer<typeof kandidatsøkKandidatSchema>;

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

export const useKandidatsøk = (props: KandidatsøkProps) => {
    const swrData = useSWR({ path: kandidatsøkEndepunkt, props }, ({ path }) =>
        postApi(path, { ...props })
    );

    if (swrData.data) {
        const kandidatsøkKandidaterData: KandidatsøkKandidater = swrData?.data?.hits?.hits.map(
            (k: any) => k._source
        );
        const kandidatsøkKandidater = kandidatsøkKandidatSchema.parse(kandidatsøkKandidaterData);

        return {
            ...swrData,
            kandidatsøkKandidater,
        };
    }

    return swrData;
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
