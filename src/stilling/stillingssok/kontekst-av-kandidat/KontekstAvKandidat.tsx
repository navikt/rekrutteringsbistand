import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import { Nettstatus } from 'felles/nettressurs';
import ManglerØnsketSted from './ManglerØnsketSted';
import ManglerØnsketStedOgYrke from './ManglerØnsketStedOgYrke';
import ManglerØnsketYrke from './ManglerØnsketYrke';
import useKandidatStillingssøk from './useKandidatStillingssøk';

type Props = {
    kandidatnr: string;
};

const KontekstAvKandidat = ({ kandidatnr }: Props) => {
    const { kandidat, hentetGeografiFraBosted, manglerØnsketYrke } =
        useKandidatStillingssøk(kandidatnr);

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

    const utledBannerelement = () => {
        if (kandidat.kind === Nettstatus.Suksess) {
            if (manglerØnsketYrke && hentetGeografiFraBosted) {
                return <ManglerØnsketStedOgYrke fnr={kandidat.data.fodselsnummer} />;
            } else if (manglerØnsketYrke) {
                return <ManglerØnsketYrke fnr={kandidat.data.fodselsnummer} />;
            } else if (hentetGeografiFraBosted) {
                return <ManglerØnsketSted fnr={kandidat.data.fodselsnummer} />;
            }
        }
    };

    return (
        <Kandidatbanner
            kandidat={kandidat}
            brødsmulesti={brødsmulesti}
            nederst={utledBannerelement()}
        />
    );
};

export default KontekstAvKandidat;
