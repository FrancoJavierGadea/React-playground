import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { downloadExample, getExamples } from "../../utils/github";
import { useFiles } from "../../context/FilesContext/FilesContext";
import { useProjects } from "../../context/ProjectsContext/ProjectsContext";

function Examples({onLoad = () => {}, onSelect = () => {}}) {

    const {changeFiles} = useFiles();

    const {setCurrentProject, setIsProject} = useProjects();

    const [examples, setExamples] = useState([]);
    
    useEffect(() => {
        
        getExamples()
        .then(examples => {

            setExamples(examples);

            onLoad();
        });

    }, []);

    const selectExample = (name) => {

        downloadExample(name)
        .then(example => {

            setCurrentProject(name);
            
            setIsProject(false);

            changeFiles(example);

            onSelect();
        });
    }

    return (<>
        {
            examples.map(({name, source}, i) => {

                return <ListItem name={name} onClick={() => selectExample(name)} key={`example-${i}`} github={source}/>
            })
        }
    </>);
}

export default Examples;