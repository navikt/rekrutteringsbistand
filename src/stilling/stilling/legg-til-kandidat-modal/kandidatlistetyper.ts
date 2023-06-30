export type Kandidat = {
    arenaKandidatnr: string;
    fornavn: string;
    etternavn: string;
};

export type Kandidatliste = {
    stillingId: string;
    kandidatlisteId: string;
    kandidater: Array<{
        fodselsnr: string;
        kandidatnr: string;
    }>;
};

export enum KriterieUtenforNoensKontroll {
    ErIkkeSperretAnsatt = 'erIkkeSperretAnsatt',
    ErIkkeDød = 'erIkkeDoed',
}

export enum KravTilKandidaten {
    HarAktivCv = 'harAktivCv',
    HarJobbprofil = 'harJobbprofil',
    HarSettHjemmel = 'harSettHjemmel',
    MåIkkeBehandleTidligereCv = 'maaIkkeBehandleTidligereCv',
    ErUnderOppfølging = 'erUnderOppfoelging',
}

export enum KravTilVeileder {
    ErIkkeFritattKandidatsøk = 'erIkkeFritattKandidatsøk',
    HarRiktigFormidlingsgruppe = 'harRiktigFormidlingsgruppe',
}

export type Synlighetskriterie = KriterieUtenforNoensKontroll | KravTilKandidaten | KravTilVeileder;

export type Synlighetsevaluering = Record<Synlighetskriterie, boolean>;

export const kriterierPerAnsvarsområde: Record<string, Synlighetskriterie[]> = {
    utenforNoensKontroll: Object.values(KriterieUtenforNoensKontroll),
    kandidat: Object.values(KravTilKandidaten),
    veileder: Object.values(KravTilVeileder),
};
