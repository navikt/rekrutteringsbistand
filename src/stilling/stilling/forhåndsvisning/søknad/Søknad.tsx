import { formatISOString, isValidISOString } from '../../../utils/datoUtils';
import { isValidUrl } from '../../../common/urlUtils';
import { Heading, Panel } from '@navikt/ds-react';
import css from '../Forhåndsvisning.module.css';
import { Kilde, Properties } from '../../../domene/Stilling';

type Props = {
    kilde: Kilde;
    properties: Properties;
};

const Søknad = ({ kilde, properties }: Props) => {
    const sokUrl = byggLenkeTilSøknad(kilde, properties);
    const stillingenErFraFinnNo = kilde === Kilde.Finn;

    return (
        <Panel className={css.infoboks}>
            <Heading spacing level="3" size="small">
                Søknad
            </Heading>
            <dl className={css.definisjonsliste}>
                {properties.applicationdue && (
                    <>
                        <dt>Søknadsfrist:</dt>
                        <dd>
                            {isValidISOString(properties.applicationdue)
                                ? formatISOString(properties.applicationdue, 'DD.MM.YYYY')
                                : properties.applicationdue}
                        </dd>
                    </>
                )}
                {!stillingenErFraFinnNo && properties.applicationemail && (
                    <>
                        <dt>Send søknad til:</dt>
                        <dd>{properties.applicationemail}</dd>
                    </>
                )}

                {sokUrl && isValidUrl(sokUrl) && (
                    <>
                        <dt>Søknadslenke:</dt>
                        <dd>
                            <a
                                href={sokUrl}
                                className="lenke"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {sokUrl}
                            </a>
                        </dd>
                    </>
                )}

                {sokUrl && !isValidUrl(sokUrl) && (
                    <>
                        <dt>Søknadslenke:</dt>
                        <dd>
                            <span>{sokUrl}</span>
                        </dd>
                    </>
                )}
            </dl>
        </Panel>
    );
};

export function byggLenkeTilSøknad(kilde: Kilde, properties: Properties) {
    if (kilde === Kilde.Intern) {
        return properties.sourceurl;
    } else if (properties.applicationurl !== undefined) {
        return properties.applicationurl;
    }

    return properties.sourceurl;
}

export default Søknad;
