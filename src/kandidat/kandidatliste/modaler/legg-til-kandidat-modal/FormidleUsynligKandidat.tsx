import { Alert, BodyShort, Checkbox, CheckboxGroup, ErrorMessage } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { UsynligKandidat } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import Knapper from 'felles/komponenter/legg-til-kandidat/Knapper';
import { Nettressurs, Nettstatus, ikkeLastet, senderInn } from 'felles/nettressurs';
import { postFormidlingerAvUsynligKandidat } from '../../../api/api';
import { capitalizeFirstLetter } from '../../../utils/formateringUtils';
import KandidatlisteAction from '../../reducer/KandidatlisteAction';
import KandidatlisteActionType from '../../reducer/KandidatlisteActionType';

import { FormidlingAvUsynligKandidatOutboundDto } from '../../../../api/server.dto';
import { useVisVarsling } from 'felles/varsling/Varsling';

type Props = {
    fnr: string | null;
    usynligKandidat: UsynligKandidat;
    kandidatlisteId: string;
    stillingsId: string;
    valgtNavKontor: string | null;
    onClose: () => void;
    handleBekreft: () => void;
};

const FormidleUsynligKandidat: FunctionComponent<Props> = ({
    fnr,
    usynligKandidat,
    kandidatlisteId,
    stillingsId,
    valgtNavKontor,
    onClose,
    handleBekreft,
}) => {
    const dispatch = useDispatch();
    const [formidling, setFormidling] = useState<Nettressurs<Kandidatliste>>(ikkeLastet());
    const [presentert, setPresentert] = useState<boolean>(false);
    const [fåttJobb, setFåttJobb] = useState<boolean>(false);
    const visVarsling = useVisVarsling();

    const formidleUsynligKandidat = async () => {
        setFormidling(senderInn());

        const dto: FormidlingAvUsynligKandidatOutboundDto = {
            // @ts-ignore TODO: written before strict-mode enabled
            fnr,
            presentert,
            fåttJobb,
            // @ts-ignore TODO: written before strict-mode enabled
            navKontor: valgtNavKontor,
            stillingsId,
        };

        const resultat = await postFormidlingerAvUsynligKandidat(kandidatlisteId, dto);

        setFormidling(resultat);

        if (resultat.kind === Nettstatus.Suksess) {
            handleBekreft();
            varsleKandidatlisteOmFormidling(resultat.data, dto);
        }
    };

    const varsleKandidatlisteOmFormidling = (
        kandidatliste: Kandidatliste,
        formidlingAvUsynligKandidat: FormidlingAvUsynligKandidatOutboundDto
    ) => {
        visVarsling({
            innhold: `Kandidaten (${formidlingAvUsynligKandidat.fnr}) er blitt formidlet`,
        });

        dispatch<KandidatlisteAction>({
            type: KandidatlisteActionType.FormidleUsynligKandidatSuccess,
            formidlingAvUsynligKandidat,
            kandidatliste,
        });
    };

    const harValgtEtAlternativ = presentert || fåttJobb;

    return (
        <>
            <BodyShort spacing>
                {hentNavnPåUsynligKandidat([usynligKandidat])} ({fnr})
            </BodyShort>
            <Alert variant="info">
                Navnet er hentet fra folkeregisteret. Selv om personen ikke er synlig i
                Rekrutteringsbistand, kan du allikevel registrere formidlingen her for statistikkens
                del. Personen vil vises øverst i kandidatlisten.
            </Alert>
            <br />
            <CheckboxGroup legend={`Registrer formidling for ${usynligKandidat.fornavn}:`}>
                <Checkbox
                    value={presentert}
                    onChange={(event) => setPresentert(event.target.checked)}
                >
                    Registrer at personen er blitt presentert
                </Checkbox>
                <Checkbox value={fåttJobb} onChange={(event) => setFåttJobb(event.target.checked)}>
                    Registrer at personen har fått jobb
                </Checkbox>
            </CheckboxGroup>
            <Knapper
                onLeggTilClick={formidleUsynligKandidat}
                onAvbrytClick={onClose}
                leggTilSpinner={formidling.kind === Nettstatus.SenderInn}
                leggTilDisabled={formidling.kind === Nettstatus.SenderInn || !harValgtEtAlternativ}
                avbrytDisabled={formidling.kind === Nettstatus.SenderInn}
            />
            {formidling.kind === Nettstatus.Feil && (
                <ErrorMessage>Det skjedde noe galt under formidling av kandidat</ErrorMessage>
            )}
        </>
    );
};

const hentNavnPåUsynligKandidat = (navn: UsynligKandidat[]) =>
    navn
        .map((n) => {
            const fornavn = capitalizeFirstLetter(n.fornavn);
            const etternavn = capitalizeFirstLetter(n.etternavn);
            return `${fornavn} ${etternavn}`;
        })
        .join(', ');

export default FormidleUsynligKandidat;
