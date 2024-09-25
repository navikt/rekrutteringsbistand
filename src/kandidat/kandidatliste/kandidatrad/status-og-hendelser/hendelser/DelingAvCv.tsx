import { MinusCircleIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, ErrorMessage, Loader } from '@navikt/ds-react';
import { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Kandidatutfall, Utfallsendring } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { Nettstatus } from 'felles/nettressurs';
import AppState from '../../../../state/AppState';
import { formaterDatoNaturlig } from '../../../../utils/dateUtils';
import { hentSisteKandidatutfall } from '../../../domene/kandidatUtils';
import { cvErSendtTilArbeidsgiverOgSlettet } from './CvErSlettet';
import Hendelse, { Hendelsesstatus } from './Hendelse';
import css from './Hendelse.module.css';

type Props = {
    utfall: Kandidatutfall;
    utfallsendringer: Utfallsendring[];
    onEndreUtfall: (utfall: Kandidatutfall) => void;
    onSlettCv: () => void;
    kanEndre: boolean | null;
};

enum Visning {
    Registrer,
    CvErDelt,
    SlettSendtCv,
    BekreftFjernRegistrering,
    BekreftSlettSendtCv,
}

const hentInitiellVisning = (
    utfall: Kandidatutfall,
    utfallsendringer: Utfallsendring[],
    cvErSlettet: boolean
): Visning => {
    if (cvErSlettet) {
        return Visning.CvErDelt;
    } else if (utfall === Kandidatutfall.IkkePresentert) {
        return Visning.Registrer;
    } else {
        const sisteUtfallsendring = hentSisteKandidatutfall(utfall, utfallsendringer);

        if (
            sisteUtfallsendring?.sendtTilArbeidsgiversKandidatliste ||
            bleSendtTilArbeidsgiversKandidatlisteFørAvregistreringAvFåttJobben(utfallsendringer)
        ) {
            return Visning.SlettSendtCv;
        } else {
            return Visning.CvErDelt;
        }
    }
};

const bleSendtTilArbeidsgiversKandidatlisteFørAvregistreringAvFåttJobben = (
    utfallsendringer: Utfallsendring[]
): boolean => {
    if (utfallsendringer.length < 3) return false;

    const [sisteUtfall, nestSisteutfall, tredjeSisteUtfall] = utfallsendringer;

    const harFjernetRegistreringAvFåttJobben =
        sisteUtfall.utfall === Kandidatutfall.Presentert &&
        nestSisteutfall.utfall === Kandidatutfall.FåttJobben &&
        tredjeSisteUtfall.utfall === Kandidatutfall.Presentert;

    return (
        harFjernetRegistreringAvFåttJobben && tredjeSisteUtfall.sendtTilArbeidsgiversKandidatliste
    );
};

