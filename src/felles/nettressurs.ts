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
    error: Error;
};

export type Error = {
    message: string;
    status?: number;
};

export const ikkeLastet = (): IkkeLastet => ({
    kind: Nettstatus.IkkeLastet,
});

export const lasterInn = (): LasterInn => ({
    kind: Nettstatus.LasterInn,
});

export const senderInn = (): SenderInn => ({
    kind: Nettstatus.SenderInn,
});

export const suksess = <T>(data: T): Suksess<T> => ({
    kind: Nettstatus.Suksess,
    data,
});

export const finnesIkke = (): FinnesIkke => ({
    kind: Nettstatus.FinnesIkke,
});

export const feil = (error: Error): Feil => ({
    kind: Nettstatus.Feil,
    error,
});

export type Nettressurs<T> = IkkeLastet | LasterInn | SenderInn | Feil | Suksess<T> | FinnesIkke;
