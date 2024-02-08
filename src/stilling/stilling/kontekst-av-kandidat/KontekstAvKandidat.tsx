import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CopyButton } from '@navikt/ds-react';
import { KandidatTilBanner } from 'felles/domene/kandidat/Kandidat';
import Stilling, { hentTittelFraStilling } from 'felles/domene/stilling/Stilling';
import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import useKandidat from 'felles/komponenter/kandidatbanner/useKandidat';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { useSelector } from 'react-redux';
import { useMeg } from '../../../api/frackend/meg';
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
    const kandidat = useKandidat(kandidatnr);
    const { state } = useLocation();
    const [visModal, setVisModal] = useState<boolean>(false);

    const stillingsinfo = useSelector((state: State) => state.stillingsinfoData);

    const brødsmulesti = byggBrødsmulesti(kandidatnr, stilling, kandidat, state?.stillingssøk);

    const { navIdent } = useMeg();

    const erEier =
        stilling?.administration?.navIdent === navIdent || stillingsinfo?.eierNavident === navIdent;

    return (
        <div className={css.wrapperTilBanner}>
            <div className={css.innerWrapperTilBanner}>
                <Kandidatbanner
                    kandidat={kandidat}
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
                {kandidat.kind === Nettstatus.Suksess && kandidatlisteId && (
                    <AnbefalKandidatModal
                        kandidat={kandidat.data}
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
    kandidat: Nettressurs<KandidatTilBanner>,
    stillingssøk?: string
) => {
    if (kandidat.kind !== Nettstatus.Suksess) {
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
            href: `/kandidater/kandidat/${kandidat.data.arenaKandidatnr}/cv?fraKandidatsok=true`,
            tekst: formaterNavn(kandidat.data),
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
