import { Fødselsnummer } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { Sms, useSmserForStilling } from '../../../api/kandidatvarsel-api/kandidatvarsel';

const useSendtKandidatmelding = (
    kandidatensFnr: Fødselsnummer | null,
    stillingId: string | null,
    stillingskategori: string | null
): Sms | undefined => {
    const erFormidling = stillingskategori === 'FORMIDLING';
    const { data: smser } = useSmserForStilling(erFormidling ? null : stillingId);

    if (typeof kandidatensFnr === 'string' && smser !== undefined) {
        return smser[kandidatensFnr];
    }
    return undefined;
};

export default useSendtKandidatmelding;
