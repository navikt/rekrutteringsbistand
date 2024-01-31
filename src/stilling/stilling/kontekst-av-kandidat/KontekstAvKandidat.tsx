import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CopyButton } from '@navikt/ds-react';
import { KandidatTilBanner } from 'felles/domene/kandidat/Kandidat';
import Stilling, { hentTittelFraStilling } from 'felles/domene/stilling/Stilling';
import useInnloggetBruker from 'felles/hooks/useInnloggetBruker';
import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import useKandidatsammendrag from 'felles/komponenter/kandidatbanner/useKandidatsammendrag';
import { useSelector } from 'react-redux';
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
    const { kandidatsammendrag, error, isLoading } = useKandidatsammendrag(kandidatnr);
    /*
    if (isLoading) {
        return <>testloader</>;
    }

    if (error) {
        return <>Klarte ikke å hente kandidaten</>;
    }*/
    const { state } = useLocation();
    const [visModal, setVisModal] = useState<boolean>(false);

    const stillingsinfo = useSelector((state: State) => state.stillingsinfoData);

    const brødsmulesti = byggBrødsmulesti(
        kandidatnr,
        stilling,
        kandidatsammendrag,
        error,
        isLoading,
        state?.stillingssøk
    );

    const { navIdent } = useInnloggetBruker(null);

    const erEier =
        stilling?.administration?.navIdent === navIdent || stillingsinfo?.eierNavident === navIdent;

    return (
        <div className={css.wrapperTilBanner}>
            <div className={css.innerWrapperTilBanner}>
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
                {kandidatsammendrag && kandidatlisteId && (
                    <AnbefalKandidatModal
                        kandidat={kandidatsammendrag}
                        kandidatlisteId={kandidatlisteId}
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
    kandidatsammendrag: KandidatTilBanner,
    error: boolean,
    isLoading: boolean,
    stillingssøk?: string
) => {
    if (error || isLoading) {
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
            href: `/kandidater/kandidat/${kandidatsammendrag.arenaKandidatnr}/cv?fraKandidatsok=true`,
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
