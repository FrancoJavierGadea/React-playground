import { useFiles } from "../../context/FilesContext/FilesContext";
import { useProjects } from "../../context/ProjectsContext/ProjectsContext";
import ListItem from "./ListItem";


function Projects({onSelect = () => {}}) {

    const {changeFiles} = useFiles();

    const {projects, setCurrentProject, getProject, removeProject, setIsProject} = useProjects();

    const selectProject = (name) => {

        getProject(name)
		.then(project => {

            setCurrentProject(name);

            setIsProject(true);

            changeFiles(project);

            onSelect();
		});
    }

    return (<>
        {
            projects.map((name, i) => {

                return <ListItem name={name} onClick={() => selectProject(name)} key={name} 

                    del onDelete={() => removeProject(name)}
                />
            })
        }
    </>);
}

export default Projects;