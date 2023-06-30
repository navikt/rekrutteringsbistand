import React, { FunctionComponent, ReactNode } from 'react';
import { Label, Radio, RadioGroup } from '@navikt/ds-react';
import { kategoriTilVisningsnavn } from '../stilling/forhåndsvisning/administration/kategori/Kategori';
import css from './OpprettNyStilling.module.css';

export enum Stillingskategori {
    Stilling = 'STILLING',
    Arbeidstrening = 'ARBEIDSTRENING',
    Jobbmesse = 'JOBBMESSE',
    Formidling = 'FORMIDLING',
}

const stillingskategoriSomIkkeLengerKanVelges = Stillingskategori.Arbeidstrening;

type Props = {
    stillingskategori: Stillingskategori | null;
    onChange: (stillingskategori: Stillingskategori) => void;
    feilmelding?: ReactNode;
};

const VelgStillingskategori: FunctionComponent<Props> = ({
    stillingskategori,
    onChange,
    feilmelding,
}) => {
    const onStillingskategoriChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value as Stillingskategori);
    };

    return (
        <RadioGroup
            className={css.velgKategori}
            legend={<Label as="span">Hva skal du bruke stillingen til?</Label>}
            error={feilmelding}
        >
            {Object.values(Stillingskategori)
                .filter((kategori) => kategori !== stillingskategoriSomIkkeLengerKanVelges)
                .map((kategori) => (
                    <Radio
                        key={kategori}
                        name="stillingskategori"
                        onChange={onStillingskategoriChange}
                        checked={stillingskategori === kategori}
                        value={kategori}
                    >
                        {kategoriTilVisningsnavn(kategori)}
                    </Radio>
                ))}
        </RadioGroup>
    );
};

export default VelgStillingskategori;
