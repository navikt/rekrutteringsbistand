import {
    HandHeartIcon,
    HandShakeHeartIcon,
    HouseIcon,
    PersonIcon,
    PinIcon,
} from '@navikt/aksel-icons';
import { Button, Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import RekBisKort from '../../../../felles/komponenter/rekbis-kort/RekBisKort';
import TekstlinjeMedIkon from '../TekstlinjeMedIkon';
import css from './RekBisKortKandidat.module.css';

export interface IRekBisKortKandidat {
    kandidatnummer: string;
    kandidat?: React.ReactNode;
    checkbox?: React.ReactNode;
    ønsker?: string;
    lokasjon?: string;
    bosted?: string;
    innsatsgruppe?: string;
    veilder?: string;
}

const RekBisKortKandidat: React.FC<IRekBisKortKandidat> = ({
    checkbox,
    kandidat,
    ønsker,
    lokasjon,
    bosted,
    innsatsgruppe,
    veilder,
    kandidatnummer,
}) => {
    const navigate = useNavigate();
    return (
        <RekBisKort
            footer={
                <div className={css.footer}>
                    <div className={css.footerTekst}>
                        <TekstlinjeMedIkon label="Bosted" ikon={<HouseIcon />} tekst={bosted} />
                        <TekstlinjeMedIkon
                            label="Ønsket yrke"
                            ikon={<HandHeartIcon />}
                            tekst={innsatsgruppe}
                        />
                        <TekstlinjeMedIkon
                            label="Ønsket yrke"
                            ikon={<PersonIcon />}
                            tekst={veilder}
                        />
                    </div>
                    <div>
                        <Button
                            variant={'tertiary'}
                            onClick={() =>
                                navigate(
                                    `/stillinger/stillingssok/kandidat/${kandidatnummer}?brukKriterierFraKandidat=true`
                                )
                            }
                        >
                            Finn stilling
                        </Button>
                    </div>
                </div>
            }
        >
            <div className={css.innhold}>
                <div className={css.checkbox}>{checkbox}</div>
                <div className={css.omKandidat}>
                    <Heading size="small">{kandidat}</Heading>
                    <TekstlinjeMedIkon
                        label="Ønsket yrke"
                        ikon={<HandShakeHeartIcon />}
                        tekst={ønsker}
                    />
                    <TekstlinjeMedIkon label="Ønsket sted" ikon={<PinIcon />} tekst={lokasjon} />
                </div>
            </div>
        </RekBisKort>
    );
};

export default RekBisKortKandidat;
