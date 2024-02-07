import { Select } from '@navikt/ds-react';
import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';

import { Ansettelsesform as Type } from 'felles/domene/stilling/Stilling';
import { State } from '../../../redux/store';
import { SET_EMPLOYMENT_ENGAGEMENTTYPE } from '../../adDataReducer';
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
    engagementType: state.adData?.properties.engagementtype,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    setEngagementType: (engagementType: string) =>
        dispatch({ type: SET_EMPLOYMENT_ENGAGEMENTTYPE, engagementType }),
});

// @ts-ignore TODO: written before strict-mode enabled
export default connect(mapStateToProps, mapDispatchToProps)(Ansettelsesform);
