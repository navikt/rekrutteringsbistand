import { HandHeartIcon, HandShakeHeartIcon, HouseIcon, PinIcon } from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import RekBisKort from '../../../../felles/komponenter/rekbis-kort/RekBisKort';
import TekstlinjeMedIkon from '../TekstlinjeMedIkon';
import css from './RekBisKortKandidat.module.css';

type Props = {
    kandidatnummer: string;
    kandidat?: React.ReactNode;
    checkbox?: React.ReactNode;
    ønsker?: string;
    lokasjon?: string;
    bosted?: string;
    innsatsgruppe?: string;
    fremhevet?: boolean;
    kandidatPåListe?: React.ReactNode;
    markert?: boolean;
};

const RekBisKortKandidat = ({
    checkbox,
    kandidat,
    ønsker,
    lokasjon,
    bosted,
    innsatsgruppe,
    kandidatnummer,
    fremhevet,
    kandidatPåListe,
    markert,
}: Props) => {
    return (
        <RekBisKort fremhevet={fremhevet}>
            <div className={css.innhold} aria-selected={markert}>
                {kandidatPåListe}
                <div className={css.checkbox}>{checkbox}</div>
                <div className={css.hovedinnhold}>
                    <div className={css.omKandidat}>
                        <Heading size="small">{kandidat}</Heading>

                        <div className={css.tekstLinje}>
                            <TekstlinjeMedIkon
                                label="Ønsket sted"
                                ikon={<PinIcon />}
                                tekst={lokasjon}
                            />
                        </div>
                        <div className={css.tekstLinje}>
                            <TekstlinjeMedIkon
                                label="Ønsket yrke"
                                ikon={<HandShakeHeartIcon />}
                                tekst={ønsker}
                            />
                        </div>
                        <div className={css.tekstLinje}>
                            <TekstlinjeMedIkon label="Bosted" ikon={<HouseIcon />} tekst={bosted} />
                            <TekstlinjeMedIkon
                                label="Innsatsgruppe"
                                ikon={<HandHeartIcon />}
                                tekst={innsatsgruppe}
                            />
                        </div>
                    </div>
                    <div>
                        <Link
                            className={css.lenke}
                            to={`/stillinger/stillingssok/kandidat/${kandidatnummer}?brukKriterierFraKandidat=true`}
                        >
                            Finn stilling
                        </Link>
                    </div>
                </div>
            </div>
        </RekBisKort>
    );
};

export default RekBisKortKandidat;
