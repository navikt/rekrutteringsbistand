interface ILenkeTilStilling {
    stillingsId: string;
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
