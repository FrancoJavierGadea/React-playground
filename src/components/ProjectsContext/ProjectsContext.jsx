import { createContext, useContext, useEffect, useState } from "react";
import { useDatabase } from "../../utils/database";


const ProjectContext = createContext();

function ProjectProvider({children}) {

    const [projects, setProjects] = useState([]);

    const [currentProject, setCurrentProject] = useState('default');

    const database = useDatabase();

    useEffect(() => {
		
		database.getAllKeys()
		.then(keys => {

			setProjects(keys);
		})

	}, []);


    const addProject = (name, project) => {

        database.add(project, name)
		.then(() => {

			console.log('Guardado');

			setCurrentProject(name);

			setProjects(old => [...old, name]);
		});
    }

    const updateProject = (name, project) => {

        database.update(project, name)
		.then(() => {

			console.log('Guardado');
		});
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
        setCurrentProject
    };

    return (<ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>);
}


export function useProjects(){

    return useContext(ProjectContext);
}

export default ProjectProvider;