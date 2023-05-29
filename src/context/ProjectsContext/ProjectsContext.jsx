import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORES } from "../../utils/database";
import { useDatabase } from "../../hooks/useDatabase";
import { getExamples } from "../../utils/github";


const ProjectContext = createContext();

function ProjectProvider({children}) {

    const [projects, setProjects] = useState([]);

    const [folders, setFolders] = useState([]);

    const [currentProject, setCurrentProject] = useState({name: 'default'});

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
		.then((projects) => {
        
            const aux = projects.map(({name, folder}) => {

                return {name, folder};
            });

			setProjects(aux);
		})

	}, []);

    useEffect(() => {

        const folders = new Set();

        projects.forEach(project => {

            folders.add(project.folder);
        });

        console.log('Folders', folders);

        setFolders([...folders].sort().reverse());

    }, [projects]);


    const addProject = (name, files, folder) => {
 
        if(!name) throw new Error('Ingresa un nombre valido');

        const exist = projects.some(p => p.name === name);

        if(exist) throw new Error('Ya existe un proyecto con ese nombre');

        database.add({name, files, folder}, name)
		.then(() => {

			console.log('Guardado');

			setCurrentProject({name, folder});

            setIsProject(true);

			setProjects(old => [...old, {name, folder}]);
		});
    }

    const updateProject = async (name, files, folder) => {

        try {
            
            await database.update({name, files, folder}, name);

            console.log('Proyecto guardado');
        }
        catch (error) {
            
        }	
    }

    const removeProject = (name) => {

        database.remove(name)
        .then(() => {

            setProjects(old => old.filter(p => p.name !== name));
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
        folders
    };

    return (<ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>);
}


export function useProjects(){

    return useContext(ProjectContext);
}

export default ProjectProvider;