import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORES, useDatabase } from "../../utils/database";
import { useProjects } from "../ProjectsContext/ProjectsContext";


const TemplatesContext = createContext();


export function TemplatesProvider({children}){

    const [templates, setTemplates] = useState([]);

    const database = useDatabase(STORES.TEMPLATES);

    const {setCurrentProject, setIsProject} = useProjects();

    useEffect(() => {
		
		database.getAllKeys()
		.then(keys => {

			setTemplates(keys);
		})

	}, []);


    const addTemplate = (name, template) => {
 
        if(!name) throw new Error('Ingresa un nombre valido');

        const exist = templates.includes(name);

        if(exist) throw new Error('Ya existe un template con ese nombre');

        database.add(template, name)
		.then(() => {

			console.log('Template Guardado');

            setCurrentProject(name);

            setIsProject(false);

			setTemplates(old => [...old, name]);
		});
    }

    const updateTemplate = (name, template) => {

        database.update(template, name)
		.then(() => {

			console.log('Guardado');
		});
    }

    const removeTemplate = (name) => {

        database.remove(name)
        .then(() => {

            setTemplates(old => old.filter(v => v !== name));
        });
    }

    const getTemplate = (name) => {

        return database.get(name);
    }

    const value = {
        templates,
        addTemplate,
        getTemplate,
        removeTemplate,
        updateTemplate,
    }

    return (<TemplatesContext.Provider value={value}>{children}</TemplatesContext.Provider>)
}


export function useTemplates(){

    return useContext(TemplatesContext);
}