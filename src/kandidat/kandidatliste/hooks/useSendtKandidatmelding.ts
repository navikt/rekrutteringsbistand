import { Fødselsnummer } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { Sms } from 'felles/domene/sms/Sms';
import { Nettstatus } from 'felles/nettressurs';
import { useSelector } from 'react-redux';
import AppState from '../../state/AppState';

const useSendtKandidatmelding = (kandidatensFnr: Fødselsnummer | null): Sms | undefined => {
    const { sendteMeldinger } = useSelector((state: AppState) => state.kandidatliste.sms);

    return sendteMeldinger.kind === Nettstatus.Suksess && kandidatensFnr
        ? sendteMeldinger.data[kandidatensFnr]
        : undefined;
};

export default useSendtKandidatmelding;
