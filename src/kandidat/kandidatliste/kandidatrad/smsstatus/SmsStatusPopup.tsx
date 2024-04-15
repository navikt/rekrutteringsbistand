import { MobileFillIcon, MobileIcon } from '@navikt/aksel-icons';
import classNames from 'classnames';
import { Sms, EksternStatus } from '../../../../api/sms-api/sms';
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
    const minsideStatus = (sms: Sms) => {
        switch (sms.minsideStatus) {
            case 'IKKE_BESTILT':
                return <></>;
            case 'UNDER_UTSENDING':
                return (
                    <>
                        {' '}
                        <br /> Min side: under utsending{' '}
                    </>
                );
            case 'OPPRETTET':
                return (
                    <>
                        <br /> Min side: opprettet{' '}
                    </>
                );
            case 'SLETTET':
                return (
                    <>
                        <br /> Min side: slettet
                    </>
                );
        }
    };

    const eksternStatus = (sms: Sms) => {
        switch (sms.eksternStatus) {
            case 'UNDER_UTSENDING':
                return (
                    <>
                        <br /> Ekstern varsel: under utsending{' '}
                    </>
                );
            case 'VELLYKKET_SMS':
                return (
                    <>
                        <br /> Ekstern varsel: SMS sendt
                    </>
                );
            case 'VELLYKKET_EPOST':
                return (
                    <>
                        <br /> Ekstern varsel: epost sendt
                    </>
                );
            case 'FEIL':
                return (
                    <>
                        <br /> Ekstern varsel feilet:{' '}
                        {sms.eksternFeilmelding ??
                            'En mulig årsak kan være ugyldig telefonnummer i Kontakt- og reservasjonsregisteret.'}{' '}
                    </>
                );
        }
    };

    return (
        <>
            Beskjed bestilt {formaterSendtDato(new Date(sms.opprettet))}
            {minsideStatus(sms)}
            {eksternStatus(sms)}
        </>
    );
};

const SmsStatusIkon: FunctionComponent<Props> = ({ sms }) => {
    return (
        <MedPopover className={css.smsStatusPopup} hjelpetekst={<Popuptekst sms={sms} />}>
            <>
                <MobileIcon
                    className={classNames(css.smsIkonIkkeFylt, css.smsIkon, {
                        [css.fargeleggIkonMedFeil]: sms.eksternStatus === EksternStatus.FEIL,
                    })}
                    fontSize="1.5rem"
                />
                <MobileFillIcon
                    className={classNames(css.smsIkonFylt, css.smsIkon, {
                        [css.fargeleggIkonMedFeil]: sms.eksternStatus === EksternStatus.FEIL,
                    })}
                    fontSize="1.5rem"
                />
            </>
        </MedPopover>
    );
};

export default SmsStatusIkon;
