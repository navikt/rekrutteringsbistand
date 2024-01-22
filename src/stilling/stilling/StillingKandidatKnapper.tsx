import { MagnifyingGlassIcon, PersonPlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { lenkeTilFinnKandidater } from '../../kandidat/app/paths';
import LeggTilKandidatModal from './legg-til-kandidat/LeggTilKandidatModal';

export interface IStillingKandidatKnapper {
    kandidatlisteId: string;
    stillingId: string | null;
    erEier?: boolean;
}

const StillingKandidatKnapper: React.FC<IStillingKandidatKnapper> = ({
    kandidatlisteId,
    stillingId,
    erEier,
}) => {
    const [visLeggTilKandidatModal, setVisLeggTilKandidatModal] = React.useState<boolean>(false);
    if (!kandidatlisteId) {
        return null;
    }

    return (
        <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <Link to={lenkeTilFinnKandidater(stillingId, kandidatlisteId, true)}>
                <Button variant="tertiary" as="div" icon={<MagnifyingGlassIcon aria-hidden />}>
                    Finn kandidater
                </Button>
            </Link>

            <Button
                variant="tertiary"
                onClick={() => setVisLeggTilKandidatModal(true)}
                icon={<PersonPlusIcon aria-hidden />}
            >
                Legg til kandidat
            </Button>

            <LeggTilKandidatModal
                erEier={erEier}
                vis={visLeggTilKandidatModal}
                onClose={() => setVisLeggTilKandidatModal(false)}
                stillingsId={stillingId}
            />
        </div>
    );
};

export default StillingKandidatKnapper;
