import { MobileIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import Kandidatliste, { Kandidatlistestatus } from 'felles/domene/kandidatliste/Kandidatliste';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { FunctionComponent, ReactNode } from 'react';
import { Kandidatmeldinger } from '../domene/Kandidatressurser';
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

type Props = {
    kandidatliste: Kandidatliste;
    onKandidatShare: () => void;
    onLeggTilKandidat: () => void;
    onSendSmsClick: () => void;
    onKandidaterAngreArkivering: () => void;
    visArkiverte: boolean;
    sendteMeldinger: Nettressurs<Kandidatmeldinger>;
    children: ReactNode;
};

const KnappeRad: FunctionComponent<Props> = ({
    kandidatliste,
    onKandidatShare,
    onSendSmsClick,
    onKandidaterAngreArkivering,
    sendteMeldinger,
    children,
    visArkiverte,
}) => {
    const markerteKandidater = useMarkerteKandidater(kandidatliste.kandidater);
    const minstEnKandidatErMarkert = markerteKandidater.length > 0;
    const markerteAktiveKandidater = markerteKandidater.filter((kandidat) => kandidat.fodselsnr);
    const smsApiFeil = sendteMeldinger.kind === Nettstatus.Feil;
    const minstEnKandidatHarIkkeFåttSms =
        sendteMeldinger.kind === Nettstatus.Suksess &&
        markerteAktiveKandidater.some(
            (markertKandidat) => !sendteMeldinger.data[markertKandidat.fodselsnr!]
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
                    {skalViseEkstraKnapper &&
                    smsApiFeil ? /* TODO: burde ideelt sett vise en feilmelding om at vi ikke kan hente SMS-status. */ null : minstEnKandidatErMarkert &&
                      minstEnKandidatHarIkkeFåttSms ? (
                        <Button variant="tertiary" onClick={onSendSmsClick} icon={<MobileIcon />}>
                            Send SMS
                        </Button>
                    ) : (
                        <MedPopover
                            tittel="Send SMS til de markerte kandidatene"
                            hjelpetekst={
                                minstEnKandidatErMarkert
                                    ? 'Du har allerede sendt SMS til alle markerte kandidater.'
                                    : 'Du må huke av for kandidatene du ønsker å sende SMS til.'
                            }
                        >
                            <Button variant="tertiary" icon={<MobileIcon />}>
                                Send SMS
                            </Button>
                        </MedPopover>
                    )}
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
