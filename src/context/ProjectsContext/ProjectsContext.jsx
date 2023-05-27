import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORES, useDatabase } from "../../utils/database";


const ProjectContext = createContext();

function ProjectProvider({children}) {

    const [projects, setProjects] = useState([]);

    const [currentProject, setCurrentProject] = useState('default');

    const [isProject, setIsProject] = useState(false);

    const database = useDatabase(STORES.PROJECTS);

    useEffect(() => {
		
		database.getAllKeys()
		.then(keys => {

			setProjects(keys);
		})

	}, []);


    const addProject = (name, project) => {
 
        if(!name) throw new Error('Ingresa un nombre valido');

        const exist = projects.includes(name);

        if(exist) throw new Error('Ya existe un proyecto con ese nombre');

        database.add(project, name)
		.then(() => {

			console.log('Guardado');

			setCurrentProject(name);

            setIsProject(true);

			setProjects(old => [...old, name]);
		});
    }

    const updateProject = async (name, project) => {

        try {
            
            await database.update(project, name);

            console.log('Proyecto guardado');
        }
        catch (error) {
            
        }	
    }

    const removeProject = (name) => {

        database.remove(name)
        .then(() => {

            setProjects(old => old.filter(v => v !== name));
        });
    }

    const getProject = (name) => {

        return database.get(name);
    }

    const value = {
        projects,
        addProject,
        removeProject,
        getProject,
        updateProject,
        currentProject,
        setCurrentProject,
        isProject,
        setIsProject
    };

    return (<ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>);
}


export function useProjects(){

    return useContext(ProjectContext);
}

export default ProjectProvider;