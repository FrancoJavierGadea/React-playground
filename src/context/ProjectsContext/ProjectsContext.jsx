import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORES } from "../../utils/database";
import { useDatabase } from "../../hooks/useDatabase";
import { getExamples } from "../../utils/github";


const ProjectContext = createContext();

function ProjectProvider({children}) {

    const [projects, setProjects] = useState([]);

    const [currentProject, setCurrentProject] = useState('default');

    const [isProject, setIsProject] = useState(false);

    const [examples, setExamples] = useState([]);
    
    useEffect(() => {
        
        getExamples()
        .then(examples => {

            setExamples(examples);
        });

    }, []);

    const database = useDatabase(STORES.PROJECTS);

    useEffect(() => {
		
		database.getAll()
		.then((projets) => {

			setProjects(projets);
		})

	}, []);


    const addProject = (name, files) => {
 
        if(!name) throw new Error('Ingresa un nombre valido');

        const exist = projects.includes(name);

        if(exist) throw new Error('Ya existe un proyecto con ese nombre');

        database.add({name, files}, name)
		.then(() => {

			console.log('Guardado');

			setCurrentProject(name);

            setIsProject(true);

			setProjects(old => [...old, {name}]);
		});
    }

    const updateProject = async (name, files) => {

        try {
            
            await database.update({name, files}, name);

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
        currentProject,
        setCurrentProject,
        isProject,
        setIsProject,
        examples,
        addProject,
        removeProject,
        getProject,
        updateProject,
    };

    return (<ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>);
}


export function useProjects(){

    return useContext(ProjectContext);
}

export default ProjectProvider;