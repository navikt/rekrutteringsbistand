import { XMarkIcon } from '@navikt/aksel-icons';
import { Button, Heading, Popover } from '@navikt/ds-react';
import { FunctionComponent, useContext, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { formaterDatoNaturlig } from '../../utils/dateUtils';
import statusOgHendelsercss from '../kandidatrad/status-og-hendelser/StatusOgHendelser.module.css';
import endreStatusOgHendelserCss from '../kandidatrad/status-og-hendelser/endre-status-og-hendelser/EndreStatusOgHendelser.module.css';
import StatusOgHendelserKnapp from '../kandidatrad/status-og-hendelser/endre-status-og-hendelser/StatusOgHendelserKnapp';
import Hendelsesetikett from '../kandidatrad/status-og-hendelser/etiketter/Hendelsesetikett';
import DelingAvCv from '../kandidatrad/status-og-hendelser/hendelser/DelingAvCv';
import FåttJobben from '../kandidatrad/status-og-hendelser/hendelser/FåttJobben';
import Hendelse, { Hendelsesstatus } from '../kandidatrad/status-og-hendelser/hendelser/Hendelse';
import KandidatlisteActionType from '../reducer/KandidatlisteActionType';

import classNames from 'classnames';
import {
    FormidlingAvUsynligKandidat,
    Kandidatutfall,
} from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { ApplikasjonContext } from '../../../felles/ApplikasjonContext';
import css from './FormidlingAvUsynligKandidatrad.module.css';

type Props = {
    kandidatlisteId: string;
    formidling: FormidlingAvUsynligKandidat;
    kandidatlistenErLukket: boolean;
    erEierAvKandidatlisten: boolean;
};

const FormidlingAvUsynligKandidatrad: FunctionComponent<Props> = ({
    formidling,
    kandidatlistenErLukket,
    erEierAvKandidatlisten,
    kandidatlisteId,
}) => {
    const dispatch = useDispatch();
    const { valgtNavKontor } = useContext(ApplikasjonContext);
    const popoverRef = useRef<HTMLButtonElement | null>(null);
    const [visPopover, setVisPopover] = useState<boolean>(false);

    const kanEditere = erEierAvKandidatlisten && !kandidatlistenErLukket;

    const endreFormidlingsutfallForUsynligKandidat = (utfall: Kandidatutfall) => {
        dispatch({
            type: KandidatlisteActionType.EndreFormidlingsutfallForUsynligKandidat,
            utfall,
            kandidatlisteId,
            formidlingId: formidling.id,
            navKontor: valgtNavKontor,
        });
    };

    const cvDeltBeskrivelse = `Lagt til i listen av ${formidling.lagtTilAvNavn} (${
        formidling.lagtTilAvIdent
    }) ${formaterDatoNaturlig(formidling.lagtTilTidspunkt)}`;

    const fulltNavn = `${formidling.etternavn}, ${formidling.fornavn}`;

    return (
        <div
            role="row"
            className={classNames(css.formidlingAvUsynligKandidatrad, {
                [css.lukketListe]: kandidatlistenErLukket,
            })}
        >
            <span />
            <div role="cell" className={css.kolonne}>
                {fulltNavn}
            </div>
            <div role="cell">Ikke synlig i Rekrutteringsbistand</div>
            <div role="cell" className={css.kolonne}>
                <div className={statusOgHendelsercss.statusOgHendelser}>
                    {formidling.utfall !== Kandidatutfall.IkkePresentert && (
                        <Hendelsesetikett utfall={formidling.utfall} utfallsendringer={[]} />
                    )}
                    <StatusOgHendelserKnapp
                        ref={popoverRef}
                        kanEndre={kanEditere}
                        onClick={() => setVisPopover(!visPopover)}
                    />
                    <Popover
                        open={visPopover}
                        anchorEl={popoverRef.current}
                        onClose={() => setVisPopover(false)}
                    >
                        <Popover.Content className={statusOgHendelsercss.popover}>
                            <Heading spacing level="2" size="small">
                                Hendelser
                            </Heading>
                            <ol className={endreStatusOgHendelserCss.hendelsesliste}>
                                <Hendelse
                                    status={Hendelsesstatus.Grønn}
                                    tittel="Ny kandidat"
                                    beskrivelse={cvDeltBeskrivelse}
                                />
                                <DelingAvCv
                                    kanEndre={kanEditere}
                                    utfall={formidling.utfall}
                                    utfallsendringer={[]}
                                    onEndreUtfall={endreFormidlingsutfallForUsynligKandidat}
                                    onSlettCv={() => null}
                                />
                                <FåttJobben
                                    kanEndre={kanEditere}
                                    utfall={formidling.utfall}
                                    utfallsendringer={[]}
                                    navn={fulltNavn}
                                    onEndreUtfall={endreFormidlingsutfallForUsynligKandidat}
                                />
                            </ol>
                            <Button
                                size="small"
                                variant="secondary"
                                className={statusOgHendelsercss.lukkPopoverKnapp}
                                onClick={() => setVisPopover(false)}
                                icon={<XMarkIcon />}
                            ></Button>
                        </Popover.Content>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default FormidlingAvUsynligKandidatrad;
