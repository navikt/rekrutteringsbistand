import { useSelector } from 'react-redux';
import { Nettstatus } from 'felles/nettressurs';
import AppState from '../../state/AppState';
import { Sms } from '../domene/Kandidatressurser';
import { Fødselsnummer } from '../domene/Kandidat';

const useSendtKandidatmelding = (kandidatensFnr: Fødselsnummer | null): Sms | undefined => {
    const { sendteMeldinger } = useSelector((state: AppState) => state.kandidatliste.sms);

    return sendteMeldinger.kind === Nettstatus.Suksess && kandidatensFnr
        ? sendteMeldinger.data[kandidatensFnr]
        : undefined;
};

export default useSendtKandidatmelding;
