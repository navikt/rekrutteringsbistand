import { Loader, Tabs } from '@navikt/ds-react';
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

const PorteføljeTabs = ({ children }: { children: ReactNode }) => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();
    const { tilgangskontrollErPå } = useContext(ApplikasjonContext);
    const { data, isLoading } = useDecorator();
    const velgPortefølje = (portefølje: string) => {
        setSearchParam(FilterParam.Portefølje, portefølje);
    };

    if (isLoading) {
        return <Loader />;
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
        >
            <Tabs.Tab value={Portefølje.ALLE} label="Alle kontorer" />
        </TilgangskontrollForInnhold>
    );

    const VelgKontor = () => (
        <TilgangskontrollForInnhold
            skjulVarsel
            kreverEnAvRollene={[Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]}
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
