import { BodyLong, ErrorMessage, Heading } from '@navikt/ds-react';
import { FunctionComponent, useEffect, useState } from 'react';

import { UsynligKandidat } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettressurs, Nettstatus, ikkeLastet } from 'felles/nettressurs';
import Sidelaster from '../../../../felles/komponenter/sidelaster/Sidelaster';
import { fetchUsynligKandidat } from '../../../api/api';
import FormidleUsynligKandidat from './FormidleUsynligKandidat';
import css from './InformasjonOmUsynligKandidat.module.css';

type Props = {
    fnr: string;
    kandidatliste: Kandidatliste;
    stillingsId: string | null;
    valgtNavKontor: string | null;
    onClose: () => void;
};

const InformasjonOmUsynligKandidat: FunctionComponent<Props> = ({
    fnr,
    kandidatliste,
    stillingsId,
    valgtNavKontor,
    onClose,
}) => {
    const [pdlSøk, setPdlSøk] = useState<Nettressurs<UsynligKandidat[]>>(ikkeLastet());

    useEffect(() => {
        const hentUsynligKandidat = async () => {
            setPdlSøk(await fetchUsynligKandidat(fnr));
        };

        if (stillingsId && valgtNavKontor && kandidatliste.kanEditere) {
            hentUsynligKandidat();
        }
    }, [fnr, stillingsId, valgtNavKontor, kandidatliste.kanEditere]);

    if (stillingsId === null || valgtNavKontor === null) {
        return null;
    }

    if (!kandidatliste.kanEditere) {
        return (
            <>
                <Heading className={css.fraFolkeregisteret} spacing level="3" size="small">
                    Fra folkeregisteret
                </Heading>
                <BodyLong>
                    Du er ikke eier av stillingen og kan derfor ikke registrere formidling.
                </BodyLong>
            </>
        );
    }

    return (
        <>
            <Heading className={css.fraFolkeregisteret} spacing level="3" size="small">
                Fra folkeregisteret
            </Heading>
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
                    kandidatliste={kandidatliste}
                    stillingsId={stillingsId}
                    valgtNavKontor={valgtNavKontor}
                    onClose={onClose}
                />
            )}
        </>
    );
};

export default InformasjonOmUsynligKandidat;
