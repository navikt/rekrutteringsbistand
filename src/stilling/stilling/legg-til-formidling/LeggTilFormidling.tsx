import * as React from 'react';
import useNavKontor from '../../../felles/store/navKontor';
import InformasjonOmUsynligKandidat from '../../../kandidat/kandidatliste/modaler/legg-til-kandidat-modal/InformasjonOmUsynligKandidat';

export interface ILeggTilFormidling {
    fnr: string;
    kandidatlisteId: string;
    stillingsId: string;
    onClose: () => void;
}

const LeggTilFormidling: React.FC<ILeggTilFormidling> = ({
    fnr,
    stillingsId,
    onClose,
    kandidatlisteId,
}) => {
    const valgtNavKontor = useNavKontor((state) => state.navKontor);
    return (
        <div style={{ paddingTop: '1rem' }}>
            <InformasjonOmUsynligKandidat
                fnr={fnr}
                // kandidatliste={kandidatliste}
                kandidatlisteId={kandidatlisteId}
                stillingsId={stillingsId}
                valgtNavKontor={valgtNavKontor}
                onClose={onClose}
            />
        </div>
    );
};

export default LeggTilFormidling;
