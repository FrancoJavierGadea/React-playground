import { useEffect } from "react";
import { useState } from "react";

export const DATABASE = "react-playground";

export const STORE = "projects";

export const STORES = {
    PROJECTS: "projects"
}

export function initDatabase(storeName){

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(DATABASE);

        request.onupgradeneeded = () => {

            const db = request.result;

            if(!db.objectStoreNames.contains(storeName)){

                console.log('Creating Store');

                db.createObjectStore(storeName, { autoIncrement: true });
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


export function useDatabase(storeName){

    if(!storeName) throw new Error('store name not exist');

    useEffect(() => {
        
        initDatabase(storeName)
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

                const transaction = database.transaction(storeName, 'readwrite');
    
                const store = transaction.objectStore(storeName);
    
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

                const transaction = database.transaction(storeName, 'readwrite');
    
                const store = transaction.objectStore(storeName);
    
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

                const transaction = database.transaction(storeName, 'readwrite');
    
                const store = transaction.objectStore(storeName);
    
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

                const transaction = database.transaction(storeName, 'readwrite');
    
                const store = transaction.objectStore(storeName);
    
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

                const transaction = database.transaction(storeName, 'readwrite');
    
                const store = transaction.objectStore(storeName);
    
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

                const transaction = database.transaction(storeName, 'readwrite');
    
                const store = transaction.objectStore(storeName);
    
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