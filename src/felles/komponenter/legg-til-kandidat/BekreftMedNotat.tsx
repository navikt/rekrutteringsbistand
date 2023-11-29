import { Alert, BodyLong, BodyShort, Label, Modal } from '@navikt/ds-react';
import { useState } from 'react';

import { sendEvent } from 'felles/amplitude';
import { api, post } from 'felles/api';
import { KandidatLookup } from 'felles/domene/kandidat/Kandidat';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import PostKandidatTilKandidatliste from 'felles/domene/kandidatliste/PostKandidatTilKandidatliste';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import Knapper from './Knapper';

type Props = {
    fnr: string;
    kandidat: KandidatLookup;
    onOppdatertKandidatliste?: (kandidatliste: Kandidatliste) => void;
    onAvbryt: () => void;
    onBekreft: () => void;
    erAnbefaling?: boolean;
    kandidatlisteId: string;
};

const BekreftMedNotat = ({
    fnr,
    kandidat,
    onOppdatertKandidatliste,
    onAvbryt,
    onBekreft,
    erAnbefaling = false,
    kandidatlisteId,
}: Props) => {
    const [leggTilKandidat, setLeggTilKandidat] = useState<Nettressurs<Kandidatliste>>({
        kind: Nettstatus.IkkeLastet,
    });

    const onLeggTilKandidat = async () => {
        setLeggTilKandidat({
            kind: Nettstatus.SenderInn,
        });

        sendEvent('legg_til_kandidat', 'klikk', {
            app: 'stilling',
            erAnbefaling,
        });

        const data: PostKandidatTilKandidatliste[] = [
            {
                kandidatnr: kandidat.arenaKandidatnr,
                notat: '',
            },
        ];

        const respons = await post<Kandidatliste>(
            `${api.kandidat}/veileder/kandidatlister/${kandidatlisteId}/kandidater`,
            data
        );

        setLeggTilKandidat(respons);

        if (respons.kind === Nettstatus.Suksess) {
            onBekreft();

            if (onOppdatertKandidatliste) {
                onOppdatertKandidatliste(respons.data);
            }
        }
    };

    let leggTilTekst: string;
    if (erAnbefaling) {
        leggTilTekst = 'Anbefal';
    } else {
        leggTilTekst = 'Legg til';
    }

    return (
        <>
            <Modal.Body>
                <BodyShort
                    spacing
                >{`${kandidat.fornavn} ${kandidat.etternavn} (${fnr})`}</BodyShort>
                <Alert variant="info">
                    <Label as="p" spacing>
                        Vi tar bort fritekstfeltet for å hindre personvernsavvik.
                    </Label>
                    <BodyLong>
                        Frykt ikke. Vi jobber på spreng med å finne nye måter for å hjelpe deg med å
                        få oversikt over, og avklare kandidatene.
                    </BodyLong>
                </Alert>
            </Modal.Body>
            <Knapper
                onLeggTilClick={onLeggTilKandidat}
                onAvbrytClick={onAvbryt}
                leggTilSpinner={leggTilKandidat.kind === Nettstatus.SenderInn}
                leggTilTekst={leggTilTekst}
                leggTilDisabled={leggTilKandidat.kind === Nettstatus.SenderInn}
                avbrytDisabled={leggTilKandidat.kind === Nettstatus.SenderInn}
            />
            {leggTilKandidat.kind === Nettstatus.Feil && (
                <Alert fullWidth variant="error" size="small">
                    Klarte ikke å legge til kandidat
                </Alert>
            )}
        </>
    );
};

export default BekreftMedNotat;
