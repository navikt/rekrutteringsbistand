import { MobileFillIcon, MobileIcon } from '@navikt/aksel-icons';
import classNames from 'classnames';
import { Sms, SmsStatus } from '../../../../api/sms-api/sms';
import { FunctionComponent } from 'react';
import MedPopover from '../../med-popover/MedPopover';
import css from './SmsStatusPopup.module.css';

const formaterSendtDato = (dato: Date) => {
    return `${dato.toLocaleString('nb-NO', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })}`;
};

type Props = {
    sms: Sms;
};

const Popuptekst: FunctionComponent<{ sms: Sms }> = ({ sms }) => {
    const popupTekst =
        sms.status === SmsStatus.Feil
            ? 'SMS-en ble dessverre ikke sendt. ' +
              'En mulig årsak kan være ugyldig telefonnummer i Kontakt- og reservasjonsregisteret.'
            : 'En SMS blir sendt til kandidaten.';

    return (
        <>
            {formaterSendtDato(new Date(sms.opprettet))}
            <br />
            {popupTekst}
        </>
    );
};

const SmsStatusIkon: FunctionComponent<Props> = ({ sms }) => {
    if (sms.status === SmsStatus.IkkeSendt) return null;

    return (
        <MedPopover className={css.smsStatusPopup} hjelpetekst={<Popuptekst sms={sms} />}>
            <>
                <MobileIcon
                    className={classNames(css.smsIkonIkkeFylt, css.smsIkon, {
                        [css.fargeleggIkonMedFeil]: sms.status === SmsStatus.Feil,
                    })}
                    fontSize="1.5rem"
                />
                <MobileFillIcon
                    className={classNames(css.smsIkonFylt, css.smsIkon, {
                        [css.fargeleggIkonMedFeil]: sms.status === SmsStatus.Feil,
                    })}
                    fontSize="1.5rem"
                />
            </>
        </MedPopover>
    );
};

export default SmsStatusIkon;
