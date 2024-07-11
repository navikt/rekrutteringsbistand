import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CopyButton } from '@navikt/ds-react';
import Stilling, { hentTittelFraStilling } from 'felles/domene/stilling/Stilling';
import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import { useSelector } from 'react-redux';
import { useMeg } from '../../../api/frackend/meg';
import {
    Kandidatsammendrag,
    useKandidatsammendrag,
} from '../../../api/kandidat-søk-api/kandidatsammendrag';
import { State } from '../../redux/store';
import { hentAnnonselenke, stillingErPublisert } from '../adUtils';
import AnbefalKandidatModal from './AnbefalKandidatModal';
import Kandidatlistehandlinger from './Kandidatlistehandlinger';
import css from './KontekstAvKandidat.module.css';

type Props = {
    kandidatnr: string;
    stilling: Stilling;
    kandidatlisteId: string;
};

const KontekstAvKandidat = ({ kandidatnr, stilling, kandidatlisteId }: Props) => {
    const { kandidatsammendrag } = useKandidatsammendrag({ kandidatnr });

    const { state } = useLocation();
    const [visModal, setVisModal] = useState<boolean>(false);

    const stillingsinfo = useSelector((state: State) => state.stillingsinfoData);

    const brødsmulesti = kandidatsammendrag
        ? byggBrødsmulesti(kandidatnr, stilling, kandidatsammendrag, state?.stillingssøk)
        : [];

    const { navIdent } = useMeg();

    const erEier =
        stilling?.administration?.navIdent === navIdent || stillingsinfo?.eierNavident === navIdent;

    return (
        <div className={css.wrapperTilBanner}>
            <div className={css.innerWrapperTilBanner}>
                {kandidatsammendrag && (
                    <Kandidatbanner
                        kandidatnr={kandidatsammendrag.arenaKandidatnr}
                        brødsmulesti={brødsmulesti}
                        nederstTilHøyre={
                            <div className={css.knapper}>
                                {stillingErPublisert(stilling) && (
                                    <CopyButton
                                        copyText={hentAnnonselenke(stilling.uuid)}
                                        text="Kopier annonselenke"
                                        size="small"
                                        className={css.copyButton}
                                    />
                                )}
                                <Kandidatlistehandlinger
                                    kandidatlisteId={kandidatlisteId}
                                    stillingsId={stilling.uuid}
                                    erEier={erEier}
                                    onAnbefalClick={() => {
                                        setVisModal(true);
                                    }}
                                />
                            </div>
                        }
                    />
                )}
                {kandidatsammendrag && kandidatlisteId && (
                    <AnbefalKandidatModal
                        kandidat={kandidatsammendrag}
                        stillingId={stilling.uuid}
                        onClose={() => setVisModal(false)}
                        vis={visModal}
                    />
                )}
            </div>
        </div>
    );
};

const byggBrødsmulesti = (
    kandidatnr: string,
    stilling: Stilling,
    kandidatsammendrag: Kandidatsammendrag,
    stillingssøk?: string
) => {
    if (!kandidatsammendrag) {
        return undefined;
    }

    let urlTilFinnStilling = `/stillinger/stillingssok/kandidat/${kandidatnr}`;
    if (stillingssøk) {
        urlTilFinnStilling += `?${stillingssøk}`;
    }

    return [
        {
            href: '/kandidatsok',
            tekst: 'Kandidater',
        },
        {
            href: `/kandidater/kandidat/${kandidatsammendrag?.arenaKandidatnr}/cv?fraKandidatsok=true`,
            tekst: formaterNavn(kandidatsammendrag),
        },
        {
            tekst: 'Finn stilling',
            href: urlTilFinnStilling,
        },
        {
            tekst: hentTittelFraStilling(stilling),
        },
    ];
};

export default KontekstAvKandidat;
