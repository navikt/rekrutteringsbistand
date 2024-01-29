import { Fødselsnummer, Kandidatnr } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { Sms } from 'felles/domene/sms/Sms';

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
export type Kandidatmeldinger = Record<Fødselsnummer, Sms>;
