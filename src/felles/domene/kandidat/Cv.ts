export enum Omfangenhet {
    Time = 'TIME',
    Dag = 'DAG',
    Uke = 'UKE',
    Måned = 'MND',
}

export type Kurs = {
    arrangor: string;
    tittel: string;
    omfangEnhet: string | null;
    omfangVerdi: number | null;
    fraDato: string | null;
    tilDato: string | null;
};

export enum Språkferdighetsnivå {
    IkkeOppgitt = 'IKKEOPPGITT',
    Nybegynner = 'NYBEGYNNER',
    Godt = 'GODT',
    VeldigGodt = 'VELDIG_GODT',
    Førstespråk = 'FOERSTESPRAAK',
}

export type Språkferdighet = {
    fraDato: null;
    sprakKode: null;
    sprakKodeTekst: string;
    alternativTekst: string;
    beskrivelse: string;
    ferdighetSkriftlig: Språkferdighetsnivå;
    ferdighetMuntlig: Språkferdighetsnivå;
};

export type Sertifikat = {
    utsteder: string | null;
    sertifikatKode: string | null;
    sertifikatKodeNavn: string | null;
    alternativtNavn: string | null;
    fraDato: string | null;
    tilDato: string | null;
};

export type Førerkort = {
    fraDato: string | null;
    tilDato: string | null;
    forerkortKode: string | null;
    forerkortKodeKlasse: string | null;
    alternativtNavn: string | null;
    utsteder: string | null;
};

export type Yrkeserfaring = {
    arbeidsgiver: string | null;
    alternativStillingstittel: string | null;
    styrkKode: string | null;
    styrkKodeStillingstittel: string | null;
    utelukketForFremtiden: boolean;
    fraDato: string | null;
    tilDato: string | null;
    beskrivelse: string | null;
    sted?: string | null;
};

export type Kompetanse = {
    fraDato: string | null;
    kompKode: string | null;
    kompKodeNavn: string | null;
    sokeNavn: string[];
    alternativtNavn: string | null;
    beskrivelse: string | null;
};

export type Utdanning = {
    fraDato: string | null;
    tilDato: string | null;
    utdannelsessted: string | null;
    nusKode: string;
    alternativGrad: string | null;
    yrkestatus: string | null;
    beskrivelse: string | null;
};

export type Fagdokumentasjon = {
    tittel: string | null;
    type: string | null;
    beskrivelse: string | null;
};

export type AnnenErfaring = {
    fraDato: string | null;
    tilDato: string | null;
    rolle: string | null;
    beskrivelse: string | null;
};

export type Godkjenning = {
    tittel: string | null;
    utsteder: string | null;
    gjennomfoert: string | null;
    utloeper: string | null;
    konseptId: string | null;
};

type Cv = {
    beskrivelse: string;
    sprak: Språkferdighet[];
    yrkeserfaring: Yrkeserfaring[];
    utdanning: Utdanning[];
    forerkort: Førerkort[];
    fagdokumentasjon: Fagdokumentasjon[];
    godkjenninger: Godkjenning[];
    kursObj: Kurs[];
    annenerfaringObj: AnnenErfaring[];
    kompetanseObj: Kompetanse[];
    samletKompetanseObj: Kompetanse[];
    sertifikatObj: Sertifikat[];
    vervObj: object[];
    perioderMedInaktivitet: object[];
};

export default Cv;
