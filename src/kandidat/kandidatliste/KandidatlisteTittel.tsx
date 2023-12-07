import * as React from 'react';
import { useHentStillingTittel } from '../api/useStilling';

export interface IKandidatlisteTittel {
    stillingid?: string;
    kandidatlisteTittel?: string;
}

const KandidatlisteTittel: React.FC<IKandidatlisteTittel> = ({
    stillingid,
    kandidatlisteTittel,
}) => {
    const tittel = useHentStillingTittel(stillingid);
    return <React.Fragment> {stillingid ? tittel : kandidatlisteTittel}</React.Fragment>;
};

export default KandidatlisteTittel;
