/**
 * Endepunkt /kandidatsok-api/api/kandidatsøk
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { postApi } from '../fetcher';
import { Portefølje } from '../../kandidatsok/filter/porteføljetabs/PorteføljeTabs';
import { FiltrerbarInnsatsgruppe } from '../../kandidatsok/filter/Jobbmuligheter';
import { Nivå } from '../../kandidatsok/filter/Utdanningsnivå';
import { PrioritertMålgruppe } from '../../kandidatsok/filter/prioriterte-målgrupper/PrioriterteMålgrupper';
import { Mål } from '../../kandidatsok/filter/Hovedmål';
import { mockKandidatsøkKandidater } from './mockKandidatsøk';
import { Førerkortklasse } from '../../kandidatsok/hooks/useSøkekriterier';
import { finnAlleVersjonerAvStedkoder } from 'felles/MappingSted';
import {
    getNummerFraSted,
    lagKandidatsøkstreng,
    stedmappingFraNyttNummer,
} from 'felles/MappingStedV2';

const kandidatsøkEndepunkt = '/kandidatsok-api/api/kandidatsok';

export enum Kvalifiseringsgruppekode {
    Batt = 'BATT',
    Ikval = 'IKVAL',
    Varig = 'VARIG',
    Bform = 'BFORM',
    Andre = 'ANDRE',
    Ivurd = 'IVURD',
    Bkart = 'BKART',
    Oppfi = 'OPPFI',
    Vurdi = 'VURDI',
    Vurdu = 'VURDU',
}

export const yrkeJobbonskerObjSchema = z.object({
    styrkBeskrivelse: z.string(),
    sokeTitler: z.array(z.string()),
    primaertJobbonske: z.boolean(),
    styrkKode: z.null(),
});

export const geografiJobbonskerSchema = z.object({
    geografiKodeTekst: z.string(),
    geografiKode: z.string(),
});

export const kvalifiseringsgruppekodeSchema = z.nativeEnum(Kvalifiseringsgruppekode);

export const kandidatsøkKandidatSchema = z.object({
    yrkeJobbonskerObj: z.array(yrkeJobbonskerObjSchema),
    etternavn: z.string(),
    postnummer: z.string().nullable(),
    arenaKandidatnr: z.string(),
    kommuneNavn: z.string().nullable(),
    geografiJobbonsker: z.array(geografiJobbonskerSchema),
    fornavn: z.string(),
    fodselsnummer: z.string(),
    kvalifiseringsgruppekode: kvalifiseringsgruppekodeSchema,
});

export type KandidatsøkKandidat = z.infer<typeof kandidatsøkKandidatSchema>;

export type SøkekriterierDto = {
    fritekst: string | null;
    portefølje: Portefølje;
    valgtKontor: Set<string>;
    innsatsgruppe: Set<FiltrerbarInnsatsgruppe>;
    ønsketYrke: Set<string>;
    ønsketSted: Set<string>;
    borPåØnsketSted: boolean | null;
    kompetanse: Set<string>;
    førerkort: Set<Førerkortklasse>;
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

export const useKandidatsøk = (props: KandidatsøkProps) => {
    const søkekriterier: SøkekriterierDto = props.søkekriterier;

    const queryParams = new URLSearchParams({
        side: String(props.side),
        sortering: props.sortering,
    });

    const utvidedeSøkekriterier = {
        ...søkekriterier,
        ønsketSted: Array.from(søkekriterier.ønsketSted).flatMap((sted) => {
            const gamleSteder = stedmappingFraNyttNummer.get(getNummerFraSted(sted));
            return gamleSteder ? gamleSteder.map((s) => lagKandidatsøkstreng(s)) : [sted];
        }),
    };

    const swr = useSWR({ path: kandidatsøkEndepunkt, props }, ({ path }) =>
        postApi(path, utvidedeSøkekriterier, queryParams)
    );

    const kandidatsøkKandidater: KandidatsøkKandidat[] = swr?.data?.hits?.hits.map((k: any) =>
        kandidatsøkKandidatSchema.parse(k._source)
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
            hits: mockKandidatsøkKandidater.map((kandidat: KandidatsøkKandidat) => ({
                _source: kandidat,
            })),
        },
    })
);
