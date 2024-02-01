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
        <div
            style={{
                width: '100%',
                boxShadow: 'inset 0 -1px 0 0 var(--ac-tabs-border, var(--a-border-divider))',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '0.75rem',
                    justifyContent: 'flex-end',
                }}
            >
                {erEier && (
                    <Link to={lenkeTilFinnKandidater(stillingId)}>
                        <Button as="div" icon={<MagnifyingGlassIcon aria-hidden />}>
                            Finn kandidater
                        </Button>
                    </Link>
                )}

                <Button
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
        </div>
    );
};

export default StillingKandidatKnapper;
