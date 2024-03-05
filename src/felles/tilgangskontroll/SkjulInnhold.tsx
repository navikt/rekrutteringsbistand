import * as React from 'react';
import { ApplikasjonContext } from '../ApplikasjonContext';
import { erIkkeProd } from '../miljø';
import { Rolle } from './TilgangskontrollForInnhold';

export interface ISkjulInnhold {
    kreverRoller: Rolle[];
    children: React.ReactNode;
}

const SkjulInnhold: React.FC<ISkjulInnhold> = ({ kreverRoller, children }) => {
    const { roller } = React.useContext(ApplikasjonContext);

    //todo
    const aktivTilgangskontroll = erIkkeProd;

    const harTilgang = kreverRoller.some((r) => {
        return roller?.includes(r);
    });

    if (!aktivTilgangskontroll) {
        return <>{children}</>;
    }

    if (harTilgang) {
        return <>{children}</>;
    }
    return null;
};

export default SkjulInnhold;
