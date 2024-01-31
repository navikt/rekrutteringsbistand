import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import ManglerØnsketSted from './ManglerØnsketSted';
import ManglerØnsketStedOgYrke from './ManglerØnsketStedOgYrke';
import ManglerØnsketYrke from './ManglerØnsketYrke';
import useKandidatStillingssøk from './useKandidatStillingssøk';

type Props = {
    kandidatnr: string;
};

const KontekstAvKandidat = ({ kandidatnr }: Props) => {
    const { kandidatstillingssøk, hentetGeografiFraBosted, manglerØnsketYrke } =
        useKandidatStillingssøk(kandidatnr);

    let brødsmulesti = undefined;
    if (kandidatstillingssøk) {
        brødsmulesti = [
            {
                href: '/kandidatsok',
                tekst: 'Kandidater',
            },
            {
                href: `/kandidater/kandidat/${kandidatstillingssøk.arenaKandidatnr}/cv?fraKandidatsok=true`,
                tekst: formaterNavn(kandidatstillingssøk),
            },

            {
                tekst: 'Finn stilling',
            },
        ];
    } else {
        brødsmulesti = [];
    }

    const utledBannerelement = () => {
        if (kandidatstillingssøk) {
            if (manglerØnsketYrke && hentetGeografiFraBosted) {
                return <ManglerØnsketStedOgYrke fnr={kandidatstillingssøk.fodselsnummer} />;
            } else if (manglerØnsketYrke) {
                return <ManglerØnsketYrke fnr={kandidatstillingssøk.fodselsnummer} />;
            } else if (hentetGeografiFraBosted) {
                return <ManglerØnsketSted fnr={kandidatstillingssøk.fodselsnummer} />;
            }
        }
    };

    return (
        <Kandidatbanner
            kandidatnr={kandidatstillingssøk?.arenaKandidatnr}
            brødsmulesti={brødsmulesti}
            nederst={utledBannerelement()}
        />
    );
};

export default KontekstAvKandidat;
