import { PersonPlusIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import { FunctionComponent, useContext, useState } from 'react';

import { KandidatsøkKandidat } from '../../api/kandidat-søk-api/kandidatsøk';
import { KandidatSøkContext } from '../KandidatSøkContext';
import Paginering from '../filter/Paginering';
import { KontekstAvKandidatlisteEllerStilling } from '../hooks/useKontekstAvKandidatlisteEllerStilling';
import LagreKandidaterIMineKandidatlisterModal from '../kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import LagreKandidaterISpesifikkKandidatlisteModal from '../kandidatliste/LagreKandidaterISpesifikkKandidatlisteModal';
import AntallKandidater from './AntallKandidater';
import css from './Kandidater.module.css';
import MarkerAlle from './MarkerAlle';
import Kandidatrad from './kandidatrad/Kandidatrad';
import Sortering from './sortering/Sortering';

type Props = {
    kontekstAvKandidatlisteEllerStilling: KontekstAvKandidatlisteEllerStilling | null;
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatnr: string | string[]) => void;
    fjernMarkering: () => void;
};

enum Modal {
    IngenModal,
    LagreIMineKandidatlister,
    BekreftLagreIKandidatliste,
}

const Kandidater: FunctionComponent<Props> = ({
    kontekstAvKandidatlisteEllerStilling,
    markerteKandidater,
    onMarkerKandidat,
    fjernMarkering,
}) => {
    const { kandidatSøk } = useContext(KandidatSøkContext);
    const [aktivModal, setAktivModal] = useState<Modal>(Modal.IngenModal);

    const onLagreIKandidatlisteClick = () => {
        setAktivModal(
            kontekstAvKandidatlisteEllerStilling
                ? Modal.BekreftLagreIKandidatliste
                : Modal.LagreIMineKandidatlister
        );
    };

    const kandidatsøkKandidater = kandidatSøk?.kandidater;
    const totalHits = kandidatSøk?.antallTotalt;

    return (
        <div className={css.kandidater}>
            <div className={css.handlinger}>
                {!totalHits ? <div /> : <AntallKandidater antallTreff={totalHits} />}
                <div className={css.knapper}>
                    {markerteKandidater.size > 0 && (
                        <Button
                            size="small"
                            variant="secondary"
                            aria-label="Fjern markerte kandidater"
                            icon={<XMarkIcon aria-hidden />}
                            className={css.fjernMarkeringKnapp}
                            onClick={fjernMarkering}
                        >
                            {markerteKandidater.size} markert
                        </Button>
                    )}
                    <Button
                        size="small"
                        variant="primary"
                        icon={<PersonPlusIcon aria-hidden />}
                        disabled={markerteKandidater.size === 0}
                        onClick={onLagreIKandidatlisteClick}
                    >
                        Lagre i kandidatliste
                    </Button>
                </div>
            </div>

            {kandidatsøkKandidater && kandidatsøkKandidater.length > 0 ? (
                <>
                    <div className={css.overKandidater}>
                        <MarkerAlle
                            kandidater={kandidatsøkKandidater || []}
                            markerteKandidater={markerteKandidater}
                            onMarkerKandidat={onMarkerKandidat}
                            kontekstAvKandidatlisteEllerStilling={
                                kontekstAvKandidatlisteEllerStilling
                            }
                        />
                        <Sortering />
                    </div>
                    <ul className={css.kandidatrader}>
                        {(kandidatsøkKandidater || []).map((kandidat: KandidatsøkKandidat) => (
                            <Kandidatrad
                                key={kandidat.arenaKandidatnr}
                                kandidat={kandidat}
                                markerteKandidater={markerteKandidater}
                                kontekstAvKandidatlisteEllerStilling={
                                    kontekstAvKandidatlisteEllerStilling
                                }
                                onMarker={() => {
                                    onMarkerKandidat(kandidat.arenaKandidatnr);
                                }}
                            />
                        ))}
                    </ul>
                    <Paginering antallTreff={totalHits || 0} />
                </>
            ) : (
                <BodyShort> Fant ingen kandidater </BodyShort>
            )}
            {kontekstAvKandidatlisteEllerStilling === null ? (
                <LagreKandidaterIMineKandidatlisterModal
                    vis={aktivModal === Modal.LagreIMineKandidatlister}
                    onClose={() => setAktivModal(Modal.IngenModal)}
                    markerteKandidater={markerteKandidater}
                    kandidaterPåSiden={kandidatsøkKandidater || []}
                />
            ) : (
                <LagreKandidaterISpesifikkKandidatlisteModal
                    vis={aktivModal === Modal.BekreftLagreIKandidatliste}
                    onClose={() => setAktivModal(Modal.IngenModal)}
                    markerteKandidater={markerteKandidater}
                    kontekstAvKandidatlisteEllerStilling={kontekstAvKandidatlisteEllerStilling}
                />
            )}
        </div>
    );
};

export default Kandidater;
