import { describe, expect, test } from '@jest/globals';

import { Tag } from './hierarkiAvTags';
import {
    tagsInneholderInkluderingsmuligheter,
    leggTilTagUnderRegistrering,
    fjernTagUnderRegistrering,
    fjernTagFraFilteret,
} from './utils';

const utenTilretteleggingFysisk = [
    Tag.PrioritertMålgruppe,
    Tag.MålgruppeErUngeUnder30,
    Tag.Tilrettelegging,
    Tag.TilretteleggingArbeidshverdagen,
];

const medTilretteleggingFysisk = [...utenTilretteleggingFysisk, Tag.TilretteleggingFysisk];

describe('Registrere inkluderingsmuligheter på en stilling', () => {
    test('leggTilTagUnderRegistrering skal legge til tag', () => {
        expect(
            leggTilTagUnderRegistrering(utenTilretteleggingFysisk, Tag.TilretteleggingFysisk)
        ).toEqual(expect.arrayContaining(medTilretteleggingFysisk));
    });

    test('leggTilTagUnderRegistrering med en subtag skal legge til dens hovedtag hvis den ikke finnes fra før', () => {
        expect(leggTilTagUnderRegistrering([], Tag.TilretteleggingFysisk)).toEqual(
            expect.arrayContaining([Tag.Tilrettelegging, Tag.TilretteleggingFysisk])
        );
    });

    test('leggTilTagUnderRegistrering med en subtag skal ikke legge til dens hovedtag hvis den er registrert fra før', () => {
        expect(
            leggTilTagUnderRegistrering([Tag.PrioritertMålgruppe], Tag.MålgruppeHullICVen)
        ).toEqual(expect.arrayContaining([Tag.PrioritertMålgruppe, Tag.MålgruppeHullICVen]));
    });

    test('fjernTagUnderRegistrering skal fjerne en tag', () => {
        expect(
            fjernTagUnderRegistrering(medTilretteleggingFysisk, Tag.TilretteleggingFysisk)
        ).toEqual(expect.arrayContaining(utenTilretteleggingFysisk));
    });

    test('fjernTagUnderRegistrering med siste subtag innen en inkluderingsmulighet skal også fjerne dens hovedtag', () => {
        expect(
            fjernTagUnderRegistrering(
                [Tag.PrioritertMålgruppe, Tag.MålgruppeErUngeUnder30],
                Tag.MålgruppeErUngeUnder30
            )
        ).toEqual(expect.arrayContaining([]));
    });
});

describe('Filtrering på inkluderingsmuligheter', () => {
    test('fjernTagFraFilteret med en hovedtag skal også fjerne dens subtags', () => {
        expect(
            fjernTagFraFilteret(
                [
                    Tag.Tilrettelegging,
                    Tag.TilretteleggingArbeidshverdagen,
                    Tag.TilretteleggingFysisk,
                ],
                Tag.Tilrettelegging
            )
        ).toEqual(expect.arrayContaining([]));
    });
});

describe('Parsing av tags og inkluderingsmuligheter', () => {
    test('En liste med én inkluderingsmulighet skal inneholde inkluderingsmuligheter', () => {
        expect(tagsInneholderInkluderingsmuligheter(JSON.stringify([Tag.Tilrettelegging]))).toBe(
            true
        );
    });

    test('Ugyldig JSON skal ikke inneholde inkluderingsmuligheter', () => {
        expect(tagsInneholderInkluderingsmuligheter('dsa')).toBe(false);
    });

    test('En udefinert variabel skal være tom', () => {
        expect(tagsInneholderInkluderingsmuligheter(undefined)).toBe(null);
    });

    test('En tom liste skal ikke inneholde inkluderingsmuligheter', () => {
        expect(tagsInneholderInkluderingsmuligheter('[]')).toBe(false);
    });

    test('En liste med en udefinert tag skal ikke inneholde inkluderingsmuligheter', () => {
        expect(tagsInneholderInkluderingsmuligheter(JSON.stringify(['IKKE_GYLDIG_TAG']))).toBe(
            false
        );
    });
});
