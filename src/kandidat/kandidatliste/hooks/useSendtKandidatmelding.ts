import { Fødselsnummer } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { Sms, useSmserForStilling } from '../../../api/sms-api/sms';

const useSendtKandidatmelding = (
    kandidatensFnr: Fødselsnummer | null,
    stillingId: string | null
): Sms | undefined => {
    const { data: smser } = useSmserForStilling(stillingId);

    if (typeof kandidatensFnr === 'string' && smser !== undefined) {
        return smser[kandidatensFnr];
    }
    return undefined;
};

export default useSendtKandidatmelding;
