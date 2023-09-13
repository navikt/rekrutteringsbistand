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
    arbeidsdagerJobbonskerObj: object[];
    oppstartKode: Oppstartkode | null;
    arbeidstidsordningJobbonskerObj: object[];
    arbeidstidJobbonskerObj: Array<{
        arbeidstidKode: 'DAGTID' | 'KVELD' | string;
        arbeidstidKodeTekst: string;
    }>;
    ansettelsesformJobbonskerObj: Array<{
        ansettelsesformKode: 'FAST' | 'VIKARIAT' | string;
        ansettelsesformKodeTekst: string;
    }>;
    omfangJobbonskerObj: Array<{
        omfangKode: 'HELTID' | 'DELTID' | string;
        omfangKodeTekst: string;
    }>;
};

export default Jobbprofil;
