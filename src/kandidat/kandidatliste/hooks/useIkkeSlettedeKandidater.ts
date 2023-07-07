import { Kandidat } from 'felles/domene/kandidatliste/KandidatIKandidatliste';

const useSlettedeKandidater = (kandidater: Kandidat[]) => {
    return kandidater.filter((kandidat) => kandidat.arkivert === true);
};

export default useSlettedeKandidater;
