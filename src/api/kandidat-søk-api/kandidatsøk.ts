/**
 * Endepunkt /kandidatsok-api/api/kandidatsøk
 */
import {
    getNummerFraSted,
    lagKandidatsøkstreng,
    stedmappingFraNyttNummer,
} from 'felles/MappingSted';
import { HttpResponse, http } from 'msw';
import { useMemo } from 'react';
import useSWR from 'swr';
import { z } from 'zod';
import { IKandidatSøkekriterier } from '../../kandidatsok/hooks/useSøkekriterier';
import { postApiWithSchema } from '../fetcher';
import { mockKandidatsøkKandidater } from './mockKandidatsøk';

const kandidatsøkEndepunkt = '/kandidatsok-api/api/kandidatsok';

export enum Portefølje {
    MINE_BRUKERE = 'minebrukere',
    VALGTE_KONTORER = 'valgtekontorer',
    MINE_KONTORER = 'minekontorer',
    MITT_KONTOR = 'mittkontor',
    ALLE = 'alle',
}

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

export type IKandidatSøk = z.infer<typeof kandidatSøkSchema>;

export type KandidatsøkKandidat = z.infer<typeof kandidaterSchema>;

interface IuseKandidatsøk {
    portefølje: Portefølje;
    søkeprops: IKandidatSøkekriterier;
}

export const useKandidatsøk = ({ søkeprops, portefølje }: IuseKandidatsøk) => {
    const queryParams = new URLSearchParams({
        side: Number.isFinite(søkeprops.side) ? String(søkeprops.side) : '1',
        sortering: søkeprops.sortering,
    });

    const utvidedeSøkekriterier = useMemo(
        () => ({
            ...søkeprops,
            portefølje,
            ønsketSted: Array.from(søkeprops.ønsketSted).flatMap((sted) => {
                const gamleSteder = stedmappingFraNyttNummer.get(getNummerFraSted(sted));
                return gamleSteder
                    ? [sted, ...gamleSteder.map((s) => lagKandidatsøkstreng(s))]
                    : [sted];
            }),
        }),
        [søkeprops, portefølje]
    );

    return useSWR(
        {
            url: `${kandidatsøkEndepunkt}/${portefølje}`,
            body: utvidedeSøkekriterier,
            queryParams: queryParams.toString(),
        },
        (data) => {
            return postApiWithSchema(kandidatSøkSchema)(data);
        }
    );
};

export const kandidatsøkMockMsw = http.post(kandidatsøkEndepunkt + '/*', (_) =>
    HttpResponse.json({
        kandidater: mockKandidatsøkKandidater,
        antallTotalt: mockKandidatsøkKandidater.length,
        navigering: { kandidatnumre: mockKandidatsøkKandidater.map((k) => k.arenaKandidatnr) },
    })
);
