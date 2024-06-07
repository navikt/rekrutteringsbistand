import { Checkbox, CheckboxGroup, HelpText, useId } from '@navikt/ds-react';
import { Innsatsgruppe } from 'felles/domene/kandidat/Oppfølgingsinformasjon';
import { FunctionComponent, useContext } from 'react';
import { KandidatSøkContext } from '../../KandidatSøkContext';
import { FilterParam } from '../../hooks/useQuery';
import { LISTEPARAMETER_SEPARATOR } from '../../hooks/useSøkekriterier';
import css from './PrioriterteMålgrupper.module.css';

export enum PrioritertMålgruppe {
    UngeUnderTrettiÅr = 'unge',
    SeniorFemtiPluss = 'senior',
    HullICv = 'hullICv',
}

const PrioriterteMålgrupper: FunctionComponent = () => {
    const hjelpetekstId = useId();
    const { kriterier } = useContext(KandidatSøkContext);

    const onChange = (valgteMålgrupper: Innsatsgruppe[]) => {
        kriterier.setSøkeparameter(
            FilterParam.PrioritertMålgruppe,
            valgteMålgrupper.join(LISTEPARAMETER_SEPARATOR)
        );
    };

    return (
        <CheckboxGroup
            legend="Velg prioriterte målgrupper"
            onChange={onChange}
            value={Array.from(kriterier.søkekriterier.prioritertMålgruppe)}
        >
            <Checkbox value={PrioritertMålgruppe.UngeUnderTrettiÅr}>Unge under 30 år</Checkbox>
            <Checkbox value={PrioritertMålgruppe.SeniorFemtiPluss}>Senior 50+</Checkbox>
            <div className={css.checkboxOgHjelpetekst}>
                <Checkbox value={PrioritertMålgruppe.HullICv} aria-describedby={hjelpetekstId}>
                    Har hull i CV-en
                </Checkbox>
                <div className={css.hjelpetekst}>
                    <HelpText id={hjelpetekstId} title="Hva er hull i CV-en?">
                        Du får treff på kandidater som ikke har registrert jobb eller utdanning i
                        CV-en i en sammenhengende periode på 2 år i løpet av de siste 5 årene.
                    </HelpText>
                </div>
            </div>
        </CheckboxGroup>
    );
};

export default PrioriterteMålgrupper;
