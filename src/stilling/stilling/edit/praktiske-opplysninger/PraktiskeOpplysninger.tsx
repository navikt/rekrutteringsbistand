import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Checkbox, CheckboxGroup, Fieldset, Radio, RadioGroup, TextField } from '@navikt/ds-react';

import { leggTilTimerPåISOString } from '../../../utils/datoUtils';
import {
    SET_EMPLOYMENT_EXTENT,
    CHECK_EMPLOYMENT_WORKDAY,
    UNCHECK_EMPLOYMENT_WORKDAY,
    CHECK_EMPLOYMENT_WORKHOURS,
    UNCHECK_EMPLOYMENT_WORKHOURS,
    SET_EMPLOYMENT_SECTOR,
    SET_EMPLOYMENT_POSITIONCOUNT,
    SET_APPLICATIONDUE,
    SET_EMPLOYMENT_STARTTIME,
} from '../../adDataReducer';
import { Omfang } from '../../../domene/Stilling';
import { State } from '../../../redux/store';
import { ValidertFelt } from '../../adValidationReducer';
import Ansettelsesform from '../ansettelsesform/Ansettelsesform';
import Datovelger from './Datovelger';
import isJson from './IsJson';
import Arbeidstidsordning from '../arbeidstidsordning/Arbeidstidsordning';
import Skjemalabel from '../skjemaetikett/Skjemalabel';
import Skjemalegend from '../skjemaetikett/Skjemalegend';
import Stilling from '../../../domene/Stilling';
import css from './PraktiskeOpplysninger.module.css';

type Props = {
    ad: Stilling;
    setExtent: (value: Omfang) => void;
    setPositionCount: (value: string) => void;
    setSector: (value: string) => void;
    workday: string;
    checkWorkday: (value: string) => void;
    uncheckWorkday: (value: string) => void;
    workhours: string;
    checkWorkhours: (value: string) => void;
    uncheckWorkhours: (value: string) => void;
    setStartTime: (value?: string) => void;
    setApplicationDue: (value: string) => void;
    validation: Record<ValidertFelt, string | undefined>;
};

