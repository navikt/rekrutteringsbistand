interface ILenkeTilStilling {
    stillingsId: string | null;
    redigeringsmodus?: boolean;
    fane?: 'kandidater';
}

export const lenkeTilStilling = (props: ILenkeTilStilling) => {
    let path = `/stillinger/stilling/${props.stillingsId}`;

    if (props.fane) {
        path += `/${props.fane}`;
    }

    if (props.redigeringsmodus) {
        path += '?redigeringsmodus=true';
    }

    return path;
};

export enum KandidatsokQueryParam {
    Stilling = 'stilling',
    Kandidatliste = 'kandidatliste',
    BrukKriterierFraStillingen = 'brukKriterierFraStillingen',
}
