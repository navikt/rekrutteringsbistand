import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Select } from '@navikt/ds-react';

import { Arbeidstidsordning, Arbeidstidsordning as Type } from '../../../domene/Stilling';
import { SET_EMPLOYMENT_JOBARRANGEMENT } from '../../adDataReducer';
import { State } from '../../../redux/store';
import Skjemalabel from '../skjemaetikett/Skjemalabel';

type Props = {
    jobArrangement: Arbeidstidsordning;
    setJobArrangement: (value: Arbeidstidsordning) => void;
};

class JobArrangement extends React.Component<Props> {
    onJobArrangementChange = (event: ChangeEvent<HTMLSelectElement>) => {
        this.props.setJobArrangement(event.target.value as Arbeidstidsordning);
    };

    render() {
        return (
            <div className="JobArrangement">
                <Select
                    label={<Skjemalabel>Ansettelsesform</Skjemalabel>}
                    value={this.props.jobArrangement}
                    onChange={this.onJobArrangementChange}
                >
                    <option value="">Velg arbeidstidsordning</option>
                    {Object.keys(Type).map((key) => (
                        <option value={Type[key]} key={key}>
                            {Type[key]}
                        </option>
                    ))}
                </Select>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    jobArrangement: state.adData?.properties.jobarrangement,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    setJobArrangement: (jobarrangement: Arbeidstidsordning) =>
        dispatch({ type: SET_EMPLOYMENT_JOBARRANGEMENT, jobarrangement }),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobArrangement);
