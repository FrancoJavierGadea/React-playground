import { createContext, useContext, useEffect, useRef, useState } from "react";
import EditorDefaultState from "../../assets/EditorDefaultState2.json";
import { getFileName } from "../../utils/files";

const FilesContext = createContext();

const defaultFile = ['/reame.md', '/App.js', '/App.jsx', '/App.ts', '/App.tsx', '/index.html'];

function FilesProvider({children}){

    
    const [files, setFiles] = useState(EditorDefaultState);

    const [currentFile, setCurrentFile] = useState( defaultFile.find(fileName => EditorDefaultState[fileName]?.name) );


    const changeFiles = (files) => {

        setFiles(files);

        setCurrentFile( defaultFile.find(fileName => files[fileName]?.name) )
    }

    const updateFile = (fileName, value) => {

        setFiles(old => {

			const aux = {...old};

			aux[fileName].value = value;

			return aux;
		});
    }

    const addFile = (fileName, file) => {

        if(!getFileName(fileName)) throw new Error('Ingresa un nombre valido');

        const exist = Object.keys(files).some(key => {

            const name = getFileName(key);

            const newFileName = getFileName(fileName);

            return name === newFileName;
        });

        if(exist) throw new Error('Ya existe un archivo con ese nombre');

        setFiles(old => {

			const aux = {...old};

			aux[fileName] = file;

			return aux;
		});
    }

    const removeFile = (fileName) => {

        setFiles(old => {

			const aux = {...old};

			delete aux[fileName];

			return aux;
		});
    }

    const updateFileName = (fileName, newName) => {

        setFiles(old => {

			const aux = {...old};

            aux[newName] = aux[fileName];

            aux[newName].name = newName;

			delete aux[fileName];

			return aux;
		});
    }

    const value = {
        files,
        currentFile,
        setCurrentFile,
        updateFileName,
        addFile,
        removeFile,
        changeFiles,
        updateFile
    }

    return (<FilesContext.Provider value={value}>{children}</FilesContext.Provider>);
}


export function useFiles(){

    return useContext(FilesContext);
}

export default FilesProvider;