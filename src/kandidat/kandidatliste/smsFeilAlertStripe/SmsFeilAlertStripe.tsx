import { XMarkIcon } from '@navikt/aksel-icons';
import { Alert, Button } from '@navikt/ds-react';
import classNames from 'classnames';
import { FunctionComponent, useState } from 'react';

import { KandidatIKandidatliste } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { ServerSmsStatus, Sms } from '../../../api/sms-api/sms';
import { Kandidatmeldinger } from '../domene/Kandidatressurser';
import css from './smsFeilAlertStripe.module.css';
import { z } from 'zod';

const LESTE_SMS_IDER_KEY = 'lesteSmsIder';

type Props = {
    kandidater: KandidatIKandidatliste[];
    sendteMeldinger: Kandidatmeldinger;
};

const storageSchema = z
    .array(z.number()) /* gammelt format */
    .or(z.array(z.string())); /* nytt format */

const hentLesteSmsIder = (): string[] => {
    const lagredeIderJson = window.localStorage.getItem(LESTE_SMS_IDER_KEY) ?? '[]';
    const lagredeIder = storageSchema.safeParse(JSON.parse(lagredeIderJson));
    if (lagredeIder.success) {
        return lagredeIder.data.map((it) => it.toString());
    } else {
        return [];
    }
};

const SmsFeilAlertStripe: FunctionComponent<Props> = ({ kandidater, sendteMeldinger }) => {
    const [lesteSmsIder, setLesteSmsIder] = useState<string[]>(hentLesteSmsIder);

    const smsMedFeil = (sms: Sms | undefined) => sms && sms.status === ServerSmsStatus.Feil;
    const ulestSms = (sms: Sms | undefined) => sms && !lesteSmsIder.includes(sms.id);

    const kandidaterMedUlesteSmsFeil = kandidater.filter((kandidat) => {
        if (!kandidat.fodselsnr) {
            return false;
        }
        const sms = sendteMeldinger[kandidat.fodselsnr];
        return smsMedFeil(sms) && ulestSms(sms);
    });

    const harLestAlleFeil = kandidaterMedUlesteSmsFeil.length === 0;
    if (harLestAlleFeil) return null;

    const lukkAlert = () => {
        const oppdatertLesteSmsIder = new Set<string>(lesteSmsIder);

        kandidaterMedUlesteSmsFeil
            .filter((kandidat) => kandidat.fodselsnr)
            .map((kandidat) => sendteMeldinger[kandidat.fodselsnr!].id)
            .forEach((id) => oppdatertLesteSmsIder.add(id));

        const oppdatertLesteSmsIderArray = Array.from(oppdatertLesteSmsIder);
        window.localStorage.setItem(LESTE_SMS_IDER_KEY, JSON.stringify(oppdatertLesteSmsIderArray));
        setLesteSmsIder(oppdatertLesteSmsIderArray);
    };

    const navn = kandidaterMedUlesteSmsFeil
        .map((kandidat) => `${kandidat.fornavn} ${kandidat.etternavn}`)
        .join(', ')
        .replace(/,(?=[^,]*$)/, ' og');

    return (
        <Alert variant="error" className={classNames(css.alert, 'sms-ikke-sendt-alert')}>
            <span className={css.alertstripeBody}>
                SMS-en til {navn} ble dessverre ikke sendt. En mulig årsak kan være ugyldig
                telefonnummer i kontakt og reservasjonsregisteret.
                <Button
                    size="small"
                    variant="secondary-neutral"
                    icon={<XMarkIcon />}
                    className={css.lukknapp}
                    onClick={lukkAlert}
                />
            </span>
        </Alert>
    );
};

export default SmsFeilAlertStripe;
