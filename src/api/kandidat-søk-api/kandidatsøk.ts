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

export enum Innsatsgruppe {
    SPESIELT_TILPASSET_INNSATS = 'SPESIELT_TILPASSET_INNSATS',
    SITUASJONSBESTEMT_INNSATS = 'SITUASJONSBESTEMT_INNSATS',
    STANDARD_INNSATS = 'STANDARD_INNSATS',
    VARIG_TILPASSET_INNSATS = 'VARIG_TILPASSET_INNSATS',
    GRADERT_VARIG_TILPASSET_INNSATS = 'GRADERT_VARIG_TILPASSET_INNSATS',
    HAR_IKKE_GJELDENDE_14A_VEDTAK = 'HAR_IKKE_GJELDENDE_14A_VEDTAK',
}

export const innsatsgruppeSchema = z.nativeEnum(Innsatsgruppe);

export const totalSchema = z.object({
    value: z.number(),
});

export const geografiJobbonskerSchema = z.object({
    geografiKodeTekst: z.string(),
    geografiKode: z.string().nullable(),
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
    innsatsgruppe: innsatsgruppeSchema,
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
        side: Math.max(1, Math.floor(søkeprops.side)).toString(),
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
