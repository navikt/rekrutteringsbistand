import { Fødselsnummer } from '../kandidatliste/KandidatIKandidatliste';

export enum SmsStatus {
    IkkeSendt = 'IKKE_SENDT',
    UnderUtsending = 'UNDER_UTSENDING',
    Sendt = 'SENDT',
    Feil = 'FEIL',
}

export type Sms = {
    id: number;
    fnr: Fødselsnummer;
    opprettet: string;
    sendt: string;
    status: SmsStatus;
    navIdent: string;
    kandidatlisteId: string;
};
