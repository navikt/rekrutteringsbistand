import { Fødselsnummer, Kandidatnr } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { Sms } from 'felles/domene/sms/Sms';
import { Nettressurs } from 'felles/nettressurs';

export type Notat = {
    tekst: string;
    notatId: string;
    lagtTilTidspunkt: string;
    notatEndret: boolean;
    kanEditere: boolean;
    lagtTilAv: {
        navn: string;
        ident: string;
    };
};

export type Kandidattilstand = {
    markert: boolean;
    filtrertBort: boolean;
    visningsstatus: Visningsstatus;
};

export enum Visningsstatus {
    SkjulPanel = 'SKJUL_PANEL',
    VisNotater = 'VIS_NOTATER',
    VisMerInfo = 'VIS_MER_INFO',
}

export type Kandidattilstander = Record<Kandidatnr, Kandidattilstand>;
export type Kandidatnotater = Record<Kandidatnr, Nettressurs<Notat[]>>;
export type Kandidatmeldinger = Record<Fødselsnummer, Sms>;
