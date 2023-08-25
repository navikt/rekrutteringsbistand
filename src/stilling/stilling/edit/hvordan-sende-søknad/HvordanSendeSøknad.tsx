import React, { ChangeEvent } from 'react';
import { Checkbox, ErrorMessage, Fieldset, TextField } from '@navikt/ds-react';
import { connect } from 'react-redux';
import { SET_APPLICATIONURL, SET_APPLICATIONEMAIL } from '../../adDataReducer';
import { VALIDATE_APPLICATION_EMAIL, ValidertFelt } from '../../adValidationReducer';
import { adjustUrl } from '../../../common/urlUtils';
import { State } from '../../../redux/store';
import Skjemalabel from '../skjemaetikett/Skjemalabel';
import Skjemalegend from '../skjemaetikett/Skjemalegend';

type Props = {
    applicationEmail: string;
    applicationUrl: string;
    setApplicationEmail: (value: string) => void;
    setApplicationUrl: (value: string) => void;
    validateEmail: () => void;
    validation: Record<ValidertFelt, string | undefined>;
};

class Application extends React.Component<Props> {
    declare state: {
        emailChecked: boolean;
        linkChecked: boolean;
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            emailChecked: false,
            linkChecked: false,
        };
    }

    onApplicationEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.setApplicationEmail(event.target.value);
    };

    onApplicationUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.setApplicationUrl(event.target.value);
    };

    onEmailChecked = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.checked) {
            this.props.setApplicationEmail('');
        }

        this.setState({
            emailChecked: event.target.checked,
        });
    };

    onLinkChecked = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.checked) {
            this.props.setApplicationUrl('');
        }

        this.setState({
            linkChecked: event.target.checked,
        });
    };

    validateEmail = () => {
        this.props.validateEmail();
    };

    completeLink = () => {
        const { applicationUrl } = this.props;
        if (applicationUrl && applicationUrl !== '') {
            this.props.setApplicationUrl(adjustUrl(applicationUrl));
        }
    };

    render() {
        const { applicationEmail, applicationUrl } = this.props;
        const showEmail = applicationEmail || this.state.emailChecked;
        const showLink = applicationUrl || this.state.linkChecked;

        return (
            <>
                <Fieldset
                    legend={
                        <Skjemalegend beskrivelse="For eksempel: ola.normann@firma.no">
                            E-postadresse
                        </Skjemalegend>
                    }
                >
                    <Checkbox checked={Boolean(showEmail)} onChange={this.onEmailChecked}>
                        E-post
                    </Checkbox>
                    {showEmail && (
                        <TextField
                            label={
                                <Skjemalabel beskrivelse="For eksempel: ola.normann@firma.no">
                                    E-postadresse
                                </Skjemalabel>
                            }
                            type="email"
                            value={applicationEmail}
                            onChange={this.onApplicationEmailChange}
                            onBlur={this.validateEmail}
                            error={this.props.validation.applicationEmail}
                        />
                    )}
                    <Checkbox checked={Boolean(showLink)} onChange={this.onLinkChecked}>
                        Lenke til søknadsskjema
                    </Checkbox>
                    {showLink && (
                        <TextField
                            label={
                                <Skjemalabel beskrivelse="For eksempel: www.rekruttering.no">
                                    Lenke
                                </Skjemalabel>
                            }
                            value={applicationUrl}
                            onChange={this.onApplicationUrlChange}
                            onBlur={this.completeLink}
                        />
                    )}
                    {this.props.validation.søknadsmetode && (
                        <ErrorMessage>{this.props.validation.søknadsmetode}</ErrorMessage>
                    )}
                </Fieldset>
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    applicationEmail: state.adData?.properties.applicationemail,
    applicationUrl: state.adData?.properties.applicationurl,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch) => ({
    setApplicationEmail: (applicationemail) =>
        dispatch({ type: SET_APPLICATIONEMAIL, applicationemail }),
    setApplicationUrl: (applicationurl) => dispatch({ type: SET_APPLICATIONURL, applicationurl }),
    validateEmail: () => dispatch({ type: VALIDATE_APPLICATION_EMAIL }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
