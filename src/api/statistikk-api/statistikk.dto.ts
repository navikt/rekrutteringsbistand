export type AntallDTO = {
    totalt: number;
    under30år: number;
    innsatsgruppeIkkeStandard: number;
};
export type UtfallsstatistikkDTO = {
    antPresentasjoner: AntallDTO;
    antFåttJobben: AntallDTO;
};
