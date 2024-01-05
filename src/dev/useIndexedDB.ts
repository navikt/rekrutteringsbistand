import { openDB } from 'idb';
import { useEffect, useState } from 'react';

const indexedDB = 'rekrutteringsbistand';

export async function getAllFromDB(store: string) {
    const db = await openDB(indexedDB, 1, {
        upgrade(db) {
            db.createObjectStore(store);
        },
    });
    return db.getAll(store);
}

export async function getFromDB(store: string, key: string) {
    const db = await openDB(indexedDB, 1, {
        upgrade(db) {
            db.createObjectStore(store);
        },
    });
    return db.get(store, key);
}

export async function setInDB(store: string, key: string, val: any) {
    const db = await openDB(indexedDB, 1, {
        upgrade(db) {
            db.createObjectStore(store);
        },
    });
    return db.put(store, val, key);
}

export function useIndexedDBDevToggle(key: string) {
    const [state, setState] = useState<boolean>(false);

    useEffect(() => {
        getFromDB('mockDev', key).then((value) => setState(!!value));
    }, [key]);

    const toggle = () => {
        setInDB('mockDev', key, !state).then(() => setState(!state));
    };

    return { state, toggle };
}
