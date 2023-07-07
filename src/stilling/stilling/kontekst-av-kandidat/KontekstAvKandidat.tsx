import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { KandidatTilStillingssøk } from 'felles/domene/kandidat/Kandidat';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import AnbefalKandidatModal from './AnbefalKandidatModal';
import Kandidatbanner from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import Kandidatlistehandlinger from './Kandidatlistehandlinger';
import Stilling from '../../domene/Stilling';
import useKandidat from './useKandidat';

type Props = {
    fnr: string;
    kandidatliste: Nettressurs<Kandidatliste>;
    setKandidatliste: (kandidatliste: Nettressurs<Kandidatliste>) => void;
    stilling: Stilling;
};

const KontekstAvKandidat = ({ fnr, kandidatliste, setKandidatliste, stilling }: Props) => {
    const { kandidat } = useKandidat(fnr);
    const { state } = useLocation();
    const [visModal, setVisModal] = useState<boolean>(false);

    const brødsmulesti = byggBrødsmulesti(fnr, stilling, kandidat, state?.stillingsssøk);

    return (
        <>
            <Kandidatbanner kandidat={kandidat} brødsmulesti={brødsmulesti}>
                <Kandidatlistehandlinger
                    fnr={fnr}
                    kandidatliste={kandidatliste}
                    onAnbefalClick={() => {
                        setVisModal(true);
                    }}
                />
            </Kandidatbanner>
            {kandidat && kandidatliste.kind === Nettstatus.Suksess && (
                <AnbefalKandidatModal
                    fnr={fnr}
                    kandidat={kandidat}
                    kandidatliste={kandidatliste.data}
                    setKandidatliste={setKandidatliste}
                    onClose={() => setVisModal(false)}
                    vis={visModal}
                />
            )}
        </>
    );
};

const byggBrødsmulesti = (
    fnr: string,
    stilling: Stilling,
    kandidat?: KandidatTilStillingssøk,
    stillingssøk?: string
) => {
    if (!kandidat) {
        return undefined;
    }

    let urlTilFinnStilling = `/stillingssok/${fnr}`;
    if (stillingssøk) {
        urlTilFinnStilling += `?${stillingssøk}`;
    }

    return [
        {
            href: '/kandidatsok',
            tekst: 'Kandidater',
        },
        {
            href: `/kandidater/kandidat/${kandidat?.arenaKandidatnr}/cv?fraKandidatsok=true`,
            tekst: `${kandidat?.fornavn} ${kandidat?.etternavn}`,
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
