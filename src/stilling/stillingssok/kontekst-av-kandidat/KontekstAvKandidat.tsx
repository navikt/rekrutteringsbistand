import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import ManglerØnsketSted from './ManglerØnsketSted';
import ManglerØnsketStedOgYrke from './ManglerØnsketStedOgYrke';
import ManglerØnsketYrke from './ManglerØnsketYrke';
import useKandidatStillingssøk from './useKandidatStillingssøk';

type Props = {
    kandidatnr: string;
};

const KontekstAvKandidat = ({ kandidatnr }: Props) => {
    const { kandidatStillingssøk, hentetGeografiFraBosted, manglerØnsketYrke } =
        useKandidatStillingssøk(kandidatnr);

    let brødsmulesti = undefined;
    if (kandidatStillingssøk) {
        brødsmulesti = [
            {
                href: '/kandidatsok',
                tekst: 'Kandidater',
            },
            {
                href: `/kandidater/kandidat/${kandidatStillingssøk.arenaKandidatnr}/cv?fraKandidatsok=true`,
                tekst: formaterNavn(kandidatStillingssøk),
            },

            {
                tekst: 'Finn stilling',
            },
        ];
    } else {
        brødsmulesti = [];
    }

    const utledBannerelement = () => {
        if (kandidatStillingssøk) {
            if (manglerØnsketYrke && hentetGeografiFraBosted) {
                return <ManglerØnsketStedOgYrke fnr={kandidatStillingssøk.fodselsnummer} />;
            } else if (manglerØnsketYrke) {
                return <ManglerØnsketYrke fnr={kandidatStillingssøk.fodselsnummer} />;
            } else if (hentetGeografiFraBosted) {
                return <ManglerØnsketSted fnr={kandidatStillingssøk.fodselsnummer} />;
            }
        }
    };

    return (
        <Kandidatbanner
            kandidatnr={kandidatStillingssøk?.arenaKandidatnr}
            brødsmulesti={brødsmulesti}
            nederst={utledBannerelement()}
        />
    );
};

export default KontekstAvKandidat;
