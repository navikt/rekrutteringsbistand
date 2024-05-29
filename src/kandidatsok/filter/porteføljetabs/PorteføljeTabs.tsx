import { Tabs } from '@navikt/ds-react';
import { ReactNode, useContext } from 'react';
import { ApplikasjonContext } from '../../../felles/ApplikasjonContext';
import TilgangskontrollForInnhold, {
    Rolle,
} from '../../../felles/tilgangskontroll/TilgangskontrollForInnhold';
import { FilterParam } from '../../hooks/useQuery';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import css from './PorteføljeTabs.module.css';
import VelgKontorTab from './VelgKontorTab';

export enum Portefølje {
    Alle = 'alle',
    MineBrukere = 'mine',
    MineKontorer = 'mineKontorer',
    MittKontor = 'kontor',
    VelgKontor = 'valgte',
}

const PorteføljeTabs = ({ children }: { children: ReactNode }) => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();
    const { tilgangskontrollErPå } = useContext(ApplikasjonContext);

    const velgPortefølje = (portefølje: string) => {
        setSearchParam(FilterParam.Portefølje, portefølje);
    };

    return (
        <Tabs value={søkekriterier.portefølje} onChange={velgPortefølje}>
            <Tabs.List>
                <TilgangskontrollForInnhold
                    skjulVarsel
                    kreverEnAvRollene={[Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]}
                >
                    <Tabs.Tab value={Portefølje.Alle} label="Alle" />
                </TilgangskontrollForInnhold>
                <TilgangskontrollForInnhold
                    skjulVarsel
                    kreverEnAvRollene={[Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET]}
                >
                    {tilgangskontrollErPå && (
                        <Tabs.Tab value={Portefølje.MineKontorer} label="Mine kontorer" />
                    )}
                </TilgangskontrollForInnhold>
                <Tabs.Tab value={Portefølje.MineBrukere} label="Mine brukere" />
                <TilgangskontrollForInnhold
                    skjulVarsel
                    kreverEnAvRollene={[Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]}
                >
                    <Tabs.Tab value={Portefølje.MittKontor} label="Mitt kontor" />
                </TilgangskontrollForInnhold>
                <TilgangskontrollForInnhold
                    skjulVarsel
                    kreverEnAvRollene={[Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]}
                >
                    <VelgKontorTab søkekriterier={søkekriterier} />
                </TilgangskontrollForInnhold>
            </Tabs.List>
            <Tabs.Panel className={css.tabpanel} value={søkekriterier.portefølje}>
                {children}
            </Tabs.Panel>
        </Tabs>
    );
};

export default PorteføljeTabs;
