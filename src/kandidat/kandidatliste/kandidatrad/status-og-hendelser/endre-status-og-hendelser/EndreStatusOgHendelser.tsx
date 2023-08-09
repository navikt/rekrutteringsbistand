import { BodyShort, Button, Detail, Heading, Radio, RadioGroup } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';

import {
    KandidatIKandidatliste,
    Kandidatstatus,
} from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import { Nettressurs } from 'felles/nettressurs';
import { Sms } from '../../../domene/Kandidatressurser';
import { kandidaterMåGodkjenneDelingAvCv } from '../../../domene/kandidatlisteUtils';
import { ForespørslerForKandidatForStilling } from '../../../knappe-rad/forespørsel-om-deling-av-cv/Forespørsel';
import { statusToDisplayName } from '../etiketter/StatusEtikett';
import CvErSlettet from '../hendelser/CvErSlettet';
import DelCvMedArbeidsgiver from '../hendelser/DelCvMedArbeidsgiver';
import HarFåttJobben from '../hendelser/HarFåttJobben';
import NyKandidat from '../hendelser/NyKandidat';
import SmsSendt from '../hendelser/SmsSendt';
import ForespørslerOgSvar from '../hendelser/forespørsler-og-svar/ForespørslerOgSvar';
import css from './EndreStatusOgHendelser.module.css';

type Props = {
    kandidat: KandidatIKandidatliste;
    kandidatliste: Kandidatliste;
    forespørselOmDelingAvCv: Nettressurs<ForespørslerForKandidatForStilling>;
    sms?: Sms;
    onStatusChange: (status: Kandidatstatus) => void;
};

const hentStatusbeskrivelse = (status: Kandidatstatus) => {
    return status === Kandidatstatus.Vurderes
        ? 'Settes automatisk når en kandidat legges i listen'
        : null;
};

const EndreStatusOgHendelser: FunctionComponent<Props> = ({
    kandidat,
    kandidatliste,
    forespørselOmDelingAvCv,
    sms,
    onStatusChange,
}) => {
    const [status, setStatus] = useState(kandidat.status);
    const statuser = Object.entries(Kandidatstatus);

    const onConfirmStatus = () => {
        onStatusChange(status);
    };

    const visHendelser =
        kandidaterMåGodkjenneDelingAvCv(kandidatliste) ||
        kandidatliste.stillingskategori === Stillingskategori.Formidling ||
        kandidatliste.stillingskategori === Stillingskategori.Jobbmesse;

    const erStillingEllerFormidling =
        kandidatliste.stillingskategori === Stillingskategori.Stilling ||
        kandidatliste.stillingskategori === Stillingskategori.Formidling ||
        kandidatliste.stillingskategori == null;

    return (
        <div className={css.endreStatusOgHendelser}>
            <div className={css.velgStatus}>
                <RadioGroup
                    size="small"
                    legend={
                        <Heading level="2" size="small">
                            Velg status
                        </Heading>
                    }
                    value={status}
                >
                    {statuser.map(([statusKey, statusValue]) => {
                        const beskrivelse = hentStatusbeskrivelse(statusValue);

                        return (
                            <Radio
                                key={statusKey}
                                onChange={() => setStatus(statusValue)}
                                value={statusValue}
                                name={`kandidatstatus-${kandidat.kandidatnr}`}
                            >
                                <>
                                    <BodyShort>{statusToDisplayName(statusValue)}</BodyShort>
                                    {beskrivelse && <Detail>{beskrivelse}</Detail>}
                                </>
                            </Radio>
                        );
                    })}
                </RadioGroup>
                <Button
                    variant="secondary"
                    onClick={onConfirmStatus}
                    size="small"
                    className={css.lagreStatus}
                >
                    Lagre status
                </Button>
            </div>
            {visHendelser && (
                <div className={css.hendelser}>
                    <Heading spacing level="2" size="small">
                        Hendelser
                    </Heading>
                    <ol className={css.hendelsesliste}>
                        <NyKandidat kandidat={kandidat} />
                        <SmsSendt sms={sms} />
                        {erStillingEllerFormidling && (
                            <>
                                <ForespørslerOgSvar forespørsler={forespørselOmDelingAvCv} />

                                <DelCvMedArbeidsgiver
                                    kanEndre
                                    kandidatlisteId={kandidatliste.kandidatlisteId}
                                    kandidat={kandidat}
                                />

                                <CvErSlettet kandidat={kandidat} />

                                <HarFåttJobben
                                    kanEndre
                                    kandidatlisteId={kandidatliste.kandidatlisteId}
                                    kandidat={kandidat}
                                />
                            </>
                        )}
                    </ol>
                </div>
            )}
        </div>
    );
};

export default EndreStatusOgHendelser;
