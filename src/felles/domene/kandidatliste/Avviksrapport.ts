export type Avviksrapport = {
    tidspunkt: string;
};

export type AvviksrapportOutboundDto = {
    bruktTilFeilFormål: boolean;
    avvikIFritekstfelt: boolean;
    listeOverAvvikIFritekstfelt: AvvikIFritekstfelt[];
    forNavkontor: String;
};

enum AvvikIFritekstfelt {
    Etnisitet = 'ETNISITET',
}
