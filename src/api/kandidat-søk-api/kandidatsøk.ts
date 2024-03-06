/**
 * Endepunkt /kandidatsok-api/api//kandidatsøk
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { mockKandidatsøkKandidater } from '../../../mock/kandidatsok-proxy/mockKandidat';
import { postApi } from '../fetcher';
import { KandidatTilKandidatsøk } from 'felles/domene/kandidat/Kandidat';
import { Portefølje } from '../../kandidatsok/filter/porteføljetabs/PorteføljeTabs';
import { FiltrerbarInnsatsgruppe } from '../../kandidatsok/filter/Jobbmuligheter';
import { Nivå } from '../../kandidatsok/filter/Utdanningsnivå';
import { PrioritertMålgruppe } from '../../kandidatsok/filter/prioriterte-målgrupper/PrioriterteMålgrupper';
import { Klasse } from '../../kandidatsok/api/query/queryMedFørerkort';
import { Mål } from '../../kandidatsok/filter/Hovedmål';

const kandidatsøkEndepunkt = '/kandidatsok-api/api/kandidatsok';

export type KandidatsøkDTO = {
    kandidatsøkKandidater: KandidatTilKandidatsøk[];
    isLoading: boolean;
    error: any;
    totalHits: number;
};

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
    aktorId: z.string(),
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

export type SøkekriterierDto = {
    fritekst: string | null;
    portefølje: Portefølje;
    valgtKontor: Set<string>;
    innsatsgruppe: Set<FiltrerbarInnsatsgruppe>;
    ønsketYrke: Set<string>;
    ønsketSted: Set<string>;
    borPåØnsketSted: boolean | null;
    kompetanse: Set<string>;
    førerkort: Set<Klasse>;
    prioritertMålgruppe: Set<PrioritertMålgruppe>;
    hovedmål: Set<Mål>;
    utdanningsnivå: Set<Nivå>;
    arbeidserfaring: Set<string>;
    ferskhet: number | null;
    språk: Set<string>;
    orgenhet: string | null;
};

export type KandidatsøkProps = {
    søkekriterier: SøkekriterierDto;
    side: number;
    sortering: string;
};

export const useKandidatsøk = (props: KandidatsøkProps): KandidatsøkDTO => {
    const søkekriterier: SøkekriterierDto = props.søkekriterier;

    const queryParams = new URLSearchParams({
        side: String(props.side),
        sortering: props.sortering,
    });

    const key = `${kandidatsøkEndepunkt}?${props.toString()}`;

    const swr = useSWR(key, () => postApi(kandidatsøkEndepunkt, { ...søkekriterier }, queryParams));

    const kandidatsøkKandidater: KandidatTilKandidatsøk[] = swr?.data?.hits?.hits.map(
        (k: any) => k._source
    );

    const totalHits = swr?.data?.hits?.total?.value;

    return {
        ...swr,
        kandidatsøkKandidater,
        totalHits,
    };
};

export const kandidatsøkMockMsw = http.post(kandidatsøkEndepunkt, (_) =>
    HttpResponse.json({
        hits: {
            hits: mockKandidatsøkKandidater.map((kandidat) => ({
                _source: kandidat,
            })),
        },
    })
);
