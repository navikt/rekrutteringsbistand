import { Alert } from '@navikt/ds-react';
import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import { Nettstatus } from 'felles/nettressurs';
import useKandidatStillingssøk from './useKandidatStillingssøk';

type Props = {
    kandidatnr: string;
};

const KontekstAvKandidat = ({ kandidatnr }: Props) => {
    const { kandidat, hentetGeografiFraBosted } = useKandidatStillingssøk(kandidatnr);

    let brødsmulesti = undefined;
    if (kandidat.kind === Nettstatus.Suksess) {
        brødsmulesti = [
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
            },
        ];
    } else if (kandidat.kind === Nettstatus.Feil || kandidat.kind === Nettstatus.FinnesIkke) {
        brødsmulesti = [];
    }

    return (
        <Kandidatbanner
            kandidat={kandidat}
            brødsmulesti={brødsmulesti}
            nederstTilHøyre={
                hentetGeografiFraBosted ? (
                    <Alert fullWidth variant="info">
                        Aner ikke!
                    </Alert>
                ) : undefined
            }
        />
    );
};

export default KontekstAvKandidat;
