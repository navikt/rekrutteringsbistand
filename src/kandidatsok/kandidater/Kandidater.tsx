import { PersonPlusIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, ErrorMessage } from '@navikt/ds-react';
import { FunctionComponent, useContext, useState } from 'react';

import Sidelaster from 'felles/komponenter/sidelaster/Sidelaster';
import { useHentMineKandidaterIStilling } from '../../api/kandidat-api/hentMineKandidaterIStillling';
import { KandidatsøkKandidat } from '../../api/kandidat-søk-api/kandidatsøk';
import { KandidatSøkContext } from '../KandidatSøkContext';
import Paginering from '../filter/Paginering';
import { useMarkerteKandidaterØkt } from '../hooks/MarkerteKandidaterContext';
import LagreKandidaterIMineKandidatlisterModal from '../kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import LagreKandidaterISpesifikkKandidatlisteModal from '../kandidatliste/LagreKandidaterISpesifikkKandidatlisteModal';
import AntallKandidater from './AntallKandidater';
import css from './Kandidater.module.css';
import MarkerAlle from './MarkerAlle';
import Kandidatrad from './kandidatrad/Kandidatrad';
import Sortering from './sortering/Sortering';

type Props = {
    stillingId: string | null;
};

enum Modal {
    IngenModal,
    LagreIMineKandidatlister,
    BekreftLagreIKandidatliste,
}

const Kandidater: FunctionComponent<Props> = ({ stillingId }) => {
    const { kandidatSøk } = useContext(KandidatSøkContext);
    const [aktivModal, setAktivModal] = useState<Modal>(Modal.IngenModal);
    const { markerteKandidater, onMarkerKandidat, fjernMarkering } = useMarkerteKandidaterØkt();

    const {
        data: mineKandidaterIStilling,
        isLoading,
        error,
    } = useHentMineKandidaterIStilling({ stillingId });

    const onLagreIKandidatlisteClick = () => {
        setAktivModal(
            stillingId ? Modal.BekreftLagreIKandidatliste : Modal.LagreIMineKandidatlister
        );
    };

    const kandidatsøkKandidater = kandidatSøk?.kandidater;
    const totalHits = kandidatSøk?.antallTotalt;

    const erKandidatIListen = (kandidatnr: string): boolean => {
        return mineKandidaterIStilling?.includes(kandidatnr) || false;
    };

    if (isLoading) {
        return <Sidelaster />;
    }

    if (error) {
        return <ErrorMessage> Klarte ikke å laste inn informasjon om kandidater </ErrorMessage>;
    }

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
                            mineKandidaterIStilling={mineKandidaterIStilling}
                        />
                        <Sortering />
                    </div>
                    <ul className={css.kandidatrader}>
                        {(kandidatsøkKandidater || []).map((kandidat: KandidatsøkKandidat) => (
                            <Kandidatrad
                                key={kandidat.arenaKandidatnr}
                                kandidat={kandidat}
                                markerteKandidater={markerteKandidater}
                                stillingId={stillingId}
                                onMarker={() => {
                                    onMarkerKandidat(kandidat.arenaKandidatnr);
                                }}
                                erIListen={erKandidatIListen(kandidat.arenaKandidatnr)}
                            />
                        ))}
                    </ul>
                    <Paginering antallTreff={totalHits || 0} />
                </>
            ) : (
                <BodyShort> Fant ingen kandidater </BodyShort>
            )}
            {stillingId == null ? (
                <LagreKandidaterIMineKandidatlisterModal
                    vis={aktivModal === Modal.LagreIMineKandidatlister}
                    onClose={() => setAktivModal(Modal.IngenModal)}
                    markerteKandidater={markerteKandidater}
                    kandidaterPåSiden={kandidatsøkKandidater || []}
                    fjernMarkering={fjernMarkering}
                />
            ) : (
                <LagreKandidaterISpesifikkKandidatlisteModal
                    vis={aktivModal === Modal.BekreftLagreIKandidatliste}
                    onClose={() => setAktivModal(Modal.IngenModal)}
                    markerteKandidater={markerteKandidater}
                    stillingId={stillingId}
                    fjernMarkering={fjernMarkering}
                />
            )}
        </div>
    );
};

export default Kandidater;
