export enum Nettstatus {
    IkkeLastet = 'IkkeLastet',
    LasterInn = 'LasterInn',
    SenderInn = 'SenderInn',
    Suksess = 'Suksess',
    FinnesIkke = 'FinnesIkke',
    Feil = 'Feil',
}

type IkkeLastet = {
    kind: Nettstatus.IkkeLastet;
};

type LasterInn = {
    kind: Nettstatus.LasterInn;
};

type SenderInn = {
    kind: Nettstatus.SenderInn;
};

type Suksess<T> = {
    kind: Nettstatus.Suksess;
    data: T;
};

type FinnesIkke = {
    kind: Nettstatus.FinnesIkke;
};

type Feil = {
    kind: Nettstatus.Feil;
    error: {
        message: string;
        status: number;
    };
};

export type Nettressurs<T> = IkkeLastet | LasterInn | SenderInn | Feil | Suksess<T> | FinnesIkke;
