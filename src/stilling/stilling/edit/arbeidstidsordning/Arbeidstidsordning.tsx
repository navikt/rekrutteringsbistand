import { Select } from '@navikt/ds-react';
import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';

import { Arbeidstidsordning, Arbeidstidsordning as Type } from 'felles/domene/stilling/Stilling';
import { State } from '../../../redux/store';
import { SET_EMPLOYMENT_JOBARRANGEMENT } from '../../adDataReducer';
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
                        // @ts-ignore TODO: written before strict-mode enabled
                        <option value={Type[key]} key={key}>
                            {
                                // @ts-ignore TODO: written before strict-mode enabled
                                Type[key]
                            }
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

// @ts-ignore TODO: written before strict-mode enabled
export default connect(mapStateToProps, mapDispatchToProps)(JobArrangement);
