import { MagnifyingGlassIcon, PersonPlusIcon, RobotIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Rolle } from '../../felles/tilgangskontroll/Roller';
import { TilgangskontrollForInnhold } from '../../felles/tilgangskontroll/TilgangskontrollForInnhold';
import { lenkeTilFinnKandidater } from '../../kandidat/app/paths';
import LeggTilKandidatModal from './legg-til-kandidat/LeggTilKandidatModal';
import AnalyserStillingModal from './analyse/AnalyserStillingModal';
import { getMiljø, Miljø } from 'felles/miljø';

export interface IStillingKandidatKnapper {
    kandidatlisteId: string;
    stillingId: string | null;
    erEier?: boolean;
    erFormidling?: boolean;
    source?: string;
}

const StillingKandidatKnapper: React.FC<IStillingKandidatKnapper> = ({
    kandidatlisteId,
    stillingId,
    erEier,
    erFormidling,
    source,
}) => {
    const [visLeggTilKandidatModal, setVisLeggTilKandidatModal] = React.useState<boolean>(false);
    const [visAnalyserStillingModal, setVisAnalyserStillingModal] = React.useState<boolean>(false);
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
                {source === 'DIR' && (
                    <TilgangskontrollForInnhold
                        skjulVarsel
                        kreverEnAvRollene={[Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]}
                    >
                        <Button
                            onClick={() => setVisAnalyserStillingModal(true)}
                            icon={<RobotIcon aria-hidden />}
                        >
                            Analyser stilling
                        </Button>
                    </TilgangskontrollForInnhold>
                )}
                <TilgangskontrollForInnhold
                    skjulVarsel
                    kreverEnAvRollene={[
                        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                    ]}
                >
                    {!erFormidling && (
                        <Link
                            to={
                                //@ts-ignore: TODO: written before strict-mode enabled
                                lenkeTilFinnKandidater(stillingId)
                            }
                        >
                            <Button as="div" icon={<MagnifyingGlassIcon aria-hidden />}>
                                Finn kandidater
                            </Button>
                        </Link>
                    )}
                </TilgangskontrollForInnhold>
                <TilgangskontrollForInnhold
                    skjulVarsel
                    kreverEnAvRollene={[
                        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                    ]}
                >
                    <Button
                        onClick={() => setVisLeggTilKandidatModal(true)}
                        icon={<PersonPlusIcon aria-hidden />}
                    >
                        Legg til kandidat
                    </Button>
                </TilgangskontrollForInnhold>

                <LeggTilKandidatModal
                    erEier={erEier}
                    vis={visLeggTilKandidatModal}
                    onClose={() => setVisLeggTilKandidatModal(false)}
                    //@ts-ignore TODO: written before strict-mode enabled
                    stillingsId={stillingId}
                />
                <AnalyserStillingModal
                    vis={visAnalyserStillingModal}
                    onClose={() => setVisAnalyserStillingModal(false)}
                    //@ts-ignore
                    stillingsId={stillingId}
                />
            </div>
        </div>
    );
};

export default StillingKandidatKnapper;
