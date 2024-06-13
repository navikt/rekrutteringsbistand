import * as React from 'react';
import { KandidatKilde, Kandidatnavn } from '../../../api/kandidat-søk-api/hentKandidatnavn';
import FormidleKandidat from '../../../kandidat/kandidatliste/modaler/legg-til-kandidat-modal/FormidleKandidat';

export interface ILeggTilFormidling {
    kilde: KandidatKilde;
    fnr: string | null;
    kandidatlisteId: string;
    stillingsId: string;
    onClose: () => void;
    kandidatSøkResultat: Kandidatnavn;
    handleBekreft: () => void;
    kandidatNummer?: string | null;
}

const LeggTilFormidling: React.FC<ILeggTilFormidling> = ({
    fnr,
    stillingsId,
    onClose,
    kandidatlisteId,
    kandidatSøkResultat,
    handleBekreft,
    kandidatNummer,
    kilde,
}) => {
    return (
        <div style={{ paddingTop: '1rem' }}>
            <FormidleKandidat
                kandidatNummer={kandidatNummer}
                kilde={kilde}
                handleBekreft={handleBekreft}
                fnr={fnr}
                usynligKandidat={{
                    fornavn: kandidatSøkResultat.fornavn ?? '',
                    etternavn: kandidatSøkResultat.etternavn ?? '',
                }}
                kandidatlisteId={kandidatlisteId}
                stillingsId={stillingsId}
                onClose={onClose}
            />
        </div>
    );
};

export default LeggTilFormidling;
