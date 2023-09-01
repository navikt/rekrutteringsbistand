import { Alert, Heading, TextField } from '@navikt/ds-react';
import fnrValidator from '@navikt/fnrvalidator';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { sendEvent } from 'felles/amplitude';
import { KandidatLookup } from 'felles/domene/kandidat/Kandidat';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import Synlighetsevaluering from 'felles/domene/synlighet/Synlighetsevaluering';
import BekreftMedNotat from 'felles/komponenter/legg-til-kandidat/BekreftMedNotat';
import KandidatenFinnesIkke from 'felles/komponenter/legg-til-kandidat/KandidatenFinnesIkke';
import Knapper from 'felles/komponenter/legg-til-kandidat/Knapper';
import { Miljø, getMiljø } from 'felles/miljø';
import { Nettressurs, Nettstatus, ikkeLastet, lasterInn } from 'felles/nettressurs';
import Sidelaster from '../../../../felles/komponenter/sidelaster/Sidelaster';
import { SearchApiError } from '../../../api/fetchUtils';
import Modal from '../../../komponenter/modal/Modal';
import { VarslingAction, VarslingActionType } from '../../../varsling/varslingReducer';
import KandidatlisteAction from '../../reducer/KandidatlisteAction';
import KandidatlisteActionType from '../../reducer/KandidatlisteActionType';
import InformasjonOmUsynligKandidat from './InformasjonOmUsynligKandidat';
import css from './LeggTilKandidatModal.module.css';
import { fetchKandidatMedFnr, fetchSynlighetsevaluering } from './api';

export type FormidlingAvUsynligKandidatOutboundDto = {
    fnr: string;
    presentert: boolean;
    fåttJobb: boolean;
    navKontor: string;
    stillingsId: string;
};

type Props = {
    vis: boolean;
    stillingsId: string | null;
    kandidatliste: Kandidatliste;
    valgtNavKontor: string | null;
    onClose: () => void;
};

