import { Heading, Panel } from '@navikt/ds-react';
import { formatISOString, isValidISOString } from '../../../utils/datoUtils';
import { getWorkLocationsAsString } from '../../../common/getWorkLocation';
import { Geografi, Properties } from '../../../domene/Stilling';
import css from '../Forhåndsvisning.module.css';

type Props = {
    properties: Properties;
    locationList: Geografi[];
};

const OmStillingen = ({ properties, locationList }: Props) => {
    const {
        jobtitle,
        engagementtype,
        extent,
        positioncount,
        sector,
        workday,
        workhours,
        jobarrangement,
        starttime,
    } = properties;

    return (
        <Panel className={css.infoboks}>
            <Heading spacing level="3" size="small">
                Om stillingen
            </Heading>
            <dl className={css.definisjonsliste}>
                {jobtitle && (
                    <>
                        <dt key="dt">Stillingstittel:</dt>
                        <dd key="dd">{jobtitle}</dd>
                    </>
                )}
                {locationList && locationList.length > 0 && (
                    <>
                        {' '}
                        <dt key="dt">Arbeidssted:</dt>
                        <dd key="dd">{getWorkLocationsAsString(locationList)}</dd>
                    </>
                )}
                {engagementtype && (
                    <>
                        <dt key="dt">Ansettelsesform:</dt>
                        <dd key="dd">{engagementtype}</dd>
                    </>
                )}
                {extent && (
                    <>
                        <dt key="dt">Heltid/deltid:</dt>
                        <dd key="dd">{extent}</dd>
                    </>
                )}
                {positioncount && (
                    <>
                        <dt key="dt">Antall stillinger:</dt>
                        <dd key="dd">{positioncount}</dd>
                    </>
                )}
                {sector && (
                    <>
                        <dt key="dt">Sektor:</dt>
                        <dd key="dd">{sector}</dd>
                    </>
                )}
                {workday && (
                    <>
                        <dt key="dt">Arbeidsdager:</dt>
                        <dd key="dd">{parseWorktime(workday)}</dd>
                    </>
                )}
                {workhours && (
                    <>
                        <dt key="dt">Arbeidstid:</dt>
                        <dd key="dd">{parseWorktime(workhours)}</dd>
                    </>
                )}
                {jobarrangement && (
                    <>
                        <dt key="dt">Arb.tidsordning:</dt>
                        <dd key="dd">{jobarrangement}</dd>
                    </>
                )}
                {starttime && (
                    <>
                        <dt key="dt">Oppstart:</dt>
                        <dd key="dd">
                            {isValidISOString(starttime)
                                ? formatISOString(starttime, 'DD.MM.YYYY')
                                : starttime}
                        </dd>
                    </>
                )}
            </dl>
        </Panel>
    );
};

const parseWorktime = (worktime: string) => {
    // We need this check in case of old workhour/-day property values, formatted like 'Opt1 Opt2'
    let arrayString = '';
    try {
        const jsonArray = JSON.parse(worktime);

        for (let i = 0; i < jsonArray.length; i++) {
            arrayString += `${jsonArray[i]} `;
        }
    } catch (e) {
        arrayString = worktime;
    }

    return arrayString;
};

export default OmStillingen;
