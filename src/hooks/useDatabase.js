import { useEffect } from "react";
import { DATABASE, STORES, addItem, getAllItems, getAllItemsKeys, getItem, initDatabase, removeItem, updateItem } from "../utils/database";


export function useDatabase(storeName){

    if(!storeName) throw new Error('store name not exist');

    useEffect(() => {

        initDatabase()
        .then(db => {
            
        })
        .catch(err => {

            console.log(err);
        });

    }, []);

    
    const add = (value, key) => {

        return addItem(storeName, value, key);     
    }

    const update = (value, key) => {

        return updateItem(storeName, value, key);
    }

    const getAll = () => {

        return getAllItems(storeName);
    }

    const getAllKeys = () => {

        return getAllItemsKeys(storeName);
    }

    const get = (key) => {

        return getItem(storeName, key);
    }

    const remove = (key) => {

        return removeItem(storeName, key);
    }

    return {add, getAll, getAllKeys, update, get, remove, name: DATABASE, stores: STORES};
}