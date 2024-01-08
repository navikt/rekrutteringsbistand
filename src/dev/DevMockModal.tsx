import { Button, Modal } from '@navikt/ds-react';
import * as React from 'react';
import { useRef } from 'react';
import { forespørselOmDelingAvCvMock } from '../../mock/foresporsel-om-deling-av-cv-api/mock';
import { kandidatApiMock } from '../../mock/kandidat-api/mock';
import { kandidatsøkMock } from '../../mock/kandidatsok-proxy/mock';
import { innloggetBrukerMock } from '../../mock/meg/mock';
import { modiaContextHolderMock } from '../../mock/modiacontextholder/mock';
import { presenterteKandidaterApiMock } from '../../mock/presenterte-kandidater-api/mock';
import { mswWorker } from '../../mock/setup';
import { smsApiMock } from '../../mock/sms-api/mock';
import { statistikkApiMock } from '../../mock/statistikk-api/mock';
import { stillingApiMock } from '../../mock/stilling-api/mock';
import { stillingssøkMock } from '../../mock/stillingssok-proxy/mock';
import { synlighetApiMock } from '../../mock/synlighet-api/mock';
import DevMockApi from './DevMockApi';
export interface IDevMockModal {
    children?: React.ReactNode | undefined;
}

const mockConfig = [
    {
        navn: 'Mock modia',
        mock: [],
    },
    {
        navn: 'Innlogget bruker',
        mock: innloggetBrukerMock,
    },
    {
        navn: 'Kaniddat',
        mock: kandidatApiMock,
    },
    {
        navn: 'Statistikk',
        mock: statistikkApiMock,
    },

    {
        navn: 'Forespørsel om deling av CV',
        mock: forespørselOmDelingAvCvMock,
    },

    {
        navn: 'Stilling',
        mock: stillingApiMock,
    },
    {
        navn: 'Presenter kandidat',
        mock: presenterteKandidaterApiMock,
    },
    {
        navn: 'SMS',
        mock: smsApiMock,
    },
    {
        navn: 'Synlighet',
        mock: synlighetApiMock,
    },
    {
        navn: 'Modia context',
        mock: modiaContextHolderMock,
    },
    {
        navn: 'Kandidat søk ES',
        mock: kandidatsøkMock,
    },
    {
        navn: 'Stillings søk ES',
        mock: stillingssøkMock,
    },
];

const DevMockModal: React.FC<IDevMockModal> = ({ children }) => {
    const ref = useRef<HTMLDialogElement>(null);

    const setupMocking = mockConfig.flatMap((e) => {
        const aktiv = localStorage.getItem(e.navn) === 'true';
        return {
            ...e,
            aktiv,
        };
    });

    const [mocks, setMocks] = React.useState(setupMocking);

    const setAktiv = (navn: string, aktiv: boolean) => {
        setMocks((prev) => {
            const index = prev.findIndex((e) => e.navn === navn);
            const newMocks = [...prev];
            newMocks[index] = {
                ...newMocks[index],
                aktiv,
            };
            return newMocks;
        });
    };

    React.useEffect(() => {
        const activeMocks = mocks.flatMap((e) => {
            return e.aktiv ? e.mock : [];
        });

        // const inaktiveMocks = mocks.flatMap((e) => {
        //     return e.aktiv ? [] : e.mock;
        // });

        mswWorker.use(...activeMocks);
    }, [mocks]);

    return (
        <div className="py-16">
            <Button type="button" variant="tertiary" onClick={() => ref.current?.showModal()}>
                Mocks
            </Button>

            <Modal width="medium" ref={ref} header={{ heading: 'Mocks' }}>
                <Modal.Body>
                    <div>
                        {mocks.map((e, index) => (
                            <DevMockApi
                                key={index}
                                navn={e.navn}
                                mockApi={e.mock}
                                setAktiv={setAktiv}
                            />
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" variant="tertiary" onClick={() => ref.current?.close()}>
                        Lukk
                    </Button>
                </Modal.Footer>
            </Modal>

            {children}
        </div>
    );
};

export default DevMockModal;
