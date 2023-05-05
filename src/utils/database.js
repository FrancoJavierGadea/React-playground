import { useEffect } from "react";
import { useState } from "react";

export const DATABASE = "react-playground";

export const STORE = "projects";

export function initDatabase(){

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(DATABASE);

        request.onupgradeneeded = () => {

            const db = request.result;

            if(!db.objectStoreNames.contains(STORE)){

                console.log('Creating Store');

                db.createObjectStore(STORE, { autoIncrement: true });
            }
        }

        request.onsuccess = () => {

            const db = request.result;

            resolve(db);
        }

        request.onerror = () => {

            reject(new Error("Error to init the database"));
        }
    });
}

export function openDatabase(){

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(DATABASE);

        request.onsuccess = () => {

            const db = request.result;
            
            resolve(db);
        }

        request.onerror = () => {

            reject(new Error("Error to open the database"));
        }
    });
}


export function useDatabase(){

    useEffect(() => {
        
        initDatabase()
        .then(db => {


        })
        .catch(err => {

            console.log(err);
        });

    }, []);

    
    const add = (value, key) => {

        return new Promise((resolve, reject) => {

            openDatabase()
            .then(database => {

                const transaction = database.transaction(STORE, 'readwrite');
    
                const store = transaction.objectStore(STORE);
    
                store.add(value, key);

                transaction.oncomplete = () => {
    
                    resolve();
                }
    
                transaction.onerror = () => {
                    
                    reject(new Error("Error to complete transaction"));
                }
            })
            .catch(err => {

                reject(err);
            })
        });   
    }

    const update = (value, key) => {

        return new Promise((resolve, reject) => {

            openDatabase()
            .then(database => {

                const transaction = database.transaction(STORE, 'readwrite');
    
                const store = transaction.objectStore(STORE);
    
                store.put(value, key);

                transaction.oncomplete = () => {
    
                    resolve();
                }
    
                transaction.onerror = () => {
                    
                    reject(new Error("Error to complete transaction"));
                }
            })
            .catch(err => {

                reject(err);
            })
        });   
    }

    const getAll = () => {


        return new Promise((resolve, reject) => {

            openDatabase()
            .then(database => {

                const transaction = database.transaction(STORE, 'readwrite');
    
                const store = transaction.objectStore(STORE);
    
                const values = store.getAll();
    
                transaction.oncomplete = () => {
    
                    resolve(values.result);
                }
    
                transaction.onerror = () => {
                    
                    reject(new Error("Error to complete transaction"));
                }
            })
            .catch(err => {

                reject(err);
            })

        });
    }

    const getAllKeys = () => {

        return new Promise((resolve, reject) => {

            openDatabase()
            .then(database => {

                const transaction = database.transaction(STORE, 'readwrite');
    
                const store = transaction.objectStore(STORE);
    
                const values = store.getAllKeys();
    
                transaction.oncomplete = () => {
    
                    resolve(values.result);
                }
    
                transaction.onerror = () => {
                    
                    reject(new Error("Error to complete transaction"));
                }
            })
            .catch(err => {

                reject(err);
            })

        });
    }

    const get = (key) => {

        return new Promise((resolve, reject) => {

            openDatabase()
            .then(database => {

                const transaction = database.transaction(STORE, 'readwrite');
    
                const store = transaction.objectStore(STORE);
    
                const values = store.get(key);
    
                transaction.oncomplete = () => {
    
                    resolve(values.result);
                }
    
                transaction.onerror = () => {
                    
                    reject(new Error("Error to complete transaction"));
                }
            })
            .catch(err => {

                reject(err);
            })

        });
    }

    const remove = (key) => {

        return new Promise((resolve, reject) => {

            openDatabase()
            .then(database => {

                const transaction = database.transaction(STORE, 'readwrite');
    
                const store = transaction.objectStore(STORE);
    
                const values = store.delete(key);
    
                transaction.oncomplete = () => {
    
                    resolve(values.result);
                }
    
                transaction.onerror = () => {
                    
                    reject(new Error("Error to complete transaction"));
                }
            })
            .catch(err => {

                reject(err);
            })

        });
    }

    return {add, getAll, getAllKeys, update, get, remove, name: DATABASE, stores: [STORE]};
}