import { Heading, Link, Panel } from '@navikt/ds-react';
import parse from 'html-react-parser';

import Stilling from 'felles/domene/stilling/Stilling';
import { isValidUrl } from '../../../common/urlUtils';
import fellesCss from '../Forhåndsvisning.module.css';
import css from './OmBedriften.module.css';

type Props = { stilling: Stilling };

const OmBedriften = ({ stilling }: Props) => {
    const { businessName, properties, employer } = stilling;

    return (
        <Panel className={fellesCss.infoboks}>
            <Heading spacing level="3" size="small">
                Om bedriften
            </Heading>
            <dl className={fellesCss.definisjonsliste}>
                {(properties.employer || businessName) && (
                    <>
                        <dt>Bedriftens navn:</dt>
                        <dd>{properties.employer || businessName}</dd>
                    </>
                )}
                {employer?.orgnr && (
                    <>
                        <dt>Virksomhetsnr:</dt>
                        <dd>{employer?.orgnr}</dd>
                    </>
                )}
                {properties.employerhomepage && isValidUrl(properties.employerhomepage) && (
                    <>
                        <dt>Nettsted:</dt>
                        <dd>
                            <Link
                                href={properties.employerhomepage}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {properties.employerhomepage}
                            </Link>
                        </dd>
                    </>
                )}
                {properties.employerhomepage && !isValidUrl(properties.employerhomepage) && (
                    <>
                        <dt>Nettsted:</dt>
                        <dd>{properties.employerhomepage}</dd>
                    </>
                )}
                {properties.linkedinpage && isValidUrl(properties.linkedinpage) && (
                    <>
                        <dt>LinkedIn:</dt>
                        <dd>
                            <a
                                className="lenke"
                                href={properties.linkedinpage}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {properties.linkedinpage}
                            </a>
                        </dd>
                    </>
                )}
                {properties.linkedinpage && !isValidUrl(properties.linkedinpage) && (
                    <>
                        <dt>LinkedIn:</dt>
                        <dd>{properties.linkedinpage}</dd>
                    </>
                )}
                {properties.twitteraddress && isValidUrl(properties.twitteraddress) && (
                    <>
                        <dt>Twitter:</dt>
                        <dd>
                            <a
                                className="lenke"
                                href={properties.twitteraddress}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {properties.twitteraddress}
                            </a>
                        </dd>
                    </>
                )}
                {properties.twitteraddress && !isValidUrl(properties.twitteraddress) && (
                    <>
                        <dt>Twitter:</dt>
                        <dd>{properties.twitteraddress}</dd>
                    </>
                )}
                {properties.facebookpage && isValidUrl(properties.facebookpage) && (
                    <>
                        <dt>Facebook:</dt>
                        <dd>
                            <a
                                className="lenke"
                                href={properties.facebookpage}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {properties.facebookpage}
                            </a>
                        </dd>
                    </>
                )}
                {properties.facebookpage && !isValidUrl(properties.facebookpage) && (
                    <>
                        <dt>Facebook:</dt>
                        <dd>{properties.facebookpage}</dd>
                    </>
                )}
            </dl>
            {properties.employerdescription && (
                <div className={css.beskrivelse}>{parse(properties.employerdescription || '')}</div>
            )}
        </Panel>
    );
};

export default OmBedriften;
