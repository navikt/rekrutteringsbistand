import * as React from 'react';
import { KandidatKilde, Kandidatnavn } from '../../../api/kandidat-søk-api/hentKandidatnavn';
import { ApplikasjonContext } from '../../../felles/ApplikasjonContext';
import FormidleKandidat from '../../../kandidat/kandidatliste/modaler/legg-til-kandidat-modal/FormidleKandidat';

export interface ILeggTilFormidling {
    kilde: KandidatKilde;
    fnr: string | null;
    kandidatlisteId: string;
    stillingsId: string;
    onClose: () => void;
    kandidatSøkResultat: Kandidatnavn;
    handleBekreft: () => void;
}

const LeggTilFormidling: React.FC<ILeggTilFormidling> = ({
    fnr,
    stillingsId,
    onClose,
    kandidatlisteId,
    kandidatSøkResultat,
    handleBekreft,
    kilde,
}) => {
    const { valgtNavKontor } = React.useContext(ApplikasjonContext);
    return (
        <div style={{ paddingTop: '1rem' }}>
            <FormidleKandidat
                kilde={kilde}
                handleBekreft={handleBekreft}
                fnr={fnr}
                usynligKandidat={{
                    fornavn: kandidatSøkResultat.fornavn ?? '',
                    etternavn: kandidatSøkResultat.etternavn ?? '',
                }}
                kandidatlisteId={kandidatlisteId}
                stillingsId={stillingsId}
                valgtNavKontor={valgtNavKontor?.navKontor ?? null}
                onClose={onClose}
            />
        </div>
    );
};

export default LeggTilFormidling;
