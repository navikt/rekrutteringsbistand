import * as React from 'react';
import { useHentStillingTittel } from '../../felles/hooks/useStilling';

export interface IKandidatlisteTittel {
    stillingid?: string | null;
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
