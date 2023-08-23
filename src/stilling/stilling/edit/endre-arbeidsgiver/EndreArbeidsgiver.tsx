import { BodyShort, Button, Label, TextField } from '@navikt/ds-react';
import Stilling from 'felles/domene/stilling/Stilling';
import { useDispatch } from 'react-redux';
import { adjustUrl } from '../../../common/urlUtils';
import { formaterDataFraEnhetsregisteret } from '../../../opprett-ny-stilling/VelgArbeidsgiver';
import {
    SET_EMPLOYER_HOMEPAGE,
    SET_EMPLOYER_NAME,
    SET_EMPLOYERDESCRIPTION,
    SET_FACEBOOK_PAGE,
    SET_LINKEDIN_PAGE,
    SET_TWITTER_ADDRESS,
} from '../../adDataReducer';
import RichTextEditor from '../richTextEditor/RichTextEditor';
import Skjemalabel from '../skjemaetikett/Skjemalabel';

type Props = {
    stilling: Stilling;
};

const EndreArbeidsgiver = ({ stilling }: Props) => {
    const { employerhomepage, facebookpage, linkedinpage, twitteraddress } = stilling.properties;

    const dispatch = useDispatch();

    const setEmployerName = (employername: string) =>
        dispatch({ type: SET_EMPLOYER_NAME, employername });
    const setEmployerHomepage = (employerhomepage: string) =>
        dispatch({ type: SET_EMPLOYER_HOMEPAGE, employerhomepage });
    const setEmployerDescription = (employerdescription: string) =>
        dispatch({ type: SET_EMPLOYERDESCRIPTION, employerdescription });
    const setFacebookpage = (facebookpage: string) =>
        dispatch({ type: SET_FACEBOOK_PAGE, facebookpage });
    const setLinkedinpage = (linkedinpage: string) =>
        dispatch({ type: SET_LINKEDIN_PAGE, linkedinpage });
    const setTwitteraddress = (twitteraddress: string) =>
        dispatch({ type: SET_TWITTER_ADDRESS, twitteraddress });

    const completeHomepageLink = () => {
        if (employerhomepage && employerhomepage !== '') {
            setEmployerHomepage(adjustUrl(employerhomepage));
        }
    };

    const completeFacebookLink = () => {
        if (facebookpage && facebookpage !== '') {
            setFacebookpage(adjustUrl(facebookpage));
        }
    };

    const completeLinkedinLink = () => {
        if (linkedinpage && linkedinpage !== '') {
            setLinkedinpage(adjustUrl(linkedinpage));
        }
    };

    const completeTwitterLink = () => {
        if (twitteraddress && twitteraddress !== '') {
            setTwitteraddress(adjustTwitterLink(twitteraddress));
        }
    };

    const hideOnlineAddresses =
        facebookpage === undefined && linkedinpage === undefined && twitteraddress === undefined;

    return (
        <>
            {stilling.employer && (
                <div>
                    <Label>Informasjon fra enhetsregisteret</Label>
                    <BodyShort size="small" spacing>
                        {formaterDataFraEnhetsregisteret(stilling.employer)}
                    </BodyShort>
                </div>
            )}

            <TextField
                id="endre-stilling-navnet-bedriften-bruker"
                label={
                    <Skjemalabel
                        inputId="endre-stilling-navnet-bedriften-bruker"
                        beskrivelse="Navnet som vises i stillingsannonsen"
                    >
                        Visningsnavn for bedriften
                    </Skjemalabel>
                }
                aria-describedby="endre-stilling-navnet-bedriften-bruker-beskrivelse"
                value={stilling.properties.employer || stilling.businessName || ''}
                onChange={(e) => setEmployerName(e.target.value)}
            />
            <div>
                <Skjemalabel
                    inputId="endre-stilling-kort-om-bedriften"
                    beskrivelse="Skriv noen linjer om bedriften"
                >
                    Kort om bedriften
                </Skjemalabel>
                <RichTextEditor
                    id="endre-stilling-kort-om-bedriften"
                    aria-describedby="endre-stilling-kort-om-bedriften-beskrivelse"
                    text={stilling.properties.employerdescription || ''}
                    onChange={(desc: string) => setEmployerDescription(desc)}
                />
            </div>

            <TextField
                label={
                    <Skjemalabel beskrivelse="For eksempel: www.firmanavn.no">
                        Bedriftens nettsted
                    </Skjemalabel>
                }
                value={employerhomepage || ''}
                onBlur={completeHomepageLink}
                onChange={(e) => setEmployerHomepage(e.target.value)}
            />
            {hideOnlineAddresses ? (
                <Button variant="tertiary" onClick={() => setFacebookpage('')}>
                    + Legg til adresser for Facebook, LinkedIn og Twitter
                </Button>
            ) : (
                <div>
                    <TextField
                        label={
                            <Skjemalabel beskrivelse="For eksempel: facebook.com/firmanavn">
                                Bedriftens side på Facebook
                            </Skjemalabel>
                        }
                        value={facebookpage || ''}
                        onBlur={completeFacebookLink}
                        onChange={(e) => {
                            setFacebookpage(e.target.value);
                        }}
                    />

                    <TextField
                        label={
                            <Skjemalabel beskrivelse="For eksempel: linkedin.com/company/firmanavn">
                                Bedriftens side på LinkedIn
                            </Skjemalabel>
                        }
                        value={linkedinpage || ''}
                        onBlur={completeLinkedinLink}
                        onChange={(e) => {
                            setLinkedinpage(e.target.value);
                        }}
                    />

                    <TextField
                        label={
                            <Skjemalabel beskrivelse="For eksempel: @firmanavn">
                                Bedriftens Twitteradresse
                            </Skjemalabel>
                        }
                        value={twitteraddress || ''}
                        onBlur={completeTwitterLink}
                        onChange={(e) => {
                            setTwitteraddress(e.target.value);
                        }}
                    />
                </div>
            )}
        </>
    );
};

function adjustTwitterLink(url: string) {
    if (url.startsWith('@')) {
        return `https://twitter.com/${url}`;
    } else if (!url.startsWith('http')) {
        return `https://${url}`;
    }
    return url;
}

export default EndreArbeidsgiver;
