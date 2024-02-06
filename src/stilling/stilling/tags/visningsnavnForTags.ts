import { Tag } from './hierarkiAvTags';

export const visningsnavnForRegistrering: Partial<Record<Tag, string>> = {
    [Tag.TilretteleggingArbeidstid]: 'arbeidstid',
    [Tag.TilretteleggingFysisk]: 'fysisk tilrettelegging',
    [Tag.TilretteleggingArbeidshverdagen]: 'arbeidshverdagen',
    [Tag.TilretteleggingGrunnleggende]: 'utfordringer med norsk',
    [Tag.VirkemiddelLønnstilskudd]: 'lønnstilskudd',
    [Tag.VirkemiddelMentortilskudd]: 'mentor (tilskudd)',
    [Tag.VirkemiddelLærlingplass]: 'lærlingplass',
    [Tag.MålgruppeErUngeUnder30]: 'er unge under 30 år',
    [Tag.MålgruppeErSeniorerOver50]: 'er seniorer 50+',
    [Tag.MålgruppeKommerFraLandUtenforEØS]: 'kommer fra land utenfor EØS',
    [Tag.MålgruppeHullICVen]: 'har hull i CV-en',
    [Tag.MålgruppeLiteEllerIngenUtdanning]: 'har lite eller ingen utdanning',
    [Tag.MålgruppeLiteEllerIngenArbeidserfaring]: 'har lite eller ingen arbeidserfaring',
    [Tag.StatligInkluderingsdugnad]:
        'den statlige inkluderingsdugnaden \n(gjelder kun statlige virksomheter med avtale)',
};
