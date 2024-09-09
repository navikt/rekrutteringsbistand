import { KandidatIKandidatliste } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { Sms, useSmserForStilling } from '../../../api/kandidatvarsel-api/kandidatvarsel';

const useSendtKandidatmelding = (
    kandidat: KandidatIKandidatliste,
    kandidatliste: Kandidatliste
): Sms | undefined => {
    const { data: smser } = useSmserForStilling(kandidatliste.stillingId ?? null);
    if (smser !== undefined && typeof kandidat.fodselsnr === 'string') {
        return smser[kandidat.fodselsnr];
    } else {
        return undefined;
    }
};

export default useSendtKandidatmelding;