const LeggTilKandidatModal: FunctionComponent<Props> = ({
    vis,
    onClose,
    kandidatliste,
    stillingsId,
    valgtNavKontor,
}) => {
    const dispatch = useDispatch();
    const [fnr, setFnr] = useState<string>('');
    const [feilmelding, setFeilmelding] = useState<string | null>(null);
    const [erAlleredeLagtTil, setAlleredeLagtTil] = useState<boolean>(false);
    const [fnrSøk, setFnrSøk] = useState<Nettressurs<KandidatLookup>>(ikkeLastet());
    const [synlighetsevaluering, setSynlighetsevaluering] = useState<
        Nettressurs<Synlighetsevaluering>
    >(ikkeLastet());

    const nullstill = (nullstillInputfelt?: boolean) => {
        if (nullstillInputfelt) {
            setFnr('');
        }

        setFeilmelding(null);
        setAlleredeLagtTil(false);
        setFnrSøk(ikkeLastet());
        setSynlighetsevaluering(ikkeLastet());
    };

    const onFnrChange = (event: ChangeEvent<HTMLInputElement>) => {
        const fnr = event.target.value;

        setFnr(fnr);

        if (fnr.length < 11) {
            nullstill();
        } else if (fnr.length > 11) {
            setFeilmelding('Fødselsnummeret er for langt');
        } else {
            nullstill();

            const erGyldig = validerFnr(fnr);

            if (erGyldig) {
                const finnesAllerede = erFnrAlleredeIListen(fnr);
                setAlleredeLagtTil(finnesAllerede);

                if (finnesAllerede) {
                    setFeilmelding('Kandidaten er allerede lagt til i listen');
                } else {
                    hentKandidatMedFødselsnummer(fnr);
                }
            } else {
                setFeilmelding('Fødselsnummeret er ikke gyldig');
            }
        }
    };

    const erFnrAlleredeIListen = (fnr: string) =>
        kandidatliste.kandidater.some((kandidat) => kandidat.fodselsnr === fnr);

    const hentKandidatMedFødselsnummer = async (fnr: string) => {
        setFnrSøk(lasterInn());

        try {
            const fnrSøkResponse = await fetchKandidatMedFnr(fnr);
            setFnrSøk(fnrSøkResponse);

            if (fnrSøkResponse.kind === Nettstatus.FinnesIkke) {
                setFeilmelding('Kandidaten er ikke synlig i Rekrutteringsbistand');

                sendEvent('legg_til_kandidat', 'fant_ingen_kandidat', {
                    kontekst: 'kandidatliste',
                });

                setSynlighetsevaluering(lasterInn());
                const synlighetPromise = fetchSynlighetsevaluering(fnr);

                setSynlighetsevaluering(await synlighetPromise);
            }
        } catch (e) {
            setFnrSøk({
                kind: Nettstatus.Feil,
                error: new SearchApiError('Klarte ikke å hente kandidat med fødselsnummer'),
            });
        }
    };

    const handleOppdatertKandidatliste = (oppdatertKandidatliste: Kandidatliste) => {
        if (fnrSøk.kind === Nettstatus.Suksess) {
            dispatch<KandidatlisteAction>({
                type: KandidatlisteActionType.OppdaterKandidatlisteMedKandidat,
                kandidatliste: oppdatertKandidatliste,
                kandidatnr: fnrSøk.data.arenaKandidatnr,
            });
        }
    };

    const handleBekreft = () => {
        nullstillOgLukk();

        if (fnrSøk.kind === Nettstatus.Suksess) {
            dispatch<VarslingAction>({
                type: VarslingActionType.VisVarsling,
                innhold: `Kandidat ${fnrSøk.data.fornavn} ${fnrSøk.data.etternavn} (${fnr}) er lagt til`,
            });
        }
    };

    const nullstillOgLukk = () => {
        nullstill(true);
        onClose();
    };

    return (
        <Modal
            open={vis}
            onClose={onClose}
            aria-label="Legg til kandidat-modal"
            className={css.modal}
        >
            <Heading spacing level="2" size="medium">
                Legg til kandidat
            </Heading>

            <Alert variant="warning" className={css.advarsel}>
                Før du legger en kandidat på kandidatlisten må du undersøke om personen oppfyller
                kravene som er nevnt i stillingen.
            </Alert>

            <TextField
                autoFocus
                value={fnr}
                size="medium"
                onChange={onFnrChange}
                placeholder="11 siffer"
                label="Fødselsnummer på kandidaten"
                error={feilmelding}
                className={css.fødselsnummer}
            />

            {erAlleredeLagtTil && (
                <Alert variant="info" className={css.advarsel}>
                    Finner du ikke kandidaten i kandidatlisten? Husk å sjekk om kandidaten er
                    slettet ved å huke av "Vis kun slettede".
                </Alert>
            )}

            {(fnrSøk.kind === Nettstatus.LasterInn ||
                synlighetsevaluering.kind === Nettstatus.LasterInn) && <Sidelaster size="large" />}

            {fnrSøk.kind === Nettstatus.Suksess && (
                <BekreftMedNotat
                    fnr={fnr}
                    kandidat={fnrSøk.data}
                    kandidatliste={kandidatliste}
                    onAvbryt={nullstillOgLukk}
                    onBekreft={handleBekreft}
                    onOppdatertKandidatliste={handleOppdatertKandidatliste}
                />
            )}

            {fnrSøk.kind === Nettstatus.FinnesIkke &&
                synlighetsevaluering.kind === Nettstatus.Suksess && (
                    <KandidatenFinnesIkke synlighetsevaluering={synlighetsevaluering.data} />
                )}

            {fnrSøk.kind === Nettstatus.FinnesIkke && (
                <InformasjonOmUsynligKandidat
                    fnr={fnr}
                    kandidatliste={kandidatliste}
                    stillingsId={stillingsId}
                    valgtNavKontor={valgtNavKontor}
                    onClose={onClose}
                />
            )}

            {fnrSøk.kind !== Nettstatus.Suksess && fnrSøk.kind !== Nettstatus.FinnesIkke && (
                <Knapper leggTilDisabled onAvbrytClick={onClose} />
            )}
        </Modal>
    );
};

const validerFnr = (fnr: string): boolean =>
    fnrValidator.idnr(fnr).status === 'valid' || kanVæreSyntetiskFødselsnummer(fnr);

const kanVæreSyntetiskFødselsnummer = (fnr: string): boolean => {
    const elleveSifre = new RegExp('^\\d{11}$');
    return elleveSifre.test(fnr) && getMiljø() === Miljø.DevGcp;
};

export default LeggTilKandidatModal;