class PraktiskeOpplysninger extends React.Component<Props> {
    handleWorkdayChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (event.target.checked) {
            this.props.checkWorkday(value);
        } else {
            this.props.uncheckWorkday(value);
        }
    };

    onWorkhoursChange = (e) => {
        const { value } = e.target;
        if (e.target.checked) {
            this.props.checkWorkhours(value);
        } else {
            this.props.uncheckWorkhours(value);
        }
    };

    onSectorChange = (e) => {
        this.props.setSector(e.target.value);
    };

    onPositioncountChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.setPositionCount(event.target.value);
    };

    onApplicationDueChange = (date?: Date) => {
        if (date) {
            this.props.setApplicationDue(leggTilTimerPåISOString(date.toISOString(), 12));
        }
    };

    onSnarestChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (event.target.checked) {
            this.props.setApplicationDue(value);
        } else {
            this.props.setApplicationDue('');
        }
    };

    onStarttimeChange = (date?: Date) => {
        if (date) {
            this.props.setStartTime(leggTilTimerPåISOString(date.toISOString(), 12));
        }
    };

    onEtterAvtaleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (event.target.checked) {
            this.props.setStartTime(value);
        } else {
            this.props.setStartTime(undefined);
        }
    };

    render() {
        const { ad, workday, workhours } = this.props;

        const workdayAsArray: string[] | undefined = workday
            ? isJson(workday)
                ? JSON.parse(workday)
                : []
            : undefined;
        const workhoursAsArray: string[] | undefined = workhours
            ? isJson(workhours)
                ? JSON.parse(workhours)
                : []
            : undefined;

        return (
            <>
                <Ansettelsesform />
                <Arbeidstidsordning />
                <div className={css.skillelinje} />
                <RadioGroup
                    legend={<Skjemalegend påkrevd>Omfang</Skjemalegend>}
                    name="heltidDeltid"
                    value={ad.properties.extent}
                    onChange={this.props.setExtent}
                    error={this.props.validation.extent}
                    className={css.inlineFields}
                >
                    <Radio value="Heltid">Heltid</Radio>
                    <Radio value="Deltid">Deltid</Radio>
                </RadioGroup>

                <CheckboxGroup
                    legend={<Skjemalegend påkrevd>Arbeidsdager</Skjemalegend>}
                    value={workdayAsArray}
                    error={this.props.validation.workday}
                    className={css.inlineFields}
                >
                    <Checkbox onChange={this.handleWorkdayChange} value="Ukedager">
                        Ukedager
                    </Checkbox>
                    <Checkbox onChange={this.handleWorkdayChange} value="Lørdag">
                        Lørdag
                    </Checkbox>
                    <Checkbox onChange={this.handleWorkdayChange} value="Søndag">
                        Søndag
                    </Checkbox>
                </CheckboxGroup>
                <CheckboxGroup
                    legend={<Skjemalegend påkrevd>Arbeidstid</Skjemalegend>}
                    value={workhoursAsArray}
                    error={this.props.validation.workhours}
                    className={css.inlineFields}
                >
                    <Checkbox value="Dagtid" onChange={this.onWorkhoursChange}>
                        Dagtid
                    </Checkbox>
                    <Checkbox value="Kveld" onChange={this.onWorkhoursChange}>
                        Kveld
                    </Checkbox>
                    <Checkbox value="Natt" onChange={this.onWorkhoursChange}>
                        Natt
                    </Checkbox>
                </CheckboxGroup>
                <RadioGroup
                    name="sektor"
                    legend={<Skjemalegend påkrevd>Sektor</Skjemalegend>}
                    value={ad.properties.sector}
                    onChange={this.props.setSector}
                    className={css.inlineFields}
                    error={this.props.validation.sector}
                >
                    <Radio value="Privat">Privat</Radio>
                    <Radio value="Offentlig">Offentlig</Radio>
                    <Radio value="Ikke oppgitt">Ikke oppgitt</Radio>
                </RadioGroup>
                <div className={css.skillelinje} />
                <div>
                    <TextField
                        label={<Skjemalabel påkrevd>Antall stillinger</Skjemalabel>}
                        value={ad.properties.positioncount}
                        onChange={this.onPositioncountChange}
                        error={this.props.validation.positioncount}
                        type="number"
                        min="1"
                    />
                </div>
                <Fieldset
                    className={css.datepickerOgCheckbox}
                    legend={<Skjemalabel påkrevd>Søknadsfrist</Skjemalabel>}
                    error={this.props.validation.applicationdue}
                >
                    <Datovelger
                        dato={ad.properties.applicationdue}
                        onChange={this.onApplicationDueChange}
                        disabled={ad.properties.applicationdue === 'Snarest'}
                        fromDate={new Date()}
                        label="Velg søknadsfrist"
                    />
                    <Checkbox
                        value="Snarest"
                        onChange={this.onSnarestChange}
                        checked={ad.properties.applicationdue === 'Snarest'}
                    >
                        Snarest
                    </Checkbox>
                </Fieldset>

                <Fieldset
                    legend={<Skjemalegend>Oppstart</Skjemalegend>}
                    className={css.datepickerOgCheckbox}
                    error={this.props.validation.starttime}
                >
                    <Datovelger
                        dato={ad.properties.starttime}
                        onChange={this.onStarttimeChange}
                        disabled={ad.properties.starttime === 'Etter avtale'}
                        fromDate={new Date()}
                        label="Velg oppstart"
                    />
                    <Checkbox
                        value="Etter avtale"
                        onChange={this.onEtterAvtaleChange}
                        checked={ad.properties.starttime === 'Etter avtale'}
                    >
                        Etter avtale
                    </Checkbox>
                </Fieldset>
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    ad: state.adData,
    workday: state.adData?.properties.workday,
    workhours: state.adData?.properties.workhours,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    setExtent: (extent) => dispatch({ type: SET_EMPLOYMENT_EXTENT, extent }),
    checkWorkday: (value) => dispatch({ type: CHECK_EMPLOYMENT_WORKDAY, value }),
    uncheckWorkday: (value) => dispatch({ type: UNCHECK_EMPLOYMENT_WORKDAY, value }),
    checkWorkhours: (value) => dispatch({ type: CHECK_EMPLOYMENT_WORKHOURS, value }),
    uncheckWorkhours: (value) => dispatch({ type: UNCHECK_EMPLOYMENT_WORKHOURS, value }),
    setSector: (sector) => dispatch({ type: SET_EMPLOYMENT_SECTOR, sector }),
    setPositionCount: (positioncount) =>
        dispatch({ type: SET_EMPLOYMENT_POSITIONCOUNT, positioncount }),
    setApplicationDue: (applicationdue) => dispatch({ type: SET_APPLICATIONDUE, applicationdue }),
    setStartTime: (starttime) => dispatch({ type: SET_EMPLOYMENT_STARTTIME, starttime }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PraktiskeOpplysninger);
