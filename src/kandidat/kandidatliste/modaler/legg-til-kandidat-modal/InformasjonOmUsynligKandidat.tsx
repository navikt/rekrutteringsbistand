import { ErrorMessage } from '@navikt/ds-react';
import { FunctionComponent, useEffect, useState } from 'react';

import { UsynligKandidat } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { Nettressurs, Nettstatus, ikkeLastet } from 'felles/nettressurs';
import Sidelaster from '../../../../felles/komponenter/sidelaster/Sidelaster';
import { fetchUsynligKandidat } from '../../../api/api';
import FormidleUsynligKandidat from './FormidleUsynligKandidat';

type Props = {
    fnr: string;
    kandidatlisteId: string;
    stillingsId: string | null;
    valgtNavKontor: string | null;
    onClose: () => void;
};

const InformasjonOmUsynligKandidat: FunctionComponent<Props> = ({
    fnr,
    kandidatlisteId,
    stillingsId,
    valgtNavKontor,
    onClose,
}) => {
    const [pdlSøk, setPdlSøk] = useState<Nettressurs<UsynligKandidat[]>>(ikkeLastet());

    useEffect(() => {
        const hentUsynligKandidat = async () => {
            setPdlSøk(await fetchUsynligKandidat(fnr));
        };

        if (stillingsId && valgtNavKontor && kandidatlisteId) {
            hentUsynligKandidat();
        }
    }, [fnr, stillingsId, valgtNavKontor, kandidatlisteId]);

    if (stillingsId === null || valgtNavKontor === null) {
        return null;
    }

    return (
        <>
            {pdlSøk.kind === Nettstatus.LasterInn && <Sidelaster size="large" />}

            {pdlSøk.kind === Nettstatus.FinnesIkke && (
                <ErrorMessage>Fant ikke personen i folkeregisteret.</ErrorMessage>
            )}

            {pdlSøk.kind === Nettstatus.Feil && (
                <ErrorMessage>Klarte ikke å hente person fra folkeregisteret.</ErrorMessage>
            )}

            {pdlSøk.kind === Nettstatus.Suksess && (
                <FormidleUsynligKandidat
                    fnr={fnr}
                    usynligKandidat={pdlSøk.data}
                    kandidatlisteId={kandidatlisteId}
                    stillingsId={stillingsId}
                    valgtNavKontor={valgtNavKontor}
                    onClose={onClose}
                />
            )}
        </>
    );
};

export default InformasjonOmUsynligKandidat;
