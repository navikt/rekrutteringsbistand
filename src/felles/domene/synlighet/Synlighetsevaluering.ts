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
    ErArbeidssøker = 'erArbeidssøker',
}

export type Synlighetskriterie = KriterieUtenforNoensKontroll | KravTilKandidaten | KravTilVeileder;

export type Synlighetsevaluering = Record<Synlighetskriterie, boolean>;

export default Synlighetsevaluering;
