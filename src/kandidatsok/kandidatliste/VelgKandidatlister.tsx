import { CheckboxGroup, Loader, Pagination } from '@navikt/ds-react';
import { Nettstatus } from 'felles/nettressurs';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import css from './VelgKandidatlister.module.css';
import VelgbarKandidatliste from './VelgbarKandidatliste';
import useMineKandidatlister from './useMineKandidatlister';

type Props = {
    markerteLister: Set<string>;
    lagredeLister: Set<string>;
    onKandidatlisteMarkert: (event: ChangeEvent<HTMLInputElement>) => void;
};

const pageSize = 8;

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
        return <Loader variant="interaction" size="2xlarge" />;
    } else if (
        mineKandidatlister.kind === Nettstatus.Suksess ||
        mineKandidatlister.kind === Nettstatus.Oppdaterer
    ) {
        const pageCount = Math.floor(mineKandidatlister.data.antall / pageSize);
        return (
            <>
                <CheckboxGroup
                    className={css.liste}
                    legend="Velg blant dine kandidatlister"
                    value={avhukedeLister}
                >
                    {mineKandidatlister.data.liste.map((kandidatliste, index) => (
                        <VelgbarKandidatliste
                            key={kandidatliste.kandidatlisteId + index}
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
                    count={pageCount > 0 ? pageCount : 1}
                />
            </>
        );
    } else {
        return null;
    }
};

export default VelgKandidatlister;
