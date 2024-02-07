export type YrkeJobbonske = {
    styrkBeskrivelse: string;
    sokeTitler: string[];
    primaertJobbonske: boolean;
    styrkKode: null | string;
};

export type GeografiJobbonske = {
    geografiKodeTekst: string;
    geografiKode: string;
};

export type KandidatStillingssøk = {
    yrkeJobbonskerObj: YrkeJobbonske[];
    geografiJobbonsker: GeografiJobbonske[];
    kommunenummerstring: string;
    kommuneNavn: string;
};

export type KandidatStillingssøkDto = {
    hits: {
        hits: Array<{
            _source: KandidatStillingssøk;
        }>;
    };
};

export type Kandidatsammendrag = {
    adresselinje1: string;
    fornavn: string;
    poststed: string;
    fodselsdato: string;
    etternavn: string;
    epostadresse: null | string;
    postnummer: string;
    telefon: null | string;
    veilederIdent: null | string;
    veilederEpost: null | string;
    veilederVisningsnavn: null | string;
    arenaKandidatnr: string;
    fodselsnummer: string;
};
