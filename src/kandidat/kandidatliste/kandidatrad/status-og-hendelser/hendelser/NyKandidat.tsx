import { FunctionComponent } from 'react';
import { formaterDatoNaturlig } from '../../../../utils/dateUtils';
import { Kandidat } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Hendelse, { Hendelsesstatus } from './Hendelse';

type Props = {
    kandidat: Kandidat;
};

const NyKandidat: FunctionComponent<Props> = ({ kandidat }) => {
    const beskrivelse = `Lagt til i listen av ${kandidat.lagtTilAv.navn} (${
        kandidat.lagtTilAv.ident
    }) ${formaterDatoNaturlig(kandidat.lagtTilTidspunkt)}`;

    return (
        <Hendelse status={Hendelsesstatus.Grønn} tittel="Ny kandidat" beskrivelse={beskrivelse} />
    );
};

export default NyKandidat;
