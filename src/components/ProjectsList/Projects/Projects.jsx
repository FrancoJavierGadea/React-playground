import styled from "styled-components";
import { useFiles } from "../../../context/FilesContext/FilesContext";
import { useProjects } from "../../../context/ProjectsContext/ProjectsContext";
import ListItem from "../ListItem";
import { Accordion, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import EditProject from "./EditProject";
import { downloadProjects } from "../../../utils/downloadZip";

const StyledAccordion = styled(Accordion)`

    --bs-accordion-bg: transparent;
    --bs-accordion-border-radius: 0;
    --bs-accordion-border-width: 0;
    --bs-accordion-active-bg: transparent;
    --bs-accordion-btn-focus-box-shadow: transparent;
    --bs-accordion-body-padding-x: 10px;
    --bs-accordion-body-padding-y: 0;
    --bs-accordion-btn-padding-x: 10px;
    --bs-accordion-btn-padding-y: 20px;

    .accordion-header {
        flex-grow: 1;
    }
    .accordion-body {
        padding-bottom: 10px;
    }

    .download-btn {
        --bs-btn-border-width: 0;
        --bs-btn-hover-bg: transparent;
        --bs-btn-hover-color: var(--bs-btn-color);
        --bs-btn-active-bg: tranparent;
        --bs-btn-active-color: var(--bs-btn-color);
    }
    .download-btn:hover {
        opacity: .6;
    }
    .download-btn:active {
        opacity: 1;
    }

    .drag-over {
        opacity: 0.5;
        background-color: #878787;
        border-radius: 5px;
    }
    .drag-over * {
        pointer-events: none;
    }
`;


function Projects({onSelect = () => {}}) {

    const {changeFiles} = useFiles();

    const {folders, projects, setCurrentProject, getProject, removeProject, setIsProject, changeFolder, getProjects} = useProjects();

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


    //Change project folder with drag and drop
    const accordionRef = useRef();

    const dropTargetRef = useRef();

    const dragStart = (e) => {

        //Disable drag image
        const img = document.createElement('img');

        e.dataTransfer.setDragImage(img, 0, 0);
    }

    const dragEnd = (e) => {

        const item = e.currentTarget;

        const projectName = item.getAttribute('data-project-name');
        const projectFolder = item.getAttribute('data-project-folder')

        const newFolder = dropTargetRef.current.getAttribute('data-folder');

        if(newFolder !== projectFolder){

            changeFolder(projectName, newFolder);
        }

        for (const accordionItem of accordionRef.current.children) {

            accordionItem.classList.remove('drag-over');        
        }
    }

    const dragOver = (e) => {
        e.preventDefault();
    }

    const dragEnter = (e) => {

        const item = e.currentTarget;

        dropTargetRef.current = item;

        for (const accordionItem of accordionRef.current.children) {

            accordionItem.classList.remove('drag-over');        
        }

        item.classList.add('drag-over');
    }


    //
    const download = (folder) => {

        getProjects().then(projects => {

            downloadProjects(folder, projects.filter(({folder:f = 'Root'}) => f === folder));
        })

    }

    return (<>

        <StyledAccordion activeKey={accordionKeys} onSelect={(keys) => setAccordionKeys(keys)} alwaysOpen ref={accordionRef}>
            {
                folders.map((folder) => {

                    return <Accordion.Item eventKey={folder} key={folder}
                    
                        data-folder={folder} onDragOver={dragOver} onDragEnter={dragEnter}
                    >
                        <div className="d-flex align-items-center">
                            <Accordion.Header>
                                { accordionKeys.includes(folder) 
                                    ? <i className="bi bi-folder2-open fs-5" />
                                    : <i className="bi bi-folder fs-5" />
                                }
                                <span className="ms-1">{folder}</span>
                            </Accordion.Header>

                            <Button className="download-btn" variant="outline-success" onClick={() => download(folder)}>
                                <i className="bi bi-download" title={`Descargar ${folder}`}/>
                            </Button>
                        </div>
                    
                        <Accordion.Body>
                        {
                            projects.filter(project => project.folder === folder)
                            .map(project => {
                                
                                return <div key={project.name} 
                                
                                    data-project-name={project.name} data-project-folder={project.folder} 
                                
                                    draggable onDragStart={dragStart} onDragEnd={dragEnd}
                                >
                                    <ListItem name={project.name} folder={project.folder} onClick={() => selectProject(project.name)} 

                                        onDelete={() => removeProject(project.name)}
                                    >    
                                        <EditProject name={project.name} folder={project.folder} />
                                    </ListItem>

                                </div>
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