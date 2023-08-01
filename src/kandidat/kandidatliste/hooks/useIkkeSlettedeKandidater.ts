import { KandidatIKandidatliste } from 'felles/domene/kandidatliste/KandidatIKandidatliste';

const useSlettedeKandidater = (kandidater: KandidatIKandidatliste[]) => {
    return kandidater.filter((kandidat) => kandidat.arkivert === true);
};

export default useSlettedeKandidater;
