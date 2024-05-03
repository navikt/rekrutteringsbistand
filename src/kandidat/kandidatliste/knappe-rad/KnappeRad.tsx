import { MobileIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import Kandidatliste, { Kandidatlistestatus } from 'felles/domene/kandidatliste/Kandidatliste';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import { FunctionComponent, ReactNode } from 'react';
import TilgangskontrollForInnhold, {
    Rolle,
} from '../../../felles/tilgangskontroll/TilgangskontrollForInnhold';
import {
    erKobletTilArbeidsgiver,
    erKobletTilStilling,
    kandidaterMåGodkjenneDelingAvCv,
} from '../domene/kandidatlisteUtils';
import useMarkerteKandidater from '../hooks/useMarkerteKandidater';
import MedPopover from '../med-popover/MedPopover';
import DelMedArbeidsgiverKnapp from './DelMedArbeidsgiverKnapp';
import css from './KnappeRad.module.css';
import ForespørselOmDelingAvCv from './forespørsel-om-deling-av-cv/ForespørselOmDelingAvCv';
import { useSmserForStilling } from '../../../api/sms-api/sms';

type Props = {
    kandidatliste: Kandidatliste;
    onKandidatShare: () => void;
    onSendSmsClick: () => void;
    onKandidaterAngreArkivering: () => void;
    visArkiverte: boolean;
    children: ReactNode;
};

const KnappeRad: FunctionComponent<Props> = ({
    kandidatliste,
    onKandidatShare,
    onSendSmsClick,
    onKandidaterAngreArkivering,
    children,
    visArkiverte,
}) => {
    const { data: sendteMeldinger, error } = useSmserForStilling(kandidatliste.stillingId ?? null);
    const markerteKandidater = useMarkerteKandidater(kandidatliste.kandidater);
    const minstEnKandidatErMarkert = markerteKandidater.length > 0;
    const markerteAktiveKandidater = markerteKandidater.filter((kandidat) => kandidat.fodselsnr);
    const smsApiFeil = error !== undefined;
    const minstEnKandidatHarIkkeFåttSms =
        sendteMeldinger !== undefined &&
        markerteAktiveKandidater.some(
            (markertKandidat) => !sendteMeldinger[markertKandidat.fodselsnr!]
        );

    const skalViseEkstraKnapper =
        kandidatliste.kanEditere && erKobletTilStilling(kandidatliste) && !visArkiverte;

    const skalViseDelMedArbeidsgiverKnapp =
        kandidatliste.kanEditere &&
        erKobletTilStilling(kandidatliste) &&
        erKobletTilArbeidsgiver(kandidatliste) &&
        kandidatliste.stillingskategori !== Stillingskategori.Formidling &&
        kandidatliste.stillingskategori !== Stillingskategori.Jobbmesse &&
        !visArkiverte;

    const skalViseDelMedKandidatKnapp =
        kandidaterMåGodkjenneDelingAvCv(kandidatliste) &&
        erKobletTilArbeidsgiver(kandidatliste) &&
        !visArkiverte;

    const skalViseAngreSlettingKnapp = visArkiverte;

    return (
        <div className={css.kandidatlisteknapper}>
            <div className={css.venstre}>{children}</div>
            {kandidatliste.status === Kandidatlistestatus.Åpen && (
                <div className={css.høyre}>
                    <TilgangskontrollForInnhold
                        skjulVarsel
                        kreverEnAvRollene={[
                            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                        ]}
                    >
                        {skalViseEkstraKnapper &&
                        smsApiFeil ? /* TODO: burde ideelt sett vise en feilmelding om at vi ikke kan hente SMS-status. */ null : minstEnKandidatErMarkert &&
                          minstEnKandidatHarIkkeFåttSms ? (
                            <Button
                                variant="tertiary"
                                onClick={onSendSmsClick}
                                icon={<MobileIcon />}
                            >
                                Send beskjed
                            </Button>
                        ) : (
                            <MedPopover
                                tittel="Send beskjed til de markerte kandidatene"
                                hjelpetekst={
                                    minstEnKandidatErMarkert
                                        ? 'Du har allerede sendt beskjed til alle markerte kandidater.'
                                        : 'Du må huke av for kandidatene du ønsker å sende beskjed til.'
                                }
                            >
                                <Button variant="tertiary" icon={<MobileIcon />}>
                                    Send beskjed
                                </Button>
                            </MedPopover>
                        )}
                    </TilgangskontrollForInnhold>
                    {skalViseDelMedKandidatKnapp && (
                        <ForespørselOmDelingAvCv
                            stillingsId={kandidatliste.stillingId!}
                            markerteKandidater={markerteKandidater}
                        />
                    )}
                    {skalViseDelMedArbeidsgiverKnapp && (
                        <DelMedArbeidsgiverKnapp
                            minstEnKandidatErMarkert={minstEnKandidatErMarkert}
                            kandidatliste={kandidatliste}
                            markerteKandidater={markerteKandidater}
                            onKandidatShare={onKandidatShare}
                        />
                    )}
                    {skalViseAngreSlettingKnapp &&
                        (minstEnKandidatErMarkert ? (
                            <Button
                                variant="tertiary"
                                onClick={onKandidaterAngreArkivering}
                                icon={<TrashIcon aria-hidden />}
                            >
                                <span className={css.knapptekst}>Angre sletting</span>
                            </Button>
                        ) : (
                            <MedPopover
                                placement="bottom-end"
                                hjelpetekst="Du må huke av for kandidatene du ønsker å angre sletting for."
                            >
                                <Button
                                    variant="tertiary"
                                    icon={
                                        <TrashIcon aria-label="Angre sletting for de markerte kandidatene" />
                                    }
                                >
                                    <span className={css.knapptekst}>Angre sletting</span>
                                </Button>
                            </MedPopover>
                        ))}
                </div>
            )}
        </div>
    );
};

export default KnappeRad;
