import { FunctionComponent, useEffect, useState } from 'react';
import { BodyShort, Detail, Label } from '@navikt/ds-react';

import { fetchEmployerNameCompletionHits, fetchOrgnrSuggestions } from '../api/api';
import capitalizeEmployerName from '../stilling/edit/endre-arbeidsgiver/capitalizeEmployerName';
import capitalizeLocation from '../stilling/edit/arbeidssted/capitalizeLocation';
import Typeahead, { Suggestion } from '../common/typeahead/Typeahead';
import css from './OpprettNyStilling.module.css';
import { Arbeidsgiver, Geografi } from '../domene/Stilling';
import { Nettressurs, ikkeLastet, Nettstatus } from 'felles/nettressurs';

type Props = {
    arbeidsgiver: Arbeidsgiverforslag | null;
    setArbeidsgiver: (verdi: Arbeidsgiverforslag | null) => void;
    feilmelding?: string;
    setFeilmelding: (verdi: string | undefined) => void;
};

export type EmployerState = {
    suggestions: Arbeidsgiverforslag[];
};

export type Arbeidsgiverforslag = {
    location?: Geografi;
    name: string;
    orgnr?: string;
};

const VelgArbeidsgiver: FunctionComponent<Props> = ({
    arbeidsgiver,
    setArbeidsgiver,
    feilmelding,
    setFeilmelding,
}) => {
    const [input, setInput] = useState<string>('');
    const [alleForslag, setAlleForslag] = useState<Nettressurs<Arbeidsgiverforslag[]>>(
        ikkeLastet()
    );

    useEffect(() => {
        const hentArbeidsgiversForslag = async (navn: string) => {
            setAlleForslag({
                kind: Nettstatus.LasterInn,
            });

            let response: Arbeidsgiverforslag[] | null = null;

            try {
                if (erOrgnummer(navn)) {
                    response = await fetchOrgnrSuggestions(navn);
                } else {
                    response = await fetchEmployerNameCompletionHits(navn);
                }

                setAlleForslag({
                    kind: Nettstatus.Suksess,
                    data: response,
                });
            } catch (e) {
                setAlleForslag({
                    kind: Nettstatus.Feil,
                    error: e,
                });
            }
        };

        if (input.length > 2) {
            hentArbeidsgiversForslag(input);
        }
    }, [input]);

    const onInputChange = (value: string) => {
        setFeilmelding(undefined);
        setInput(value);
    };

    const onInputBlur = (value: string) => {
        if (value.length === 0) {
            setArbeidsgiver(null);
        }
    };

    const onForslagValgt = (valgtForslag: Suggestion) => {
        if (alleForslag.kind === Nettstatus.Suksess) {
            if (valgtForslag) {
                const found = finnArbeidsgiver(alleForslag.data, valgtForslag.value);

                setArbeidsgiver(found || null);
                setInput(capitalizeEmployerName(found ? found.name : null) || '');
            } else {
                setArbeidsgiver(null);
            }
        }
    };

    const feilmeldingTilBruker =
        feilmelding || (alleForslag.kind === Nettstatus.Feil && alleForslag.error.message);

    return (
        <>
            <Label className={css.velgArbeidsgiver} id="velg-arbeidsgiver-label">
                Arbeidsgivers navn eller virksomhetsnummer
            </Label>
            <BodyShort spacing size="small" id="velg-arbeidsgiver-beskrivelse">
                Søk etter virksomheten fra enhetsregisteret
            </BodyShort>
            <Typeahead
                value={input}
                onBlur={onInputBlur}
                onSelect={onForslagValgt}
                onChange={onInputChange}
                suggestions={konverterTilTypeaheadFormat(alleForslag)}
                error={feilmeldingTilBruker || undefined}
                aria-labelledby="velg-arbeidsgiver-label"
                aria-describedby="velg-arbeidsgiver-beskrivelse"
            />
            {arbeidsgiver && (
                <Detail className={css.valgtArbeidsgiver}>
                    {formaterDataFraEnhetsregisteret(arbeidsgiver)}
                </Detail>
            )}
        </>
    );
};

const erOrgnummer = (input: string) => {
    return input.match(/^\s*[0-9][0-9\s]*$/) !== null;
};

const konverterTilTypeaheadFormat = (alleForslag: Nettressurs<Arbeidsgiverforslag[]>) => {
    if (alleForslag.kind === Nettstatus.Suksess) {
        return alleForslag.data.map((f) => ({
            value: f.orgnr || '',
            label: getEmployerSuggestionLabel(f),
        }));
    } else {
        return [];
    }
};

export const formaterDataFraEnhetsregisteret = (
    arbeidsgiver: Arbeidsgiverforslag | Arbeidsgiver
) => {
    const location = arbeidsgiver.location;
    const navn = capitalizeEmployerName(arbeidsgiver.name);
    const virksomhetsnummer = arbeidsgiver.orgnr?.match(/.{1,3}/g)?.join(' ');
    if (!location) return navn;
    return `${navn}, ${location.address}, ${location.postalCode} ${capitalizeLocation(
        location.city
    )}, Virksomhetsnummer: ${virksomhetsnummer}`;
};

export const getEmployerSuggestionLabel = (forslag: Arbeidsgiverforslag) => {
    let commaSeparate: string[] = [];
    if (forslag.location) {
        if (forslag.location.address) {
            commaSeparate = [...commaSeparate, forslag.location.address];
        }
        if (forslag.location.postalCode) {
            commaSeparate = [...commaSeparate, forslag.location.postalCode];
        }
        if (forslag.location.city) {
            commaSeparate = [...commaSeparate, capitalizeLocation(forslag.location.city)];
        }
    }
    if (forslag.orgnr) {
        const groupedOrgNumber = forslag.orgnr.match(/.{1,3}/g)?.join(' ');
        commaSeparate = [...commaSeparate, `Virksomhetsnummer: ${groupedOrgNumber}`];
    }
    return (
        <div className={css.valgITypeahead}>
            <BodyShort>{capitalizeEmployerName(forslag.name)}</BodyShort>
            <Detail>{commaSeparate.join(', ')}</Detail>
        </div>
    );
};

const finnArbeidsgiver = (alleForslag: Arbeidsgiverforslag[], navn: string) =>
    alleForslag.find(
        (forslag: Arbeidsgiverforslag) =>
            forslag.name.toLowerCase() === navn.toLowerCase() ||
            forslag.orgnr === navn.replace(/\s/g, '')
    );

export default VelgArbeidsgiver;
