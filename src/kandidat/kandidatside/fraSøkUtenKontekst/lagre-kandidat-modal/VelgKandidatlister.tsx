import { CheckboxGroup, Pagination } from '@navikt/ds-react';
import { Nettstatus } from 'felles/nettressurs';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import Sidelaster from '../../../../felles/komponenter/sidelaster/Sidelaster';
import css from './VelgKandidatlister.module.css';
import VelgbarKandidatliste from './VelgbarKandidatliste';
import useMineKandidatlister, {
    lagreIMineKandidatlisterSidestørrelse,
} from './useMineKandidatlister';

type Props = {
    markerteLister: Set<string>;
    lagredeLister: Set<string>;
    onKandidatlisteMarkert: (event: ChangeEvent<HTMLInputElement>) => void;
};

const VelgKandidatlister: FunctionComponent<Props> = ({
    markerteLister,
    lagredeLister,
    onKandidatlisteMarkert,
}) => {
    const [side, setSide] = useState<number>(1);
    const mineKandidatlister = useMineKandidatlister(side);

    const hentFlereKandidatlister = (side: number) => {
        setSide(side);
    };

    const avhukedeLister = [...Array.from(markerteLister), ...Array.from(lagredeLister)];

    if (mineKandidatlister.kind === Nettstatus.LasterInn) {
        return <Sidelaster />;
    } else if (mineKandidatlister.kind === Nettstatus.Suksess) {
        return (
            <>
                <CheckboxGroup
                    className={css.liste}
                    legend="Velg blant dine kandidatlister"
                    value={avhukedeLister}
                >
                    {mineKandidatlister.data.liste.map((kandidatliste, i) => (
                        <VelgbarKandidatliste
                            key={kandidatliste.kandidatlisteId + i}
                            kandidatliste={kandidatliste}
                            lagredeLister={lagredeLister}
                            onKandidatlisteMarkert={onKandidatlisteMarkert}
                        />
                    ))}
                </CheckboxGroup>
                <Pagination
                    size="small"
                    page={side}
                    className={css.paginering}
                    onPageChange={hentFlereKandidatlister}
                    count={Math.floor(
                        mineKandidatlister.data.antall / lagreIMineKandidatlisterSidestørrelse
                    )}
                />
            </>
        );
    } else {
        return null;
    }
};

export default VelgKandidatlister;
