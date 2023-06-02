import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORES } from "../../utils/database";
import { useProjects } from "../ProjectsContext/ProjectsContext";
import { useDatabase } from "../../hooks/useDatabase";
import { GITHUB } from "../../utils/github";


const TemplatesContext = createContext();


export function TemplatesProvider({children}){

    const [templates, setTemplates] = useState([]);

    const [githubTemplates, setGithubTemplates] = useState([]);

    useEffect(() => {
        
        GITHUB.getTemplates()
        .then(githubTemplates => {

            setGithubTemplates(githubTemplates);
        });

    }, []);

    const database = useDatabase(STORES.TEMPLATES);

    const {setCurrentProject, setIsProject} = useProjects();

    useEffect(() => {
		
		database.getAllKeys()
		.then(keys => {

			setTemplates(keys);
		})

	}, []);


    const addTemplate = (name, files) => {
 
        if(!name) throw new Error('Ingresa un nombre valido');

        const exist = templates.includes(name);

        if(exist) throw new Error('Ya existe un template con ese nombre');

        database.add({name, files}, name)
		.then(() => {

			console.log('Template Guardado');

            setCurrentProject({name});

            setIsProject(false);

			setTemplates(old => [...old, name]);
		});
    }

    const updateTemplate = (name, files) => {

        database.update({name, files}, name)
		.then(() => {

			console.log('Template Guardado');
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

    const getTemplates = () => {

        return database.getAll();
    }

    const changeTemplateName = (name, newName) => {

        if(!name || !newName) throw new Error('Ingresa un nombre valido');

        const exist = templates.includes(newName);

        if(exist) throw new Error('Ya existe un template con ese nombre');

        (async () => {

            try {
                const template = await database.get(name);

                template.name = newName;

                await database.add(template, newName);

                await database.remove(name);

                setTemplates(old => {

                    const aux = old.filter(t => t !== name);

                    aux.push(newName);

                    return aux;
                });
            }
            catch (error) {
                
            }
        })();
    }

    const value = {
        templates,
        githubTemplates,
        addTemplate,
        getTemplate,
        getTemplates,
        removeTemplate,
        updateTemplate,
        changeTemplateName
    }

    return (<TemplatesContext.Provider value={value}>{children}</TemplatesContext.Provider>)
}


export function useTemplates(){

    return useContext(TemplatesContext);
}