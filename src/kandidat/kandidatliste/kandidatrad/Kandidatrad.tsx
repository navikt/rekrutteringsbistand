import { InformationSquareIcon, TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Checkbox } from '@navikt/ds-react';
import classNames from 'classnames';
import { FunctionComponent, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { KandidatIKandidatliste } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste, { Kandidatlistestatus } from 'felles/domene/kandidatliste/Kandidatliste';
import { lenkeTilCv } from '../../app/paths';
import AppState from '../../state/AppState';
import { formaterDato } from '../../utils/dateUtils';
import { capitalizeFirstLetter } from '../../utils/formateringUtils';
import { Visningsstatus } from '../domene/Kandidatressurser';
import { erInaktiv } from '../domene/kandidatUtils';
import { erKobletTilStilling } from '../domene/kandidatlisteUtils';
import useForespørselOmDelingAvCv from '../hooks/useForespørselOmDelingAvCv';
import useKandidattilstand from '../hooks/useKandidattilstand';
import useSendtKandidatmelding from '../hooks/useSendtKandidatmelding';
import { modifierTilListeradGrid } from '../liste-header/ListeHeader';
import KandidatlisteActionType from '../reducer/KandidatlisteActionType';
import css from './Kandidatrad.module.css';
import MerInfo from './mer-info/MerInfo';
import SmsStatusPopup from './smsstatus/SmsStatusPopup';
import StatusOgHendelser from './status-og-hendelser/StatusOgHendelser';
import StatusPåForespørselOmDelingAvCv from './status-på-forespørsel/StatusPåForespørselOmDelingAvCv';

type Props = {
    kandidat: KandidatIKandidatliste;
    kandidatliste: Kandidatliste;
    toggleArkivert: any;
    onToggleKandidat: (kandidatnr: string) => void;
    onKandidatStatusChange: any;
    visArkiveringskolonne: boolean;
    sistValgteKandidat?: {
        kandidatlisteId: string;
        kandidatnr: string;
    };
};

const Kandidatrad: FunctionComponent<Props> = ({
    kandidat,
    kandidatliste,
    toggleArkivert,
    onToggleKandidat,
    onKandidatStatusChange,
    visArkiveringskolonne,
    sistValgteKandidat,
}) => {
    const dispatch = useDispatch();
    const kandidatRadRef = useRef<HTMLDivElement>(null);

    const tilstand = useKandidattilstand(kandidat.kandidatnr);
    const melding = useSendtKandidatmelding(kandidat.fodselsnr);
    const forespørselOmDelingAvCv = useForespørselOmDelingAvCv(kandidat.aktørid);

    useEffect(() => {
        const erSistValgteKandidat =
            sistValgteKandidat &&
            sistValgteKandidat.kandidatnr === kandidat.kandidatnr &&
            sistValgteKandidat.kandidatlisteId === kandidatliste.kandidatlisteId;

        if (erSistValgteKandidat) {
            kandidatRadRef?.current?.focus();
        }
    }, [sistValgteKandidat, kandidat.kandidatnr, kandidatliste.kandidatlisteId, kandidatRadRef]);

    const endreVisningsstatus = (visningsstatus: Visningsstatus) => {
        dispatch({
            type: KandidatlisteActionType.EndreVisningsstatusKandidat,
            kandidatnr: kandidat.kandidatnr,
            visningsstatus,
        });
    };

    const toggleMerInfo = () => {
        endreVisningsstatus(
            tilstand?.visningsstatus === Visningsstatus.VisMerInfo
                ? Visningsstatus.SkjulPanel
                : Visningsstatus.VisMerInfo
        );
    };

    const onToggleArkivert = () => {
        toggleArkivert(kandidatliste.kandidatlisteId, kandidat.kandidatnr, true);
    };

    const fornavn = kandidat.fornavn ? capitalizeFirstLetter(kandidat.fornavn) : '';
    const etternavn = kandidat.etternavn ? capitalizeFirstLetter(kandidat.etternavn) : '';
    const fulltNavn = `${etternavn}, ${fornavn}`;

    const klassenavnForListerad = classNames(
        css.rad,
        modifierTilListeradGrid(erKobletTilStilling(kandidatliste), visArkiveringskolonne)
    );

    const klassenavn = classNames(css.kandidat, {
        [css.kandidatDisabled]: kandidatliste.status === Kandidatlistestatus.Lukket,
        [css.kandidatChecked]: tilstand?.markert,
    });

    const kanEndreKandidatlisten =
        kandidatliste.status === Kandidatlistestatus.Åpen && kandidatliste.kanEditere;

    const kandidatenKanMarkeres =
        kandidatliste.status === Kandidatlistestatus.Åpen &&
        (!erInaktiv(kandidat) || kandidat.arkivert);

    return (
        <div role="rowgroup" tabIndex={-1} ref={kandidatRadRef} className={klassenavn}>
            <div role="row" className={klassenavnForListerad}>
                <div role="cell">
                    <StatusPåForespørselOmDelingAvCv forespørsel={forespørselOmDelingAvCv} />
                </div>
                <Checkbox
                    disabled={!kandidatenKanMarkeres}
                    checked={tilstand?.markert}
                    onChange={() => {
                        onToggleKandidat(kandidat.kandidatnr);
                    }}
                >
                    &#8203;
                </Checkbox>
                <div className={css.kolonneSorterbar}>
                    {erInaktiv(kandidat) ? (
                        <BodyShort>{fulltNavn}</BodyShort>
                    ) : (
                        <Link
                            role="cell"
                            title="Vis profil"
                            className={classNames('navds-link', css.kolonneMedSmsLenke)}
                            to={lenkeTilCv(
                                kandidat.kandidatnr,
                                { stillingId: kandidatliste.stillingId },
                                true
                            )}
                        >
                            {fulltNavn}
                        </Link>
                    )}
                    {melding && <SmsStatusPopup sms={melding} />}
                </div>
                <div role="cell" className={classNames(css.kolonneSorterbar, css.wrapHvorSomHelst)}>
                    {erInaktiv(kandidat) ? 'Inaktiv' : kandidat.fodselsnr}
                </div>
                <div role="cell" className={css.kolonneSorterbar}>
                    <span className={css.tabellTekstInner}>
                        {kandidat.lagtTilAv.navn} ({kandidat.lagtTilAv.ident})
                    </span>
                </div>

                <div role="cell" className={classNames(css.kolonneSorterbar, css.lagtTil)}>
                    <span>{formaterDato(kandidat.lagtTilTidspunkt)}</span>
                </div>

                <StatusOgHendelser
                    kandidat={kandidat}
                    kandidatliste={kandidatliste}
                    forespørselOmDelingAvCv={forespørselOmDelingAvCv}
                    kanEditere={kanEndreKandidatlisten}
                    sms={melding}
                    onStatusChange={(status) => {
                        onKandidatStatusChange(
                            status,
                            kandidatliste.kandidatlisteId,
                            kandidat.kandidatnr
                        );
                    }}
                />
                <div role="cell" className={css.kolonneMidtstilt}>
                    {!erInaktiv(kandidat) && (
                        <Button
                            size="small"
                            variant="tertiary"
                            onClick={toggleMerInfo}
                            icon={<InformationSquareIcon aria-label="Mer informasjon" />}
                        ></Button>
                    )}
                </div>
                {visArkiveringskolonne && (
                    <div role="cell" className={css.kolonneHøyrestilt}>
                        <Button
                            size="small"
                            variant="tertiary"
                            aria-label="Slett kandidat"
                            onClick={onToggleArkivert}
                            icon={<TrashIcon aria-label="Slett kandidat" />}
                        ></Button>
                    </div>
                )}
            </div>
            {tilstand?.visningsstatus === Visningsstatus.VisMerInfo && (
                <MerInfo kandidat={kandidat} />
            )}
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    sistValgteKandidat: state.kandidatliste.sistValgteKandidat,
});

export default connect(mapStateToProps, null)(Kandidatrad);
