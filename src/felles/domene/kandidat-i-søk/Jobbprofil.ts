export type Jobbønske = {
    styrkKode: string | null;
    styrkBeskrivelse: string | null;
    primaertJobbonske: boolean;
    sokeTitler: string[];
};

export type JobbønskeSted = {
    geografiKodeTekst: string;
    geografiKode: string;
};

export enum Oppstartkode {
    EtterAvtale = 'ETTER_AVTALE',
    LedigNå = 'LEDIG_NAA',
    EtterTreMåneder = 'ETTER_TRE_MND',
}

type Jobbprofil = {
    yrkeJobbonskerObj: Jobbønske[];
    geografiJobbonsker: JobbønskeSted[];
    ansettelsesformJobbonskerObj: object[];
    arbeidstidsordningJobbonskerObj: object[];
    arbeidsdagerJobbonskerObj: object[];
    arbeidstidJobbonskerObj: object[];
    omfangJobbonskerObj: object[];
    oppstartKode: Oppstartkode | null;
};

export default Jobbprofil;
