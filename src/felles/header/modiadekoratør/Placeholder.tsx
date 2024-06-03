import { Heading, Select } from '@navikt/ds-react';
import classNames from 'classnames';
import { ChangeEvent, useEffect } from 'react';
import { NavKontorMedNavn } from '../../ApplikasjonContext';
import css from './Modiadekoratør.module.css';

const enheter = [
    { enhetId: '0239', navn: 'NAV Hurdal' },
    { enhetId: '0425', navn: 'NAV Åsnes' },
    { enhetId: '0604', navn: 'NAV Kongsberg' },
];

type Props = {
    navKontor: string | null;
    onNavKontorChange: (navKontor: NavKontorMedNavn) => void;
};

const Placeholder = ({ navKontor, onNavKontorChange }: Props) => {
    useEffect(() => {
        if (navKontor === null) {
            onNavKontorChange({
                navKontor: enheter[0].enhetId,
                navKontorNavn: enheter[0].navn,
            });
        }
    }, [navKontor, onNavKontorChange]);

    const handleNavKontorChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const kontor = enheter.find((enhet) => enhet.enhetId === event.target.value);

        if (kontor) {
            onNavKontorChange({
                navKontor: kontor.enhetId,
                navKontorNavn: kontor.navn,
            });
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
