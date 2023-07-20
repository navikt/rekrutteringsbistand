import Stilling, { Kilde, Rekrutteringsbistandstilling } from '../domene/Stilling';

export const skalViseLenkeTilKandidatliste = (
    rekrutteringsbistandStilling: Rekrutteringsbistandstilling
) =>
    rekrutteringsbistandStilling.stilling.source === Kilde.Intern ||
    rekrutteringsbistandStilling.stillingsinfo?.eierNavident;

export const skalViseRedigeringslenkeTilStilling = (
    rekrutteringsbistandStilling: Rekrutteringsbistandstilling
) => rekrutteringsbistandStilling.stilling.source === Kilde.Intern;

export const lagUrlTilStilling = (stilling: Stilling, fnr?: string) => {
    const url = `/stillinger/stilling/${stilling.uuid}`;
    return fnr ? `${url}?fnr=${fnr}` : url;
};

export const lagUrlTilKandidatliste = (stilling: Stilling) =>
    `/kandidater/lister/stilling/${stilling.uuid}/detaljer`;

export const lagUrlTilStillingRedigering = (stilling: Stilling) =>
    `/stillinger/stilling/${stilling.uuid}?redigeringsmodus=true`;
