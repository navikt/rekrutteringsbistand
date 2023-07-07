import { Checkbox } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { KontekstAvKandidatlisteEllerStilling } from '../hooks/useKontekstAvKandidatlisteEllerStilling';
import { Nettstatus } from 'felles/nettressurs';
import { KandidatTilKandidatsøk } from 'felles/domene/kandidat-i-søk/KandidatISøk';
import css from './Kandidater.module.css';

type Props = {
    kandidater: KandidatTilKandidatsøk[];
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatnumre: string[]) => void;
    kontekstAvKandidatlisteEllerStilling: KontekstAvKandidatlisteEllerStilling | null;
};

const MarkerAlle: FunctionComponent<Props> = ({
    kandidater,
    markerteKandidater,
    onMarkerKandidat,
    kontekstAvKandidatlisteEllerStilling,
}) => {
    const kandidaterSomIkkeErPåKandidatlisten = hentKandidaterSomIkkeErPåKandidatlisten(
        kandidater,
        kontekstAvKandidatlisteEllerStilling
    ).map((kandidat) => kandidat.arenaKandidatnr);

    const alleKandidaterErMarkert = kandidaterSomIkkeErPåKandidatlisten.every((kandidatnr) =>
        markerteKandidater.has(kandidatnr)
    );

    const onChange = () => {
        if (alleKandidaterErMarkert) {
            const kandidaterSomIkkeErPåSiden = Array.from(markerteKandidater).filter(
                (markertKandidat) => !kandidaterSomIkkeErPåKandidatlisten.includes(markertKandidat)
            );

            onMarkerKandidat(kandidaterSomIkkeErPåSiden);
        } else {
            const kandidaterSomSkalMarkeres = [
                ...Array.from(markerteKandidater),
                ...kandidaterSomIkkeErPåKandidatlisten,
            ];

            onMarkerKandidat(kandidaterSomSkalMarkeres);
        }
    };

    return (
        <Checkbox checked={alleKandidaterErMarkert} onChange={onChange}>
            <span className={css.markerAlleLabel}>Marker alle på siden</span>
        </Checkbox>
    );
};

const hentKandidaterSomIkkeErPåKandidatlisten = (
    kandidater: KandidatTilKandidatsøk[],
    kontekst: KontekstAvKandidatlisteEllerStilling | null
) => {
    if (kontekst === null) {
        return kandidater;
    }

    if (kontekst.kandidatliste.kind === Nettstatus.Suksess) {
        const kandidaterPåListen = kontekst.kandidatliste.data.kandidater;

        return kandidater.filter(
            (kandidat) =>
                !kandidaterPåListen.some(
                    (kandidatPåListen) => kandidatPåListen.kandidatnr === kandidat.arenaKandidatnr
                )
        );
    } else {
        return kandidater;
    }
};

export default MarkerAlle;
