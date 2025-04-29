import { Geografi } from './Stilling';

/* Denne typen er tullete, for responsen vi får fra enhetsregistersøket
   er annerledes. Vi kan fjerne mappingen og bruke responstypen direkte. */
export type Enhetsregistertreff = {
    location?: Geografi;
    name: string;
    orgnr?: string;
    parentOrgnr?: string;
    orgform?: string;
};
