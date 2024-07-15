import { ErrorMessage, Loader, Tabs } from '@navikt/ds-react';
import { ReactNode, useContext } from 'react';
import { Portefølje } from '../../../api/kandidat-søk-api/kandidatsøk';
import { useDecorator } from '../../../api/modiacontextholder/decorator';
import { ApplikasjonContext } from '../../../felles/ApplikasjonContext';
import { Rolle } from '../../../felles/tilgangskontroll/Roller';
import { TilgangskontrollForInnhold } from '../../../felles/tilgangskontroll/TilgangskontrollForInnhold';
import { FilterParam } from '../../hooks/useQuery';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import css from './PorteføljeTabs.module.css';
import VelgKontorTab from './VelgKontorTab';
import { useMeg } from '../../../api/frackend/meg';
import useHentStilling from 'felles/hooks/useStilling';

const PorteføljeTabs = ({
    children,
    stillingId,
}: {
    children: ReactNode;
    stillingId: string | null;
}) => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();
    const { tilgangskontrollErPå } = useContext(ApplikasjonContext);
    const { data, isLoading: isDecoratorLoading } = useDecorator();
    const { navIdent } = useMeg();
    const {
        stilling: rekrutteringsbistandstilling,
        isLoading: isStillingLoading,
        isError: isStillingError,
    } = useHentStilling(stillingId);

    const erEier =
        rekrutteringsbistandstilling?.stilling?.administration?.navIdent === navIdent ||
        rekrutteringsbistandstilling?.stillingsinfo?.eierNavident === navIdent;

    const knyttetTilStillingOgIkkeEier = !!stillingId && !erEier;

    const velgPortefølje = (portefølje: string) => {
        setSearchParam(FilterParam.Portefølje, portefølje);
    };

    if (isDecoratorLoading || isStillingLoading) {
        return <Loader />;
    }

    if (isStillingError) {
        return <ErrorMessage>{'Feil ved lasting av stilling'}</ErrorMessage>;
    }

    const MineBrukere = () => <Tabs.Tab value={Portefølje.MINE_BRUKERE} label="Mine brukere" />;

    const MittKontor = () => {
        if (data?.enheter && data.enheter.length > 0) {
            return (
                <TilgangskontrollForInnhold
                    skjulVarsel
                    kreverEnAvRollene={[
                        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                    ]}
                >
                    <Tabs.Tab value={Portefølje.MITT_KONTOR} label="Mitt kontor" />
                </TilgangskontrollForInnhold>
            );
        }
        return null;
    };

    const MineKontorer = () => {
        if (data?.enheter && data.enheter.length > 1) {
            return (
                <TilgangskontrollForInnhold
                    skjulVarsel
                    kreverEnAvRollene={[
                        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                    ]}
                >
                    {tilgangskontrollErPå && (
                        <Tabs.Tab value={Portefølje.MINE_KONTORER} label="Mine kontorer" />
                    )}
                </TilgangskontrollForInnhold>
            );
        }
        return null;
    };

    const AlleKontorer = () => (
        <TilgangskontrollForInnhold
            skjulVarsel
            kreverEnAvRollene={[Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]}
            manglerEierskap={knyttetTilStillingOgIkkeEier}
        >
            <Tabs.Tab value={Portefølje.ALLE} label="Alle kontorer" />
        </TilgangskontrollForInnhold>
    );

    const VelgKontor = () => (
        <TilgangskontrollForInnhold
            skjulVarsel
            kreverEnAvRollene={[Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]}
            manglerEierskap={knyttetTilStillingOgIkkeEier}
        >
            <VelgKontorTab søkekriterier={søkekriterier} />
        </TilgangskontrollForInnhold>
    );

    return (
        <Tabs value={søkekriterier.portefølje} onChange={velgPortefølje}>
            <Tabs.List>
                <MineBrukere />
                <MittKontor />
                <MineKontorer />
                <AlleKontorer />
                <VelgKontor />
            </Tabs.List>
            <Tabs.Panel className={css.tabpanel} value={søkekriterier.portefølje}>
                {children}
            </Tabs.Panel>
        </Tabs>
    );
};

export default PorteføljeTabs;
