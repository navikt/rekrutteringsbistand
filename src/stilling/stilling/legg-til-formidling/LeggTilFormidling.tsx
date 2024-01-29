import * as React from 'react';
import { IuseKandidatNavnSøk } from '../../../felles/hooks/useKandidatNavn';
import useNavKontor from '../../../felles/store/navKontor';
import FormidleUsynligKandidat from '../../../kandidat/kandidatliste/modaler/legg-til-kandidat-modal/FormidleUsynligKandidat';

export interface ILeggTilFormidling {
    fnr: string;
    kandidatlisteId: string;
    stillingsId: string;
    onClose: () => void;
    kandidatSøkResultat: IuseKandidatNavnSøk;
    handleBekreft: () => void;
}

const LeggTilFormidling: React.FC<ILeggTilFormidling> = ({
    fnr,
    stillingsId,
    onClose,
    kandidatlisteId,
    kandidatSøkResultat,
    handleBekreft,
}) => {
    const valgtNavKontor = useNavKontor((state) => state.navKontor);
    return (
        <div style={{ paddingTop: '1rem' }}>
            <FormidleUsynligKandidat
                handleBekreft={handleBekreft}
                fnr={fnr}
                usynligKandidat={{
                    fornavn: kandidatSøkResultat.fornavn,
                    mellomnavn: kandidatSøkResultat.mellomnavn,
                    etternavn: kandidatSøkResultat.etternavn,
                }}
                kandidatlisteId={kandidatlisteId}
                stillingsId={stillingsId}
                valgtNavKontor={valgtNavKontor}
                onClose={onClose}
            />
        </div>
    );
};

export default LeggTilFormidling;
