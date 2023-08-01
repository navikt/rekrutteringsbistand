import { FunctionComponent } from 'react';
import { Heading } from '@navikt/ds-react';

import { ForespørslerForKandidatForStilling } from '../../../knappe-rad/forespørsel-om-deling-av-cv/Forespørsel';
import { KandidatIKandidatliste } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { Nettressurs } from 'felles/nettressurs';
import { Sms } from '../../../domene/Kandidatressurser';
import { Stillingskategori } from 'felles/domene/kandidatliste/Kandidatliste';
import CvErSlettet from '../hendelser/CvErSlettet';
import DelCvMedArbeidsgiver from '../hendelser/DelCvMedArbeidsgiver';
import ForespørslerOgSvar from '../hendelser/forespørsler-og-svar/ForespørslerOgSvar';
import HarFåttJobben from '../hendelser/HarFåttJobben';
import NyKandidat from '../hendelser/NyKandidat';
import SmsSendt from '../hendelser/SmsSendt';
import css from '../endre-status-og-hendelser/EndreStatusOgHendelser.module.css';

type Props = {
    kandidat: KandidatIKandidatliste;
    kandidatlisteId: string;
    forespørselOmDelingAvCv: Nettressurs<ForespørslerForKandidatForStilling>;
    sms?: Sms;
    stillingskategori: Stillingskategori | null;
};

const SeHendelser: FunctionComponent<Props> = ({
    kandidat,
    kandidatlisteId,
    forespørselOmDelingAvCv,
    sms,
    stillingskategori,
}) => {
    const erStillingEllerFormidling =
        stillingskategori === Stillingskategori.Stilling ||
        stillingskategori === Stillingskategori.Formidling ||
        stillingskategori == null;

    return (
        <>
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
                            kandidat={kandidat}
                            kandidatlisteId={kandidatlisteId}
                            kanEndre={false}
                        />

                        <CvErSlettet kandidat={kandidat} />

                        <HarFåttJobben
                            kandidat={kandidat}
                            kandidatlisteId={kandidatlisteId}
                            kanEndre={false}
                        />
                    </>
                )}
            </ol>
        </>
    );
};

export default SeHendelser;
