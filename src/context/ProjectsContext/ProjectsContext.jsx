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
        
            const aux = projects.map(({name, folder = 'Root'}) => {

                return {name, folder};
            });

			setProjects(aux);
		})

	}, []);

    useEffect(() => {

        const folders = new Set();

        folders.add('Root');

        projects.forEach(project => {

            if(project.folder) folders.add(project.folder);
        });

        setFolders([...folders]);

    }, [projects]);


    const addProject = (name, files, folder) => {
 
        if(!name) throw new Error('Ingresa un nombre valido');

        const exist = projects.some(p => p.name === name);

        if(exist) throw new Error('Ya existe un proyecto con ese nombre');

        database.add({name, files, folder}, name)
		.then(() => {

			console.log('Proyecto guardado');

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

    const changeFolder = async (name, newFolder = 'Root') => {

        try {

            const project = await database.get(name);

            project.folder = newFolder;

            await database.update(project, name);

            setProjects(old => {

                const aux = [...old];

                aux.find(p => p.name === name).folder = newFolder;

                return aux;
            });
            
        }
        catch (error) {
            
        }
    }

    const changeProjectName = (name, newName, newFolder) => {

        if(!name || !newName) throw new Error('Ingresa un nombre valido');

        const exist = projects.some(p => p.name === newName);

        if(exist) throw new Error('Ya existe un proyecto con ese nombre');

        (async () => {

            try {
                const project = await database.get(name);

                project.name = newName;

                if(newFolder) project.folder = newFolder;

                await database.add(project, newName);

                await database.remove(name);

                setProjects(old => {

                    const aux = [...old];
    
                    const project = aux.find(p => p.name === name);

                    project.name = newName;

                    if(newFolder) project.folder = newFolder;
    
                    return aux;
                });
            }
            catch (error) {
                
            }
        })();
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
        folders,
        changeFolder,
        changeProjectName
    };

    return (<ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>);
}


export function useProjects(){

    return useContext(ProjectContext);
}

export default ProjectProvider;