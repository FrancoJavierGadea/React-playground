import { createContext, useContext, useEffect, useRef, useState } from "react";
import EditorDefaultState from "../../assets/EditorDefaultState.json";
import { getFileName } from "../../utils/files";

const FilesContext = createContext();

function FilesProvider({children}){

    const filesRef = useRef(EditorDefaultState);

    const [files, setFiles] = useState(EditorDefaultState);

    const [currentFile, setCurrentFile] = useState('/App.js');

    useEffect(() => {

        filesRef.current = files;
        
    }, [files]);


    const changeFiles = (files) => {

        setFiles(files);
    }

    const updateFile = (fileName, value) => {

        setFiles(old => {

			const aux = {...old};

			aux[fileName].value = value;

			return aux;
		});
    }

    const addFile = (fileName, file) => {

        const exist = Object.keys(files).some(key => {

            const name = getFileName(key);

            const newFileName = getFileName(fileName);

            return name === newFileName;
        });

        if(exist) throw new Error('Ya existe una archivo con ese nombre');

        setFiles(old => {

			const aux = {...old};

			aux[fileName] = file;

			return aux;
		});
    }

    const removeFile = (fileName) => {

    }

    const value = {
        files,
        filesRef,
        currentFile,
        setCurrentFile,
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