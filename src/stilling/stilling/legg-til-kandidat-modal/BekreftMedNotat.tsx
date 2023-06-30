import { ChangeEvent, FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BodyShort, ErrorMessage, Textarea } from '@navikt/ds-react';

import { ikkeLastet, Nettressurs, Nettstatus, senderInn } from '../../api/Nettressurs';
import { Kandidat, Kandidatliste } from './kandidatlistetyper';
import { KandidatOutboundDto } from './LeggTilKandidatModal';
import { Kandidatrespons } from '../kontekst-av-kandidat/useKandidat';
import { postKandidaterTilKandidatliste } from './kandidatApi';
import { VarslingAction, VarslingActionType } from '../../common/varsling/varslingReducer';
import LeggTilEllerAvbryt from './LeggTilEllerAvbryt';
import css from './LeggTilKandidatModal.module.css';
import { sendEvent } from '../../../felles/amplitude';

const MAKS_NOTATLENGDE = 2000;

const BekreftMedNotat: FunctionComponent<{
    erAnbefaling?: boolean;
    fnr: string;
    kandidat: Kandidat | Kandidatrespons;
    kandidatliste: Kandidatliste;
    setKandidatliste?: (kandidatliste: Nettressurs<Kandidatliste>) => void;

    onClose: () => void;
}> = ({ fnr, erAnbefaling = false, kandidat, kandidatliste, setKandidatliste, onClose }) => {
    const dispatch = useDispatch();
    const [notat, setNotat] = useState<string>('');
    const [leggTilKandidat, setLeggTilKandidat] = useState<Nettressurs<Kandidatliste>>(
        ikkeLastet()
    );

    const onNotatChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNotat(event.target.value);
    };

    const onLeggTilKandidat = async () => {
        setLeggTilKandidat(senderInn());

        sendEvent('legg_til_kandidat', 'klikk', {
            app: 'stilling',
            erAnbefaling,
        });

        const dto: KandidatOutboundDto[] = [
            {
                kandidatnr: kandidat.arenaKandidatnr,
                notat,
            },
        ];

        const respons = await postKandidaterTilKandidatliste(kandidatliste.kandidatlisteId, dto);
        setLeggTilKandidat(respons);

        if (respons.kind === Nettstatus.Suksess) {
            onClose();
            varsleKandidatlisteOmNyKandidat();

            if (setKandidatliste) {
                setKandidatliste(respons);
            }
        }
    };

    const varsleKandidatlisteOmNyKandidat = () => {
        dispatch<VarslingAction>({
            type: VarslingActionType.VisVarsling,
            innhold: erAnbefaling
                ? `Kandidat ${kandidat.fornavn} ${kandidat.etternavn} (${fnr}) er anbefalt til stillingen`
                : `Kandidat ${kandidat.fornavn} ${kandidat.etternavn} (${fnr}) er lagt til`,
        });
    };

    return (
        <>
            <BodyShort spacing>{`${kandidat.fornavn} ${kandidat.etternavn} (${fnr})`}</BodyShort>
            <Textarea
                value={notat}
                placeholder=""
                className={css.notat}
                maxLength={MAKS_NOTATLENGDE}
                onChange={onNotatChange}
                label={
                    erAnbefaling
                        ? 'Hvorfor egner kandidaten seg til stillingen?'
                        : 'Notat om kandidat'
                }
                description={
                    erAnbefaling
                        ? 'Ikke skriv sensitive opplysninger. Anbefalingen er synlig for alle veiledere.'
                        : 'Du skal ikke skrive sensitive opplysninger her. Notatet er synlig for alle veiledere.'
                }
            />
            <LeggTilEllerAvbryt
                onLeggTilClick={onLeggTilKandidat}
                onAvbrytClick={onClose}
                leggTilSpinner={leggTilKandidat.kind === Nettstatus.SenderInn}
                leggTilTekst={erAnbefaling ? 'Anbefal' : 'Legg til'}
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
