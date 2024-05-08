import { Sms, EksternStatus } from '../../../../../api/sms-api/sms';
import { FunctionComponent } from 'react';
import { formaterDatoNaturlig } from '../../../../utils/dateUtils';
import Hendelse, { Hendelsesstatus } from './Hendelse';

type Props = {
    sms?: Sms;
};

const SmsSendt: FunctionComponent<Props> = ({ sms }) => {
    function smstekst(smsMelding: Sms) {
        return `${formaterDatoNaturlig(smsMelding.opprettet)} av ${smsMelding.avsenderNavident}`;
    }

    if (!sms) {
        return null;
    }

    switch (sms.eksternStatus) {
        case EksternStatus.FEIL:
            return (
                <Hendelse
                    status={Hendelsesstatus.Rød}
                    tittel="Sending av epost/SMS feilet"
                    beskrivelse={smstekst(sms)}
                />
            );
        case EksternStatus.VELLYKKET_SMS:
            return (
                <Hendelse
                    status={Hendelsesstatus.Grønn}
                    tittel="SMS er sendt til kandidaten"
                    beskrivelse={smstekst(sms)}
                />
            );
        case EksternStatus.VELLYKKET_EPOST:
            return (
                <Hendelse
                    status={Hendelsesstatus.Grønn}
                    tittel="Epost er sendt til kandidaten"
                    beskrivelse={smstekst(sms)}
                />
            );
    }
    return null;
};

export default SmsSendt;
