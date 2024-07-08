import { Checkbox } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import css from './Kandidater.module.css';
import { KandidatsøkKandidat } from '../../api/kandidat-søk-api/kandidatsøk';

type Props = {
    kandidater: KandidatsøkKandidat[];
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatnumre: string[]) => void;
    mineKandidaterIStilling: string[] | undefined;
};

const MarkerAlle: FunctionComponent<Props> = ({
    kandidater,
    markerteKandidater,
    onMarkerKandidat,
    mineKandidaterIStilling,
}) => {
    const kandidaterSomIkkeErPåKandidatlisten = hentKandidaterSomIkkeErPåKandidatlisten(
        kandidater,
        mineKandidaterIStilling
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
    kandidater: KandidatsøkKandidat[],
    mineKandidaterIStilling: string[] | undefined
) => {
    if (mineKandidaterIStilling === undefined) {
        return kandidater;
    }

    return kandidater.filter(
        (kandidat) =>
            !mineKandidaterIStilling.some((kandidatnr) => kandidatnr === kandidat.arenaKandidatnr)
    );
};

export default MarkerAlle;
