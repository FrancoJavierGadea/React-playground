import styled from "styled-components";
import { useFiles } from "../../context/FilesContext/FilesContext";
import { useProjects } from "../../context/ProjectsContext/ProjectsContext";
import ListItem from "./ListItem";
import { Accordion } from "react-bootstrap";

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

    const {projects, setCurrentProject, getProject, removeProject, setIsProject} = useProjects();

    const selectProject = (name) => {

        getProject(name)
		.then(project => {

            setCurrentProject(project.name);

            setIsProject(true);

            changeFiles(project.files);

            onSelect();
		});
    }

    return (<>

        <StyledAccordion alwaysOpen>

            <Accordion.Item eventKey="Root">
                <Accordion.Header>Root</Accordion.Header>

                <Accordion.Body>
                {
                    projects.filter(project => !project.folder).map((project, i) => {

                        return <ListItem name={project.name} onClick={() => selectProject(project.name)} key={project.name} 

                            del onDelete={() => removeProject(project.name)}
                        />
                    })
                }
                </Accordion.Body>
            </Accordion.Item>

            {/* <Accordion.Item eventKey="local-templates">
                <Accordion.Header>Mis Templates</Accordion.Header>

                <Accordion.Body>

                    <ListItem name="Default" onClick={selectDefault} />

                    {
                        templates.map((name, i) => {
                            
                            return <ListItem name={name} onClick={() => selectTemplate(name)} key={`template-${i}`}
                            
                            del onDelete={() => removeTemplate(name)}
                            />
                        })
                    }
                </Accordion.Body>
            </Accordion.Item> */}

        </StyledAccordion>
        
    </>);
}

export default Projects;