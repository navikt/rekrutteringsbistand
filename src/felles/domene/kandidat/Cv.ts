export enum Omfangenhet {
    Time = 'TIME',
    Dag = 'DAG',
    Uke = 'UKE',
    Måned = 'MND',
}

export type Omfang = {
    verdi: number;
    enhet: Omfangenhet | '';
};

export type Kurs = {
    arrangor: string;
    tittel: string;
    omfang: Omfang;
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
    kompetanseKode: string | null;
    kompetanseKodeTekst: string | null;
    alternativTekst: string | null;
    beskrivelse: string | null;
    fraDato: string | null;
};

export type Utdanning = {
    utdannelsessted: string | null;
    alternativtUtdanningsnavn: string | null;
    nusKode: string;
    nusKodeUtdanningsnavn: string | null;
    nusKodeGrad?: string | null;
    fraDato: string | null;
    tilDato: string | null;
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
    forerkort: Sertifikat[];
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
