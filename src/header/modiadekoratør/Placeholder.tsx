import { Heading, Select } from '@navikt/ds-react';
import classNames from 'classnames';
import { NavKontor } from 'felles/store/navKontor';
import { ChangeEvent, useEffect } from 'react';
import css from './Modiadekoratør.module.css';

const enheter = [
    { enhetId: '0239', navn: 'NAV Hurdal' },
    { enhetId: '0425', navn: 'NAV Åsnes' },
    { enhetId: '0604', navn: 'NAV Kongsberg' },
];

type Props = {
    navKontor: NavKontor | null;
    onNavKontorChange: (navKontor: NavKontor) => void;
};

const Placeholder = ({ navKontor, onNavKontorChange }: Props) => {
    useEffect(() => {
        if (navKontor === null) {
            onNavKontorChange(enheter[0]);
        }
    }, [navKontor, onNavKontorChange]);

    const handleNavKontorChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const kontor = enheter.find((enhet) => enhet.enhetId === event.target.value);

        if (kontor) {
            onNavKontorChange(kontor);
        }
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
                value={navKontor?.enhetId ?? ''}
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