const DelingAvCv: FunctionComponent<Props> = ({
    kanEndre,
    utfall,
    utfallsendringer,
    onEndreUtfall,
    onSlettCv,
}) => {
    const cvErSlettet = cvErSendtTilArbeidsgiverOgSlettet(utfallsendringer);
    const slettCvStatus = useSelector(
        (state: AppState) => state.kandidatliste.slettCvFraArbeidsgiversKandidatlisteStatus
    );

    const [visning, setVisning] = useState<Visning>(
        hentInitiellVisning(utfall, utfallsendringer, cvErSlettet)
    );

    useEffect(() => {
        setVisning(hentInitiellVisning(utfall, utfallsendringer, cvErSlettet));
    }, [utfall, utfallsendringer, cvErSlettet]);

    const onFjernRegistrering = () => setVisning(Visning.BekreftFjernRegistrering);
    const onSlettSendtCv = () => setVisning(Visning.BekreftSlettSendtCv);

    const onAvbrytFjerningAvRegistrering = () => setVisning(Visning.CvErDelt);
    const onAvbrytSlettSendtCv = () => setVisning(Visning.SlettSendtCv);

    const onBekreftFjerningAvRegistrering = () => {
        onEndreUtfall(Kandidatutfall.IkkePresentert);
    };

    const onBekreftSlettSendtCv = () => {
        onSlettCv();
    };

    const hendelsesstatus =
        utfall === Kandidatutfall.FåttJobben || utfall === Kandidatutfall.Presentert || cvErSlettet
            ? Hendelsesstatus.Grønn
            : Hendelsesstatus.Hvit;

    const sisteUtfallPresentert = hentSisteKandidatutfall(
        Kandidatutfall.Presentert,
        utfallsendringer
    );

    const gjeldendeUtfallErFåttJobben = utfall === Kandidatutfall.FåttJobben;

    const utfallsbeskrivelse = sisteUtfallPresentert
        ? `${formaterDatoNaturlig(sisteUtfallPresentert.tidspunkt)} av ${
              sisteUtfallPresentert.registrertAvIdent
          }`
        : undefined;

    switch (visning) {
        case Visning.Registrer:
            return (
                <Hendelse
                    status={hendelsesstatus}
                    tittel="CV-en er delt med arbeidsgiver"
                    beskrivelse="Gjøres i kandidatlisten"
                >
                    {kanEndre === null && <Loader />}
                </Hendelse>
            );

        case Visning.CvErDelt:
            return (
                <Hendelse
                    status={hendelsesstatus}
                    tittel="CV-en er delt med arbeidsgiver"
                    beskrivelse={utfallsbeskrivelse}
                >
                    {kanEndre && !cvErSlettet && !gjeldendeUtfallErFåttJobben && (
                        <Button
                            variant="tertiary"
                            onClick={onFjernRegistrering}
                            icon={<MinusCircleIcon />}
                            size="small"
                        >
                            Fjern registrering
                        </Button>
                    )}
                </Hendelse>
            );

        case Visning.SlettSendtCv:
            return (
                <Hendelse
                    status={hendelsesstatus}
                    tittel="CV-en er delt med arbeidsgiver"
                    beskrivelse={utfallsbeskrivelse}
                >
                    {kanEndre && !gjeldendeUtfallErFåttJobben && (
                        <Button
                            variant="tertiary"
                            size="small"
                            onClick={onSlettSendtCv}
                            icon={<MinusCircleIcon />}
                        >
                            Slett CV-en hos arbeidsgiver
                        </Button>
                    )}
                </Hendelse>
            );

        case Visning.BekreftFjernRegistrering:
            return (
                <Hendelse
                    renderChildrenBelowContent
                    status={hendelsesstatus}
                    tittel={'Fjern registreringen "delt med arbeidsgiver"'}
                    beskrivelse={
                        'Hvis du fjerner registreringen vil tellingen på "presentert" forsvinne.'
                    }
                >
                    {kanEndre && (
                        <div className={css.knapperUnderHendelse}>
                            <Button size="small" onClick={onBekreftFjerningAvRegistrering}>
                                Fjern registreringen
                            </Button>
                            <Button
                                size="small"
                                variant="secondary"
                                onClick={onAvbrytFjerningAvRegistrering}
                            >
                                Avbryt
                            </Button>
                        </div>
                    )}
                </Hendelse>
            );

        case Visning.BekreftSlettSendtCv:
            return (
                <Hendelse
                    renderChildrenBelowContent
                    status={hendelsesstatus}
                    tittel="Slett CV-en fra kandidatlisten til arbeidsgiver"
                    beskrivelse={
                        <>
                            <BodyLong size="small" spacing>
                                Hvis du utfører denne handlingen så blir CV-en slettet fra
                                kandidatlisten til arbeidsgiver. Arbeidsgiver vil ikke kunne se
                                CV-en til kandidaten.
                            </BodyLong>
                            <BodyLong size="small">
                                Husk at årsaken til at du sletter CV-en må journalføres.
                            </BodyLong>
                        </>
                    }
                >
                    {kanEndre && (
                        <div className={css.knapperUnderHendelse}>
                            <Button
                                size="small"
                                loading={slettCvStatus === Nettstatus.SenderInn}
                                onClick={
                                    slettCvStatus === Nettstatus.SenderInn
                                        ? () => null
                                        : onBekreftSlettSendtCv
                                }
                            >
                                Slett CV-en
                            </Button>
                            <Button size="small" variant="secondary" onClick={onAvbrytSlettSendtCv}>
                                Avbryt
                            </Button>
                        </div>
                    )}
                    {slettCvStatus === Nettstatus.Feil && (
                        <ErrorMessage>
                            Klarte ikke å slette CV-en. Vennligst prøv igjen senere.
                        </ErrorMessage>
                    )}
                </Hendelse>
            );
    }
};

export default DelingAvCv;
