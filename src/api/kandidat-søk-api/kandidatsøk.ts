/**
 * Endepunkt /kandidatsok-api/api/kandidatsøk
 */
import {
    getNummerFraSted,
    lagKandidatsøkstreng,
    stedmappingFraNyttNummer,
} from 'felles/MappingSted';
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { Søkekriterier } from '../../kandidatsok/hooks/useSøkekriterier';
import { postApiWithSchema } from '../fetcher';
import { mockKandidatsøkKandidater } from './mockKandidatsøk';

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

export const kvalifiseringsgruppekodeSchema = z.nativeEnum(Kvalifiseringsgruppekode);

export const totalSchema = z.object({
    value: z.number(),
});

export const geografiJobbonskerSchema = z.object({
    geografiKodeTekst: z.string(),
    geografiKode: z.string(),
});

export const yrkeJobbonskerObjSchema = z.object({
    styrkBeskrivelse: z.string(),
    sokeTitler: z.array(z.string()),
    primaertJobbonske: z.boolean(),
    styrkKode: z.null(),
});

export const kandidaterSchema = z.object({
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
export const navigeringSchema = z.object({
    kandidatnumre: z.array(z.string()),
});

export const kandidatSøkSchema = z.object({
    kandidater: z.array(kandidaterSchema),
    navigering: navigeringSchema,
    antallTotalt: z.number(),
});

export type KandidatsøkKandidat = z.infer<typeof kandidaterSchema>;

export type KandidatsøkProps = {
    søkekriterier: Søkekriterier;
    side: number;
    sortering: string;
};

interface IkandidatsøkProps {
    søkekriterier: Søkekriterier;
    navKontor: string | null;
}
const mapKandidatSøkProps = ({ søkekriterier, navKontor }: IkandidatsøkProps) => ({
    søkekriterier: {
        fritekst: søkekriterier.fritekst,
        portefølje: søkekriterier.portefølje,
        valgtKontor: søkekriterier.valgtKontor,
        orgenhet: navKontor,
        innsatsgruppe: søkekriterier.innsatsgruppe,
        ønsketYrke: søkekriterier.ønsketYrke,
        ønsketSted: søkekriterier.ønsketSted,
        borPåØnsketSted: søkekriterier.borPåØnsketSted,
        kompetanse: søkekriterier.kompetanse,
        førerkort: søkekriterier.førerkort,
        prioritertMålgruppe: søkekriterier.prioritertMålgruppe,
        hovedmål: søkekriterier.hovedmål,
        utdanningsnivå: søkekriterier.utdanningsnivå,
        arbeidserfaring: søkekriterier.arbeidserfaring,
        ferskhet: søkekriterier.ferskhet,
        språk: søkekriterier.språk,
    },
    side: søkekriterier.side,
    sortering: søkekriterier.sortering,
});

export const useKandidatsøk = (props: IkandidatsøkProps) => {
    const søkeprops = mapKandidatSøkProps(props);

    const søkekriterier = søkeprops.søkekriterier;

    const queryParams = new URLSearchParams({
        side: String(søkeprops.side),
        sortering: søkeprops.sortering,
    });

    const utvidedeSøkekriterier = {
        ...søkekriterier,
        ønsketSted: Array.from(søkekriterier.ønsketSted).flatMap((sted) => {
            const gamleSteder = stedmappingFraNyttNummer.get(getNummerFraSted(sted));
            return gamleSteder
                ? [sted, ...gamleSteder.map((s) => lagKandidatsøkstreng(s))]
                : [sted];
        }),
    };

    return useSWR(
        {
            url: kandidatsøkEndepunkt,
            body: utvidedeSøkekriterier,
            queryParams: queryParams.toString(),
        },
        (data) => {
            return postApiWithSchema(kandidatSøkSchema)(data);
        }
    );
};

export const kandidatsøkMockMsw = http.post(kandidatsøkEndepunkt, (_) =>
    HttpResponse.json({
        kandidater: mockKandidatsøkKandidater,
        antallTotalt: mockKandidatsøkKandidater.length,
        navigering: { kandidatnumre: mockKandidatsøkKandidater.map((k) => k.arenaKandidatnr) },
    })
);
