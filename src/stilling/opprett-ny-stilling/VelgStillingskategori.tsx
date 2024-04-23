import { Label, Radio, RadioGroup } from '@navikt/ds-react';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import React, { FunctionComponent, ReactNode } from 'react';
import { ApplikasjonContext } from '../../felles/ApplikasjonContext';
import { Rolle } from '../../felles/tilgangskontroll/TilgangskontrollForInnhold';
import { kategoriTilVisningsnavn } from '../stilling/forhåndsvisning/administration/kategori/Kategori';
import css from './OpprettNyStilling.module.css';

const kategorier = [
    Stillingskategori.Stilling,
    Stillingskategori.Jobbmesse,
    Stillingskategori.Formidling,
];

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

    const { harRolle } = React.useContext(ApplikasjonContext);

    const harTilgang = (kategori: Stillingskategori): boolean => {
        switch (kategori) {
            case Stillingskategori.Stilling:
                return harRolle([Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]);

            case Stillingskategori.Jobbmesse:
                return harRolle([Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]);

            case Stillingskategori.Formidling:
                return harRolle([
                    Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                    Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                ]);

            default:
                return false;
        }
    };

    return (
        <RadioGroup
            className={css.velgKategori}
            legend={<Label as="span">Hva skal du bruke stillingen til?</Label>}
            error={feilmelding}
        >
            {kategorier.map((kategori) =>
                harTilgang(kategori) ? (
                    <Radio
                        key={kategori}
                        name="stillingskategori"
                        onChange={onStillingskategoriChange}
                        checked={stillingskategori === kategori}
                        value={kategori}
                    >
                        {kategoriTilVisningsnavn(kategori)}
                    </Radio>
                ) : null
            )}
        </RadioGroup>
    );
};

export default VelgStillingskategori;
