import styled from "styled-components";
import { useFiles } from "../../context/FilesContext/FilesContext";
import { useProjects } from "../../context/ProjectsContext/ProjectsContext";
import ListItem from "./ListItem";
import { Accordion } from "react-bootstrap";
import { useState } from "react";

const StyledAccordion = styled(Accordion)`

    --bs-accordion-border-radius: 0;
    --bs-accordion-border-width: 0;
    --bs-accordion-active-bg: transparent;
    --bs-accordion-btn-focus-box-shadow: transparent;
    --bs-accordion-body-padding-x: 0;
    --bs-accordion-body-padding-y: 0;
    --bs-accordion-btn-padding-x: 0;
    --bs-accordion-btn-padding-y: 20px;

    .accordion-body {
        padding-bottom: 10px;
    }
`;


function Projects({onSelect = () => {}}) {

    const {changeFiles} = useFiles();

    const {folders, projects, setCurrentProject, getProject, removeProject, setIsProject} = useProjects();

    const [accordionKeys, setAccordionKeys] = useState(['Root']);

    const selectProject = (name) => {

        getProject(name)
		.then(project => {

            setCurrentProject({name: project.name, folder: project.folder});

            setIsProject(true);

            changeFiles(project.files);

            onSelect();
		});
    }

    return (<>

        <StyledAccordion activeKey={accordionKeys} onSelect={(keys) => setAccordionKeys(keys)} alwaysOpen>
            {
                folders.map((folder) => {

                    return <Accordion.Item data-folder={folder || 'Root'} eventKey={folder || 'Root'} key={folder || 'Root'}>

                        <Accordion.Header>{folder || 'Root'}</Accordion.Header>
                    
                        <Accordion.Body>
                        {
                            projects.filter(project => project.folder === folder)
                            .map(project => {
                                
                                return <ListItem name={project.name} onClick={() => selectProject(project.name)} key={project.name} 

                                    del onDelete={() => removeProject(project.name)}
                                />
                            })
                        }
                        </Accordion.Body>
                    </Accordion.Item>;
                })
            }
        </StyledAccordion>
        
    </>);
}

export default Projects;