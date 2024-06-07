import { CheckmarkIcon, ClockIcon } from '@navikt/aksel-icons';
import { ToggleGroup, Tooltip } from '@navikt/ds-react';
import { sendEvent } from 'felles/amplitude';
import { useContext } from 'react';
import { KandidatSøkContext } from '../../KandidatSøkContext';
import { FilterParam } from '../../hooks/useQuery';
import css from './Sortering.module.css';

export enum Sortering {
    SisteFørst = 'nyeste',
    FlestKriterier = 'score',
}

const Sorteringsvalg = () => {
    const { kriterier } = useContext(KandidatSøkContext);

    const onChange = (sortering: Sortering) => {
        kriterier.setSøkeparameter(
            FilterParam.Sortering,
            sortering === Sortering.SisteFørst ? null : sortering
        );

        sendEvent('nytt_kandidatsøk', 'endre-sortering', {
            sortering,
        });
    };

    return (
        <ToggleGroup
            defaultValue={kriterier.søkekriterier.sortering}
            onChange={(sortering) => onChange(sortering as Sortering)}
            size="small"
        >
            <Tooltip
                offset={16}
                className={css.tooltip}
                content="Sist oppdaterte kandidater kommer øverst"
            >
                <ToggleGroup.Item value={Sortering.SisteFørst}>
                    <ClockIcon aria-hidden />
                    Sist oppdatert
                </ToggleGroup.Item>
            </Tooltip>
            <Tooltip
                offset={16}
                className={css.tooltip}
                content="Kandidatene som oppfyller flest kriterier, vises øverst"
            >
                <ToggleGroup.Item value={Sortering.FlestKriterier}>
                    <CheckmarkIcon aria-hidden /> Flest kriterier
                </ToggleGroup.Item>
            </Tooltip>
        </ToggleGroup>
    );
};

export default Sorteringsvalg;
