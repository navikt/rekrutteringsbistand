import { BodyLong, BodyShort, Button, Detail, Modal, TextField } from '@navikt/ds-react';
import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { KandidatlisteSammendrag } from 'felles/domene/kandidatliste/Kandidatliste';
import Typeahead from '../../komponenter/typeahead/Typeahead';
import {
    CLEAR_TYPE_AHEAD_SUGGESTIONS_ENHETSREGISTER,
    FETCH_TYPE_AHEAD_SUGGESTIONS_ENHETSREGISTER,
} from '../../komponenter/typeahead/enhetsregisterReducer';
import AppState from '../../state/AppState';
import { capitalizeEmployerName, capitalizeLocation } from '../../utils/formateringUtils';
import css from './Modal.module.css';

export type KandidatlisteDto = {
    tittel: string;
    orgNr?: string;
    orgNavn?: string;
};

type Suggestion = {
    name: string;
    orgnr: string;
    location?: {
        address?: string;
        postalCode?: string;
        city?: string;
    };
};

type Props = {
    onSave: (info: KandidatlisteDto) => void;
    onClose: () => void;
    kandidatliste?: KandidatlisteSammendrag;
    saving: boolean;
    knappetekst: string;
    suggestions: Suggestion[];
    fetchTypeaheadSuggestions: (value: string) => void;
    clearTypeaheadSuggestions: () => void;
};

class OpprettKandidatlisteForm extends React.Component<Props> {
    textArea: HTMLTextAreaElement | null;
    input: HTMLInputElement | null;

    declare state: {
        tittel: string;
        suggestion?: Suggestion;
        typeaheadValue: string;
        visValideringsfeilInput: boolean;
    };

    constructor(props: Props) {
        super(props);

        let suggestion: Suggestion | undefined = undefined;

        if (props.kandidatliste) {
            const { organisasjonNavn, organisasjonReferanse } = props.kandidatliste;

            if (organisasjonNavn && organisasjonReferanse) {
                suggestion = {
                    name: organisasjonNavn,
                    orgnr: organisasjonReferanse,
                };
            }
        }

        this.state = {
            suggestion,
            tittel: props.kandidatliste?.tittel || '',
            visValideringsfeilInput: false,
            typeaheadValue: suggestion?.name ? capitalizeEmployerName(suggestion?.name) : '',
        };
    }

    componentWillUnmount() {
        this.props.clearTypeaheadSuggestions();
    }

    onTittelChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        this.setState({
            tittel: value,
            visValideringsfeilInput: this.state.visValideringsfeilInput && value === '',
        });
    };

    onBedriftChange = (value: string) => {
        if (value !== '') {
            this.props.fetchTypeaheadSuggestions(value);
            this.setState({
                typeaheadValue: value,
            });
        } else {
            this.props.clearTypeaheadSuggestions();
            this.setState({
                suggestion: undefined,
                typeaheadValue: value,
            });
        }
    };

    onBedriftSelect = ({ value }) => {
        const suggestion = this.props.suggestions.find((s) => s.orgnr === value);
        if (suggestion) {
            this.setState({
                suggestion,
                typeaheadValue: suggestion ? capitalizeEmployerName(suggestion.name) : '',
            });
        }
    };

    onSuggestionSubmit = (e: Event) => {
        e.preventDefault();
        this.setSuggestion();
    };

    onTypeAheadBlur = () => {
        this.setSuggestion();
    };

    setSuggestion = () => {
        const suggestion = this.lookUpEmployer(this.state.typeaheadValue);
        if (suggestion) {
            this.setState({
                typeaheadValue: suggestion ? capitalizeEmployerName(suggestion.name) : '',
                suggestion,
            });
        }
    };

    getEmployerSuggestionLabel = (suggestion: Suggestion) => {
        let commaSeparate: string[] = [];

        if (suggestion.location) {
            if (suggestion.location.address) {
                commaSeparate = [...commaSeparate, suggestion.location.address];
            }
            if (suggestion.location.postalCode) {
                commaSeparate = [...commaSeparate, suggestion.location.postalCode];
            }
            if (suggestion.location.city) {
                commaSeparate = [...commaSeparate, capitalizeLocation(suggestion.location.city)];
            }
        }

        if (suggestion.orgnr) {
            const groupedOrgNumber = suggestion.orgnr.match(/.{1,3}/g)?.join(' ');
            commaSeparate = [...commaSeparate, `Virksomhetsnummer: ${groupedOrgNumber}`];
        }

        return (
            <div className="Employer__typeahead__item">
                <BodyShort>{capitalizeEmployerName(suggestion.name)}</BodyShort>
                <Detail>{commaSeparate.join(', ')}</Detail>
            </div>
        );
    };

    lookUpEmployer = (value: string) =>
        this.props.suggestions.find(
            (employer) =>
                employer.name.toLowerCase() === value.toLowerCase() ||
                employer.orgnr === value.replace(/\s/g, '')
        );

    validateAndSave = () => {
        if (this.validerTittel()) {
            const dto: KandidatlisteDto = {
                tittel: this.state.tittel,
                orgNavn: this.state.suggestion?.name,
                orgNr: this.state.suggestion?.orgnr,
            };

            this.props.onSave(dto);
        } else if (!this.validerTittel()) {
            this.setState(
                {
                    visValideringsfeilInput: true,
                },
                () => this.input?.focus()
            );
        }
    };

    validerTittel = () => this.state.tittel !== '';

    render() {
        const { saving, knappetekst, suggestions } = this.props;
        const { suggestion } = this.state;
        const location = suggestion ? suggestion.location : undefined;

        return (
            <>
                <Modal.Body>
                    <BodyLong spacing>
                        Lister skal kun opprettes til formål formidling, det vil si at formålet er å
                        koble en arbeidssøker til en stilling. I tillegg er det tillatt å opprette
                        lister knyttet til stilling/yrke, for å kunne jobbe med flere konkrete
                        stillinger samtidig. Du kan ikke opprette lister til andre formål, for
                        eksempel lister for kurs eller arbeidstrening.
                    </BodyLong>
                    <form className={css.skjema}>
                        <TextField
                            autoComplete="off"
                            label="Navn på kandidatliste (må fylles ut)"
                            value={this.state.tittel}
                            onChange={this.onTittelChange}
                            description="Navn på kandidatliste skal si noe om stillingen. Det kan ikke inneholde tekst som sier noe om kandidatens oppfølging i NAV, helse, tiltak, eller noe som kategoriserer personen ut over det aktuelle yrke som listen er opprettet for."
                            error={
                                this.state.visValideringsfeilInput
                                    ? 'Navn på kandidatliste mangler'
                                    : undefined
                            }
                            ref={(input) => (this.input = input)}
                        />

                        <div className={css.arbeidsgiver}>
                            <Typeahead
                                id="arbeidsgiver"
                                label="Arbeidsgiver (bedriftens navn hentet fra Enhetsregisteret)"
                                placeholder="Skriv inn arbeidsgivers navn eller virksomhetsnummer"
                                onChange={this.onBedriftChange}
                                onSelect={this.onBedriftSelect}
                                onSubmit={this.onSuggestionSubmit}
                                suggestions={suggestions.map((s) => ({
                                    value: s.orgnr,
                                    label: this.getEmployerSuggestionLabel(s),
                                }))}
                                value={this.state.typeaheadValue}
                                onTypeAheadBlur={this.onTypeAheadBlur}
                                shouldHighlightInput={false}
                            />
                            {suggestion && location && (
                                <Detail>
                                    {capitalizeEmployerName(suggestion.name)}, {location.address},{' '}
                                    {location.postalCode}{' '}
                                    {location.city ? capitalizeLocation(location.city) : ''}
                                </Detail>
                            )}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.validateAndSave} loading={saving} disabled={saving}>
                        {knappetekst}
                    </Button>
                    <Button variant="secondary" onClick={this.props.onClose} disabled={saving}>
                        Avbryt
                    </Button>
                </Modal.Footer>
            </>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    suggestions: state.enhetsregister.suggestions,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchTypeaheadSuggestions: (value: string) =>
        dispatch({ type: FETCH_TYPE_AHEAD_SUGGESTIONS_ENHETSREGISTER, value }),
    clearTypeaheadSuggestions: () =>
        dispatch({ type: CLEAR_TYPE_AHEAD_SUGGESTIONS_ENHETSREGISTER }),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpprettKandidatlisteForm);
