import { Heading, Select } from '@navikt/ds-react';
import { ChangeEvent, useEffect } from 'react';
import css from './Modiadekoratør.module.css';
import classNames from 'classnames';

const enheter = [
    { enhetId: '0239', navn: 'NAV Hurdal' },
    { enhetId: '0425', navn: 'NAV Åsnes' },
    { enhetId: '0604', navn: 'NAV Kongsberg' },
];

type Props = {
    navKontor: string | null;
    onNavKontorChange: (navKontor: string) => void;
};

const Placeholder = ({ navKontor, onNavKontorChange }: Props) => {
    useEffect(() => {
        if (navKontor === null) {
            onNavKontorChange(enheter[0].enhetId);
        }
    }, [navKontor, onNavKontorChange]);

    const handleNavKontorChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onNavKontorChange(event.target.value);
    };

    return (
        <div className={classNames(css.placeholder, css.wrapper)}>
            <Heading level="1" size="small">
                Rekrutteringsbistand
            </Heading>
            <Select
                label="Kontor"
                size="small"
                hideLabel
                value={navKontor ?? ''}
                onChange={handleNavKontorChange}
            >
                {enheter.map((enhet) => (
                    <option key={enhet.enhetId} value={enhet.enhetId}>
                        {enhet.navn} ({enhet.enhetId})
                    </option>
                ))}
            </Select>
        </div>
    );
};

export default Placeholder;
