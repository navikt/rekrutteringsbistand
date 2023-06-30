import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Select } from '@navikt/ds-react';

import { Ansettelsesform as Type } from '../../../domene/Stilling';
import { SET_EMPLOYMENT_ENGAGEMENTTYPE } from '../../adDataReducer';
import { State } from '../../../redux/store';
import { ValidertFelt } from '../../adValidationReducer';
import Skjemalabel from '../skjemaetikett/Skjemalabel';

type Props = {
    setEngagementType: (value: string) => void;
    engagementType: Type;
    validation: Record<ValidertFelt, string | undefined>;
};

class Ansettelsesform extends React.Component<Props> {
    onEngagementTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        this.props.setEngagementType(event.target.value);
    };

    render() {
        return (
            <div className="EngagementType">
                <Select
                    label={<Skjemalabel påkrevd>Ansettelsesform</Skjemalabel>}
                    value={this.props.engagementType}
                    onChange={this.onEngagementTypeChange}
                    error={this.props.validation.engagementtype}
                >
                    <option value="">Velg ansettelsesform</option>
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
    engagementType: state.adData?.properties.engagementtype,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    setEngagementType: (engagementType: string) =>
        dispatch({ type: SET_EMPLOYMENT_ENGAGEMENTTYPE, engagementType }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ansettelsesform);
