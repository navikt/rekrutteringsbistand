import { Checkbox, CheckboxGroup, ErrorMessage, Loader } from '@navikt/ds-react';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';

import React from 'react';
import { FylkeDTO, useHentFylker } from '../../../../api/stillings-api/hentFylker';
import { KommuneDTO, useHentKommuner } from '../../../../api/stillings-api/hentKommuner';
import capitalizeLocation from '../../../stilling/edit/arbeidssted/capitalizeLocation';
import useNavigering from '../../useNavigering';
import { QueryParam, hentSøkekriterier, oppdaterUrlMedParam } from '../../utils/urlUtils';
import css from '../Filter.module.css';

interface IFylkerOgKommunerValgboks {
    fylkerMedKommuner: FylkeMedKommuneDTO[] | undefined;
}

export interface FylkeMedKommuneDTO extends FylkeDTO {
    kommuner: KommuneDTO[] | undefined;
}

const FylkerOgKommunerValgboks: React.FC<IFylkerOgKommunerValgboks> = ({ fylkerMedKommuner }) => {
    const { searchParams, navigate } = useNavigering();

    const [valgteFylker, setValgteFylker] = useState<Set<string>>(
        hentSøkekriterier(searchParams).fylker
    );
    const [valgteKommuner, setValgteKommuner] = useState<Set<string>>(
        hentSøkekriterier(searchParams).kommuner
    );

    useEffect(() => {
        setValgteFylker(hentSøkekriterier(searchParams).fylker);
        setValgteKommuner(hentSøkekriterier(searchParams).kommuner);
    }, [searchParams]);

    const oppdaterSøk = (parameter: QueryParam, verdi: string[]) => {
        oppdaterUrlMedParam({
            searchParams,
            navigate,
            parameter,
            verdi,
        });
    };

    const onFylkeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const fylke = event.target.value;
        const fylker = new Set<string>(valgteFylker);

        if (event.target.checked) {
            fylker.add(fylke);
        } else {
            fylker.delete(fylke);
            const kommuner = new Set<string>(valgteKommuner);

            kommuner.forEach((kommune) => {
                if (kommune.startsWith(fylke)) {
                    kommuner.delete(kommune);
                }
            });
            oppdaterSøk(QueryParam.Kommuner, Array.from(kommuner));
        }

        setValgteFylker(fylker);
        oppdaterSøk(QueryParam.Fylker, Array.from(fylker));
    };

    const onKommuneChange = (event: ChangeEvent<HTMLInputElement>) => {
        const kommuneMedFylke = event.target.value;
        const kommuner = new Set<string>(valgteKommuner);

        if (event.target.checked) {
            kommuner.add(kommuneMedFylke);
        } else {
            kommuner.delete(kommuneMedFylke);
        }

        oppdaterSøk(QueryParam.Kommuner, Array.from(kommuner));
    };

    return (
        <CheckboxGroup legend="Område" value={Array.from(valgteFylker)}>
            {fylkerMedKommuner?.map((fylke: FylkeMedKommuneDTO) => (
                <Fragment key={fylke.code}>
                    <Checkbox value={fylke.code} onChange={onFylkeChange}>
                        {capitalizeLocation(fylke.name)}
                    </Checkbox>
                    {valgteFylker.has(fylke.code) &&
                        fylke.kommuner &&
                        fylke.kommuner.length > 1 && (
                            <CheckboxGroup
                                hideLegend
                                className={css.indentertCheckboxgruppe}
                                legend={`Velg kommuner i ${fylke}`}
                                value={Array.from(valgteKommuner)}
                            >
                                {fylke.kommuner.map((kommune: KommuneDTO) => (
                                    <Checkbox
                                        key={kommune.code}
                                        value={kommune.code}
                                        onChange={onKommuneChange}
                                    >
                                        {capitalizeLocation(kommune.name)}
                                    </Checkbox>
                                ))}
                            </CheckboxGroup>
                        )}
                </Fragment>
            ))}
        </CheckboxGroup>
    );
};

const FylkerOgKommuner: React.FC = () => {
    const fylker = useHentFylker();
    const kommuner = useHentKommuner();

    if (fylker.isLoading || kommuner.isLoading) {
        return <Loader />;
    }

    const fylkerMedKommuner = fylker?.data
        ?.map((fylke: FylkeDTO) => {
            return {
                ...fylke,
                kommuner: kommuner?.data
                    ?.filter((kommune: KommuneDTO) => {
                        return fylke.code === kommune.countyCode;
                    })
                    .sort((a: KommuneDTO, b: KommuneDTO) => a.name.localeCompare(b.name)),
            };
        })
        .sort((a: FylkeDTO, b: FylkeDTO) => a.name.localeCompare(b.name));

    return (
        <>
            {fylker.error && (
                <ErrorMessage>Klarte ikke å hente fylker fra Arbeidsplassen</ErrorMessage>
            )}
            {kommuner.error && (
                <ErrorMessage>Klarte ikke å hente kommuner fra Arbeidsplassen</ErrorMessage>
            )}
            <FylkerOgKommunerValgboks fylkerMedKommuner={fylkerMedKommuner} />
        </>
    );
};

export default FylkerOgKommuner;
