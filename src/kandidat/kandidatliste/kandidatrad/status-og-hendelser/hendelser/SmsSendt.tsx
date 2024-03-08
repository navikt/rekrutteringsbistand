import { Sms, ServerSmsStatus } from '../../../../../api/sms-api/sms';
import { FunctionComponent } from 'react';
import { formaterDatoNaturlig } from '../../../../utils/dateUtils';
import Hendelse, { Hendelsesstatus } from './Hendelse';

type Props = {
    sms?: Sms;
};

const SmsSendt: FunctionComponent<Props> = ({ sms }) => {
    function smstekst(smsMelding: Sms) {
        return `${formaterDatoNaturlig(smsMelding.opprettet)} av ${smsMelding.navIdent}`;
    }

    if (!sms) {
        return null;
    }

    switch (sms.status) {
        case ServerSmsStatus.Feil:
            return (
                <Hendelse
                    status={Hendelsesstatus.Rød}
                    tittel="SMS-en ble ikke sendt"
                    beskrivelse={smstekst(sms)}
                />
            );
        case ServerSmsStatus.Sendt:
            return (
                <Hendelse
                    status={Hendelsesstatus.Grønn}
                    tittel="SMS er sendt til kandidaten"
                    beskrivelse={smstekst(sms)}
                />
            );
    }
    return null;
};

export default SmsSendt;
