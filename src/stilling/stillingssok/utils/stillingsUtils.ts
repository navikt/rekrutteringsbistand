import { EsRekrutteringsbistandstilling, EsStilling } from 'felles/domene/stilling/EsStilling';
import { Kilde } from 'felles/domene/stilling/Stilling';

export const skalViseLenkeTilKandidatliste = (
    rekrutteringsbistandStilling: EsRekrutteringsbistandstilling
) =>
    rekrutteringsbistandStilling.stilling.source === Kilde.Intern ||
    rekrutteringsbistandStilling.stillingsinfo?.eierNavident;

export const skalViseRedigeringslenkeTilStilling = (
    rekrutteringsbistandStilling: EsRekrutteringsbistandstilling
) => rekrutteringsbistandStilling.stilling.source === Kilde.Intern;

export const lagUrlTilStilling = (stilling: EsStilling, kandidatnr?: string, fane?: string) => {
    let url = `/stillinger/stilling/${stilling.uuid}`;

    if (fane) {
        url += `/${fane}`;
    }

    return kandidatnr ? `${url}?kandidat=${kandidatnr}` : url;
};

export const lagUrlTilStillingRedigering = (stilling: EsStilling) =>
    `/stillinger/stilling/${stilling.uuid}?redigeringsmodus=true`;
