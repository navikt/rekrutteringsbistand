import { Miljø, getMiljø } from './felles/miljø';

const hentTelementryUrl = () => {
    switch (getMiljø()) {
        case Miljø.DevGcp:
            return 'https://telemetry.ekstern.dev.nav.no/collect';
        case Miljø.ProdGcp:
            return 'https://telemetry.nav.no/collect';
        default:
            return 'http://localhost:12347/collect';
    }
};

const faroConfig = {
    telemetryCollectorURL: hentTelementryUrl(),
    app: {
        name: 'rekrutteringsbistand',
    },
};

export default faroConfig;
