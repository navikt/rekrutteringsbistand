import { Sms, SmsStatus } from 'felles/domene/sms/Sms';
import { FunctionComponent } from 'react';
import { formaterDatoNaturlig } from '../../../../utils/dateUtils';
import Hendelse, { Hendelsesstatus } from './Hendelse';

type Props = {
    sms?: Sms;
};

const SmsSendt: FunctionComponent<Props> = ({ sms }) => {
    function smstekst(smsMelding: any) {
        return `${formaterDatoNaturlig(smsMelding.opprettet)} av ${smsMelding.navIdent}`;
    }

    if (!sms) {
        return null;
    }

    switch (sms.status) {
        case SmsStatus.Feil:
            return (
                <Hendelse
                    status={Hendelsesstatus.Rød}
                    tittel="SMS-en ble ikke sendt"
                    beskrivelse={smstekst(sms)}
                />
            );
        case SmsStatus.Sendt:
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
