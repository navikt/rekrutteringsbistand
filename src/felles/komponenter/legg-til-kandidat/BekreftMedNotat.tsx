import { ChangeEvent, useState } from 'react';
import { BodyShort, ErrorMessage, Textarea } from '@navikt/ds-react';

import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { sendEvent } from 'felles/amplitude';
import { api, post } from 'felles/api';
import Knapper from './Knapper';
import { ForenkletKandidatISøk } from 'felles/domene/kandidat-i-søk/KandidatISøk';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import PostKandidatTilKandidatliste from 'felles/domene/kandidatliste/PostKandidatTilKandidatliste';
import css from './LeggTilKandidat.module.css';

const MAKS_NOTATLENGDE = 2000;

type Props = {
    fnr: string;
    kandidat: ForenkletKandidatISøk;
    kandidatliste: Kandidatliste;
    onOppdatertKandidatliste?: (kandidatliste: Nettressurs<Kandidatliste>) => void;
    onAvbryt: () => void;
    onBekreft: () => void;
    erAnbefaling?: boolean;
};

const BekreftMedNotat = ({
    fnr,
    kandidat,
    kandidatliste,
    onOppdatertKandidatliste,
    onAvbryt,
    onBekreft,
    erAnbefaling = false,
}: Props) => {
    const [notat, setNotat] = useState<string>('');

    const [leggTilKandidat, setLeggTilKandidat] = useState<Nettressurs<Kandidatliste>>({
        kind: Nettstatus.IkkeLastet,
    });

    const onNotatChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNotat(event.target.value);
    };

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
                notat,
            },
        ];

        const respons = await post<Kandidatliste>(
            `${api.kandidat}/veileder/kandidatlister/${kandidatliste.kandidatlisteId}/kandidater`,
            data
        );

        setLeggTilKandidat(respons);

        if (respons.kind === Nettstatus.Suksess) {
            onBekreft();

            if (onOppdatertKandidatliste) {
                onOppdatertKandidatliste(respons);
            }
        }
    };

    let label: string, description: string, leggTilTekst: string;
    if (erAnbefaling) {
        label = 'Hvorfor egner kandidaten seg til stillingen?';
        description =
            'Ikke skriv sensitive opplysninger. Anbefalingen er synlig for alle veiledere.';
        leggTilTekst = 'Anbefal';
    } else {
        label = 'Notat om kandidat';
        description =
            'Du skal ikke skrive sensitive opplysninger her. Notatet er synlig for alle veiledere.';
        leggTilTekst = 'Legg til';
    }

    return (
        <>
            <BodyShort spacing>{`${kandidat.fornavn} ${kandidat.etternavn} (${fnr})`}</BodyShort>
            <Textarea
                value={notat}
                placeholder=""
                className={css.notat}
                maxLength={MAKS_NOTATLENGDE}
                onChange={onNotatChange}
                label={label}
                description={description}
            />
            <Knapper
                onLeggTilClick={onLeggTilKandidat}
                onAvbrytClick={onAvbryt}
                leggTilSpinner={leggTilKandidat.kind === Nettstatus.SenderInn}
                leggTilTekst={leggTilTekst}
                leggTilDisabled={
                    leggTilKandidat.kind === Nettstatus.SenderInn ||
                    (!!notat && notat.length > MAKS_NOTATLENGDE)
                }
                avbrytDisabled={leggTilKandidat.kind === Nettstatus.SenderInn}
            />
            {leggTilKandidat.kind === Nettstatus.Feil && (
                <ErrorMessage>Klarte ikke å legge til kandidat</ErrorMessage>
            )}
        </>
    );
};

export default BekreftMedNotat;
