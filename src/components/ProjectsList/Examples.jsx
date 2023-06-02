import ListItem from "./ListItem";
import { downloadExample, getExamples } from "../../utils/github";
import { useFiles } from "../../context/FilesContext/FilesContext";
import { useProjects } from "../../context/ProjectsContext/ProjectsContext";

function Examples({onSelect = () => {}}) {

    const {changeFiles} = useFiles();

    const {setCurrentProject, setIsProject, examples} = useProjects();

    
    const selectExample = (name) => {

        downloadExample(name)
        .then(example => {

            setCurrentProject({name});
            
            setIsProject(false);

            changeFiles(example);

            onSelect();
        });
    }

    return (<div style={{padding: '0 10px'}}>
        {
            examples.map(({name, source}, i) => {

                return <ListItem name={name} onClick={() => selectExample(name)} key={`example-${i}`} github={source}/>
            })
        }
    </div>);
}

export default Examples;