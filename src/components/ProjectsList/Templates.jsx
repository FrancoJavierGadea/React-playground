import { useEffect, useState } from "react";
import { downloadTemplate, getTemplates } from "../../utils/github";
import { useFiles } from "../../context/FilesContext/FilesContext";
import { useProjects } from "../../context/ProjectsContext/ProjectsContext";
import ListItem from "./ListItem";
import { useTemplates } from "../../context/TemplatesContext/TemplatesContext";


function Templates({onSelect = () => {}, onLoad = () => {}}) {

    const {changeFiles, reset} = useFiles();

    const {setCurrentProject, setIsProject} = useProjects();

    const {templates, getTemplate, removeTemplate} = useTemplates();

    const [githubTemplates, setGithubTemplates] = useState([]);

    useEffect(() => {
        
        getTemplates()
        .then(githubTemplates => {

            setGithubTemplates(githubTemplates);

            onLoad();
        });

    }, []);

    const selectGithubTemplate = (name) => {

        downloadTemplate(name)
        .then(template => {

            setCurrentProject(name);

            setIsProject(false);

            changeFiles(template);

            onSelect();
        });
    }

    const selectDefault = () => {

        reset();

        setCurrentProject('default');

        setIsProject(false);

        onSelect();
    }

    const selectTemplate = (name) => {

        getTemplate(name)
        .then(template => {

            setCurrentProject(name);

            setIsProject(false);

            changeFiles(template);

            onSelect();
        });
    }

    return (<>

        <ListItem name="Default" onClick={selectDefault} />

        {
            githubTemplates.map(({name, source}, i) => {

                return <ListItem name={name} onClick={() => selectGithubTemplate(name)} key={`gh-template-${i}`} github={source}/>
            })
        }

        {
            templates.map((name, i) => {

                return <ListItem name={name} onClick={() => selectTemplate(name)} key={`template-${i}`}
                
                    del onDelete={() => removeTemplate(name)}
                />
            })
        }
    
    </>);
}

export default Templates;