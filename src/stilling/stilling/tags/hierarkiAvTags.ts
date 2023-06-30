export enum Tag {
    Tilrettelegging = 'INKLUDERING',
    TilretteleggingArbeidstid = 'INKLUDERING__ARBEIDSTID',
    TilretteleggingFysisk = 'INKLUDERING__FYSISK',
    TilretteleggingArbeidshverdagen = 'INKLUDERING__ARBEIDSMILJØ',
    TilretteleggingGrunnleggende = 'INKLUDERING__GRUNNLEGGENDE',

    TiltakEllerVirkemiddel = 'TILTAK_ELLER_VIRKEMIDDEL',
    VirkemiddelLønnstilskudd = 'TILTAK_ELLER_VIRKEMIDDEL__LØNNSTILSKUDD',
    VirkemiddelMentortilskudd = 'TILTAK_ELLER_VIRKEMIDDEL__MENTORTILSKUDD',
    VirkemiddelLærlingplass = 'TILTAK_ELLER_VIRKEMIDDEL__LÆRLINGPLASS',

    PrioritertMålgruppe = 'PRIORITERT_MÅLGRUPPE',
    MålgruppeErUngeUnder30 = 'PRIORITERT_MÅLGRUPPE__UNGE_UNDER_30',
    MålgruppeErSeniorerOver50 = 'PRIORITERT_MÅLGRUPPE__SENIORER_OVER_45',
    MålgruppeKommerFraLandUtenforEØS = 'PRIORITERT_MÅLGRUPPE__KOMMER_FRA_LAND_UTENFOR_EØS',
    MålgruppeHullICVen = 'PRIORITERT_MÅLGRUPPE__HULL_I_CV_EN',
    MålgruppeLiteEllerIngenUtdanning = 'PRIORITERT_MÅLGRUPPE__LITE_ELLER_INGEN_UTDANNING',
    MålgruppeLiteEllerIngenArbeidserfaring = 'PRIORITERT_MÅLGRUPPE__LITE_ELLER_INGEN_ARBEIDSERFARING',

    StatligInkluderingsdugnad = 'STATLIG_INKLUDERINGSDUGNAD',
}

export enum InkluderingsmulighetForDirektemeldtStilling {
    Tilrettelegging = Tag.Tilrettelegging,
    TiltakEllerVirkemiddel = Tag.TiltakEllerVirkemiddel,
    PrioriterteMålgrupper = Tag.PrioritertMålgruppe,
    StatligInkluderingsdugnad = Tag.StatligInkluderingsdugnad,
}

export enum InkluderingsmulighetForEksternStilling {
    Tilrettelegging = Tag.Tilrettelegging,
    StatligInkluderingsdugnad = Tag.StatligInkluderingsdugnad,
}

export enum Inkluderingsmulighet {
    Tilrettelegging = Tag.Tilrettelegging,
    TiltakEllerVirkemiddel = Tag.TiltakEllerVirkemiddel,
    PrioriterteMålgrupper = Tag.PrioritertMålgruppe,
    StatligInkluderingsdugnad = Tag.StatligInkluderingsdugnad,
}

type GruppeMedTags = {
    hovedtag?: Tag;
    subtags: Tag[];
};

export const hierarkiAvTagsForDirektemeldteStillinger: Record<
    InkluderingsmulighetForDirektemeldtStilling,
    GruppeMedTags
> = {
    [InkluderingsmulighetForDirektemeldtStilling.Tilrettelegging]: {
        hovedtag: Tag.Tilrettelegging,
        subtags: [
            Tag.TilretteleggingArbeidstid,
            Tag.TilretteleggingArbeidshverdagen,
            Tag.TilretteleggingFysisk,
            Tag.TilretteleggingGrunnleggende,
        ],
    },

    [InkluderingsmulighetForDirektemeldtStilling.TiltakEllerVirkemiddel]: {
        subtags: [
            Tag.VirkemiddelLønnstilskudd,
            Tag.VirkemiddelMentortilskudd,
            Tag.VirkemiddelLærlingplass,
        ],
    },

    [InkluderingsmulighetForDirektemeldtStilling.PrioriterteMålgrupper]: {
        hovedtag: Tag.PrioritertMålgruppe,
        subtags: [
            Tag.MålgruppeErUngeUnder30,
            Tag.MålgruppeErSeniorerOver50,
            Tag.MålgruppeKommerFraLandUtenforEØS,
            Tag.MålgruppeHullICVen,
            Tag.MålgruppeLiteEllerIngenUtdanning,
            Tag.MålgruppeLiteEllerIngenArbeidserfaring,
        ],
    },

    [InkluderingsmulighetForEksternStilling.StatligInkluderingsdugnad]: {
        subtags: [Tag.StatligInkluderingsdugnad],
    },
};

export const hierarkiAvTagsForEksterneStillinger: Record<
    InkluderingsmulighetForEksternStilling,
    GruppeMedTags
> = {
    [InkluderingsmulighetForEksternStilling.Tilrettelegging]: {
        hovedtag: Tag.Tilrettelegging,
        subtags: [
            Tag.TilretteleggingArbeidstid,
            Tag.TilretteleggingArbeidshverdagen,
            Tag.TilretteleggingFysisk,
            Tag.TilretteleggingGrunnleggende,
        ],
    },

    [InkluderingsmulighetForEksternStilling.StatligInkluderingsdugnad]: {
        subtags: [Tag.StatligInkluderingsdugnad],
    },
};

export const hierarkiAvTagsForFilter: Record<Inkluderingsmulighet, GruppeMedTags> = {
    [Inkluderingsmulighet.Tilrettelegging]: {
        hovedtag: Tag.Tilrettelegging,
        subtags: [
            Tag.TilretteleggingArbeidstid,
            Tag.TilretteleggingArbeidshverdagen,
            Tag.TilretteleggingFysisk,
            Tag.TilretteleggingGrunnleggende,
        ],
    },

    [Inkluderingsmulighet.TiltakEllerVirkemiddel]: {
        hovedtag: Tag.TiltakEllerVirkemiddel,
        subtags: [
            Tag.VirkemiddelLønnstilskudd,
            Tag.VirkemiddelMentortilskudd,
            Tag.VirkemiddelLærlingplass,
        ],
    },

    [Inkluderingsmulighet.PrioriterteMålgrupper]: {
        hovedtag: Tag.PrioritertMålgruppe,
        subtags: [
            Tag.MålgruppeErUngeUnder30,
            Tag.MålgruppeErSeniorerOver50,
            Tag.MålgruppeKommerFraLandUtenforEØS,
            Tag.MålgruppeHullICVen,
            Tag.MålgruppeLiteEllerIngenUtdanning,
            Tag.MålgruppeLiteEllerIngenArbeidserfaring,
        ],
    },

    [Inkluderingsmulighet.StatligInkluderingsdugnad]: {
        subtags: [Tag.StatligInkluderingsdugnad],
    },
};

export const hentSubtagsForMulighetForDirektemeldtStilling = (
    inkluderingsmulighet: InkluderingsmulighetForDirektemeldtStilling
) => hierarkiAvTagsForDirektemeldteStillinger[inkluderingsmulighet].subtags;

export const hentSubtagsForMulighetForEksternStilling = (
    inkluderingsmulighet: InkluderingsmulighetForEksternStilling
) => hierarkiAvTagsForEksterneStillinger[inkluderingsmulighet].subtags;

export const hentSubtagsForMulighetForFilter = (inkluderingsmulighet: Inkluderingsmulighet) =>
    hierarkiAvTagsForFilter[inkluderingsmulighet].subtags;
