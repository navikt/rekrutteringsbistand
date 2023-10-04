import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CopyButton } from '@navikt/ds-react';
import { KandidatTilBanner } from 'felles/domene/kandidat/Kandidat';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import Stilling from 'felles/domene/stilling/Stilling';
import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import useKandidat from 'felles/komponenter/kandidatbanner/useKandidat';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { hentAnnonselenke, stillingErPublisert } from '../adUtils';
import AnbefalKandidatModal from './AnbefalKandidatModal';
import Kandidatlistehandlinger from './Kandidatlistehandlinger';
import css from './KontekstAvKandidat.module.css';

type Props = {
    kandidatnr: string;
    kandidatliste: Nettressurs<Kandidatliste>;
    setKandidatliste: (kandidatliste: Nettressurs<Kandidatliste>) => void;
    stilling: Stilling;
};

const KontekstAvKandidat = ({ kandidatnr, kandidatliste, setKandidatliste, stilling }: Props) => {
    const kandidat = useKandidat(kandidatnr);

    const { state } = useLocation();
    const [visModal, setVisModal] = useState<boolean>(false);

    const brødsmulesti = byggBrødsmulesti(kandidatnr, stilling, kandidat, state?.stillingssøk);

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
                                kandidatnr={kandidatnr}
                                kandidatliste={kandidatliste}
                                onAnbefalClick={() => {
                                    setVisModal(true);
                                }}
                            />
                        </div>
                    }
                />
                {kandidat.kind === Nettstatus.Suksess &&
                    kandidatliste.kind === Nettstatus.Suksess && (
                        <AnbefalKandidatModal
                            kandidat={kandidat.data}
                            kandidatliste={kandidatliste.data}
                            setKandidatliste={setKandidatliste}
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
            tekst: stilling.title,
        },
    ];
};

export default KontekstAvKandidat;
