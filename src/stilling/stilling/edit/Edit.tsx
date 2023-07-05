import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Accordion, Alert, Button, CopyButton } from '@navikt/ds-react';
import { NewspaperIcon } from '@navikt/aksel-icons';
import classNames from 'classnames';

import { hentAnnonselenke, stillingErPublisert } from '../adUtils';
import { RESET_VALIDATION_ERROR } from '../adValidationReducer';
import { State } from '../../redux/store';
import HvordanSendeSøknad from './hvordan-sende-søknad/HvordanSendeSøknad';
import Kontaktinformasjon from './kontaktinformasjon/Kontaktinformasjon';
import EditHeader from './header/EditHeader';
import EksternStillingAdvarsel from '../forhåndsvisning/header/EksternStillingAdvarsel';
import EndreArbeidsgiver from './endre-arbeidsgiver/EndreArbeidsgiver';
import OmStillingen from './om-stillingen/OmStillingen';
import Arbeidssted from './arbeidssted/Arbeidssted';
import PraktiskeOpplysninger from './praktiske-opplysninger/PraktiskeOpplysninger';
import RegistrerInkluderingsmuligheter from './registrer-inkluderingsmuligheter/DirektemeldtStilling';
import Stilling, { System } from '../../domene/Stilling';
import Stillingsheader from '../header/Stillingsheader';
import Seksjon from './seksjon/Seksjon';

import css from './Edit.module.css';
import { Nettressurs } from 'felles/nettressurs';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';

type Props = {
    onPreviewAdClick: () => void;
    kandidatliste: Nettressurs<Kandidatliste>;

    resetValidation: () => void;
    stilling: Stilling;
    hasChanges: boolean;
};

const Edit = ({ stilling, onPreviewAdClick, resetValidation, kandidatliste }: Props) => {
    const stillingenErEkstern = stilling.createdBy !== System.Rekrutteringsbistand;
    const stillingsLenke = hentAnnonselenke(stilling.uuid);

    useEffect(() => {
        return () => {
            resetValidation();
        };
    }, [resetValidation]);

    return (
        <>
            <Stillingsheader kandidatliste={kandidatliste}>
                {stillingErPublisert(stilling) && (
                    <CopyButton
                        copyText={stillingsLenke}
                        text="Kopier annonselenke"
                        size="medium"
                    />
                )}
                {!stillingenErEkstern && (
                    <Button onClick={onPreviewAdClick} size="small" icon={<NewspaperIcon />}>
                        Forhåndsvis stillingen
                    </Button>
                )}
            </Stillingsheader>
            {stillingenErEkstern ? (
                <EksternStillingAdvarsel />
            ) : (
                <Alert className={css.alert} variant="info">
                    Stillingsannonsen kan bli delt med kandidater. Det er viktig at annonseteksten
                    er informativ og lett å forstå.
                </Alert>
            )}
            <div className={css.edit}>
                <Accordion className={classNames(css.venstre, css.accordions)}>
                    <Seksjon tittel="Tittel på annonsen">
                        <EditHeader stilling={stilling} />
                    </Seksjon>
                    <Seksjon spacing tittel="Om bedriften">
                        <EndreArbeidsgiver stilling={stilling} />
                    </Seksjon>
                    <Seksjon
                        påkrevd
                        tittel="Muligheter for å inkludere"
                        beskrivelse="Arbeidsgiver er åpen for å inkludere personer som har behov for tilrettelegging og/eller har nedsatt funksjonsevne."
                    >
                        <RegistrerInkluderingsmuligheter />
                    </Seksjon>
                    <Seksjon spacing tittel="Om stillingen">
                        <OmStillingen stilling={stilling} />
                    </Seksjon>
                </Accordion>
                <Accordion className={classNames(css.høyre, css.accordions)}>
                    <Seksjon spacing tittel="Praktiske opplysninger">
                        <PraktiskeOpplysninger />
                    </Seksjon>
                    <Seksjon spacing tittel="Kontaktinformasjon">
                        <Kontaktinformasjon />
                    </Seksjon>
                    <Seksjon
                        tittel="Hvordan sende søknad?"
                        beskrivelse="Gjelder kun eksternt utlyste stillinger"
                    >
                        <HvordanSendeSøknad />
                    </Seksjon>
                    <Seksjon påkrevd tittel="Arbeidssted">
                        <Arbeidssted />
                    </Seksjon>
                </Accordion>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    resetValidation: () => dispatch({ type: RESET_VALIDATION_ERROR }),
});

const mapStateToProps = (state: State) => ({
    stilling: state.adData,
    hasChanges: state.ad.hasChanges,
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
