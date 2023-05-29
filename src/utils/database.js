
export const DATABASE = "react-playground";

export const DATABASE_VERSION = 3;

export const STORES = {
    PROJECTS: "projects",
    TEMPLATES: "templates"
}

export function initDatabase(){

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(DATABASE, DATABASE_VERSION);

        request.onupgradeneeded = () => {

            const db = request.result;

            Object.values(STORES).forEach(storeName => {

                if(!db.objectStoreNames.contains(storeName)){
    
                    console.log('Creating Store');
    
                    db.createObjectStore(storeName, { autoIncrement: true });
                }

                updateDatabase(storeName);
            });
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


export function addItem(storeName, value, key){

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

export function updateItem(storeName, value, key){

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

export function getAllItems(storeName){
    
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

export function getAllItemsKeys(storeName){

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

export function getItem(storeName, key){

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

export function removeItem(storeName, key){

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


//------> update project store to support folders
async function updateDatabase(storeName){

    try {
        const items = await getAllItems(storeName);
        
        console.log(items)

        const keys = await getAllItemsKeys(storeName);

        for (const key of keys) {

            const item = await getItem(storeName, key);

            await updateItem(storeName, {name: key, files: item}, key);
        }

        console.log('update database complete');
    }
    catch (error) {

        console.log('error updating database', error);
    }
}