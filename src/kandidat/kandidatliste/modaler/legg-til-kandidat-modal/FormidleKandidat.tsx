import { Alert, BodyShort, Checkbox, CheckboxGroup, ErrorMessage } from '@navikt/ds-react';
import { FunctionComponent, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    Kandidatutfall,
    UsynligKandidat,
} from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import Knapper from 'felles/komponenter/legg-til-kandidat/Knapper';
import { Nettressurs, Nettstatus, ikkeLastet, senderInn } from 'felles/nettressurs';
import { postFormidlingerAvUsynligKandidat, putUtfallKandidat } from '../../../api/api';
import { capitalizeFirstLetter } from '../../../utils/formateringUtils';
import KandidatlisteAction from '../../reducer/KandidatlisteAction';
import KandidatlisteActionType from '../../reducer/KandidatlisteActionType';

import { useVisVarsling } from 'felles/varsling/Varsling';
import { leggTilKandidatIKandidatliste } from '../../../../api/kandidat-api/leggTilKandidat';
import { KandidatKilde } from '../../../../api/kandidat-søk-api/hentKandidatnavn';
import { FormidlingAvUsynligKandidatOutboundDto } from '../../../../api/server.dto';
import { ApplikasjonContext } from '../../../../felles/ApplikasjonContext';

type Props = {
    fnr: string | null;
    usynligKandidat: UsynligKandidat;
    kandidatlisteId: string;
    stillingsId: string;
    onClose: () => void;
    handleBekreft: () => void;
    kilde: KandidatKilde;
    kandidatNummer?: string | null;
};

const FormidleKandidat: FunctionComponent<Props> = ({
    fnr,
    usynligKandidat,
    kandidatlisteId,
    stillingsId,
    onClose,
    handleBekreft,
    kilde,
    kandidatNummer,
}) => {
    const dispatch = useDispatch();
    const { valgtNavKontor } = useContext(ApplikasjonContext);
    const [formidling, setFormidling] = useState<Nettressurs<Kandidatliste>>(ikkeLastet());
    const [fåttJobb, setFåttJobb] = useState<boolean>(false);
    const visVarsling = useVisVarsling();

    const formidleUsynligKandidat = async () => {
        setFormidling(senderInn());

        const dto: FormidlingAvUsynligKandidatOutboundDto = {
            // @ts-ignore TODO: written before strict-mode enabled
            fnr,
            fåttJobb,
            // @ts-ignore TODO: written before strict-mode enabled
            navKontor: valgtNavKontor?.navKontor,
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

    const formidleSynligKandidat = async () => {
        if (
            valgtNavKontor &&
            valgtNavKontor.navKontor !== undefined &&
            kandidatNummer &&
            kandidatNummer !== undefined
        ) {
            try {
                await leggTilKandidatIKandidatliste({
                    stillingId: stillingsId,
                    kandidatnr: kandidatNummer,
                });

                if (fåttJobb) {
                    await putUtfallKandidat(
                        Kandidatutfall.FåttJobben,
                        valgtNavKontor.navKontor,
                        kandidatlisteId,
                        kandidatNummer
                    );
                    visVarsling({
                        innhold: `Kandidaten (${fnr}) er blitt presentert og formidlet`,
                    });
                }

                handleBekreft();
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <>
            <BodyShort spacing>
                {hentNavnPåUsynligKandidat([usynligKandidat])} ({fnr})
            </BodyShort>
            {kilde === KandidatKilde.PDL && (
                <Alert variant="info">
                    Navnet er hentet fra folkeregisteret. Selv om personen ikke er synlig i
                    Rekrutteringsbistand, kan du allikevel registrere formidlingen her for
                    statistikkens del. Personen vil vises øverst i kandidatlisten.
                </Alert>
            )}
            <br />
            <CheckboxGroup legend={`Registrer formidling for ${usynligKandidat.fornavn}:`}>
                <Checkbox value={fåttJobb} onChange={(event) => setFåttJobb(event.target.checked)}>
                    Registrer at personen har fått jobb
                </Checkbox>
            </CheckboxGroup>
            <Knapper
                onLeggTilClick={kandidatNummer ? formidleSynligKandidat : formidleUsynligKandidat}
                onAvbrytClick={onClose}
                leggTilSpinner={formidling.kind === Nettstatus.SenderInn}
                leggTilDisabled={formidling.kind === Nettstatus.SenderInn || !fåttJobb}
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

export default FormidleKandidat;
