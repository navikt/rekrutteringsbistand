import { XMarkIcon } from '@navikt/aksel-icons';
import { Alert, Button } from '@navikt/ds-react';
import classNames from 'classnames';
import { FunctionComponent, useState } from 'react';

import { KandidatIKandidatliste } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { z } from 'zod';
import { EksternStatus, Sms, useSmserForStilling } from '../../../api/sms-api/sms';
import css from './smsFeilAlertStripe.module.css';

const LESTE_SMS_IDER_KEY = 'lesteSmsIder';

type Props = {
    kandidater: KandidatIKandidatliste[];
    stillingId: string | null;
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

const SmsFeilAlertStripe: FunctionComponent<Props> = ({ kandidater, stillingId }) => {
    const { data: sendteMeldinger } = useSmserForStilling(stillingId);
    const [lesteSmsIder, setLesteSmsIder] = useState<string[]>(hentLesteSmsIder);

    if (sendteMeldinger === undefined) {
        return null;
    }

    const smsMedFeil = (sms: Sms | undefined) => sms && sms.eksternStatus === EksternStatus.FEIL;
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
            .map((kandidat) => kandidat.fodselsnr && sendteMeldinger[kandidat.fodselsnr].id)
            .forEach((id) => id && oppdatertLesteSmsIder.add(id));

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
