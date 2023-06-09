import { createContext, useContext, useEffect, useRef, useState } from "react";
import DefaultState from "../../assets/DefaultState.json";
import { getFileName } from "../../utils/files";

const getDefaultState = () => JSON.parse(JSON.stringify(DefaultState));

const FilesContext = createContext();

const defaultFile = ['/App.js', '/App.jsx', '/App.ts', '/App.tsx', '/index.html', '/readme.md'];

function FilesProvider({children}){

    const filesRef = useRef();
    
    const [files, setFiles] = useState(getDefaultState());

    const [currentFile, setCurrentFile] = useState( defaultFile.find(fileName => DefaultState[fileName]?.name) );

    useEffect(() => {
        
        filesRef.current = files;

    }, [files]);


    const reset = () => {

        setFiles(getDefaultState());
        setCurrentFile( defaultFile.find(fileName => DefaultState[fileName]?.name) );
    }

    const changeFiles = (files) => {

        //Setting order if not setting
        Object.keys(files).forEach((key, i) => {

            if(!files[key].order){

                files[key].order = i + 1;
            } 
        });

        //console.log(files);

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

        if(fileName === newName) return;

        setFiles(old => {

			const aux = {...old};

            aux[newName] = aux[fileName];

            aux[newName].name = newName;

			delete aux[fileName];

			return aux;
		});

        if(fileName === currentFile){

            setCurrentFile(newName);
        }
    }

    const changeFileOrder = (fileA, fileB) => {

        setFiles(old => {

			const aux = {...old};

            if(fileA.order === fileB.order){

                if(fileA.index > fileB.index){

                    fileA.order++;
                }
                else {

                    fileB.order++;
                }
            }

			aux[fileA.name].order = fileB.order;
            aux[fileB.name].order = fileA.order;

			return aux;
		});
    }

    const value = {
        files,
        currentFile,
        filesRef,
        setCurrentFile,
        updateFileName,
        addFile,
        removeFile,
        changeFiles,
        updateFile,
        changeFileOrder,
        reset
    }

    return (<FilesContext.Provider value={value}>{children}</FilesContext.Provider>);
}


export function useFiles(){

    return useContext(FilesContext);
}

export default FilesProvider;