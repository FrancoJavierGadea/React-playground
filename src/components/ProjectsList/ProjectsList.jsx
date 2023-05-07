import { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import styled from "styled-components";
import logo from "../../assets/react.svg";
import { downloadExample, downloadTemplate, getExamples, getTemplates } from "../../utils/github";
import ListItem from "./ListItem";
import { useProjects } from "../ProjectsContext/ProjectsContext";

const StyledOffcanvas = styled(Offcanvas)`

    z-index: 5000;

    .offcanvas-body {

        --sb-track-color: #232E33;
        --sb-thumb-color: #6BAF8D;
        --sb-size: 7px;
    
        scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
    }
    
    .offcanvas-body::-webkit-scrollbar {
        width: var(--sb-size) 
    }

    .offcanvas-body::-webkit-scrollbar-track {
        background: var(--sb-track-color);
        border-radius: 1px;
    }

    .offcanvas-body::-webkit-scrollbar-thumb {
        background: var(--sb-thumb-color);
        border-radius: 1px;   
    }
`;



function ProjectsList({onSelect = () => {}}) {

    const [show, setShow] = useState(true);

    const close = () => setShow(false);

    const open = () => setShow(true);


	const {projects, currentProject, setCurrentProject, getProject, removeProject} = useProjects();

    const selectProject = (name) => {

        close();

        getProject(name)
		.then(project => {

            setCurrentProject(name);
            onSelect(name, project);
		});
    }


    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        
        getTemplates()
        .then(templates => {

            setTemplates(templates);
        });

    }, []);

    const selectTemplate = (name) => {

        close();

        downloadTemplate(name)
        .then(template => {

            setCurrentProject(name);
            onSelect(name, template);
        });
    }


    const [examples, setExamples] = useState([]);
    
    useEffect(() => {
        
        getExamples()
        .then(examples => {

            setExamples(examples);
        });

    }, []);

    const selectExample = (name) => {

        close();

        downloadExample(name)
        .then(example => {

            setCurrentProject(name);
            onSelect(name, example);
        });
    }

    return (<>
    
        <StyledOffcanvas placement="end" show={show} onHide={close}>

            <Offcanvas.Header closeButton>

                <Offcanvas.Title className="d-flex align-items-center">
                    <img src={logo} alt="React logo"/> 
                    <h2 className="mx-2 my-1">React playground</h2>
                </Offcanvas.Title>

            </Offcanvas.Header>

            <Offcanvas.Body>

                { examples.length > 0 && <Offcanvas.Title className="mt-3">Ejemplos</Offcanvas.Title> }
                {
                    examples.map(({name, source}, i) => {

                        return <ListItem name={name} onClick={() => selectExample(name)} key={`example-${i}`} github={source}/>
                    })
                }

                { templates.length > 0 && <Offcanvas.Title className="mt-3">Templates</Offcanvas.Title> }
                {
                    templates.map(({name, source}, i) => {

                        return <ListItem name={name} onClick={() => selectTemplate(name)} key={`template-${i}`} github={source}/>
                    })
                }

                <Offcanvas.Title className="mt-3">Guardados</Offcanvas.Title>
                {
                    projects.map((name, i) => {

                        return <ListItem name={name} onClick={() => selectProject(name)} key={`project-${i}`} 
                            del onDelete={() => removeProject(name)}
                        />
                    })
                }

            </Offcanvas.Body>
        </StyledOffcanvas>
    
        <Button className="border-0 rounded-0" size="sm" variant="outline-light" title="Cambiar de proyecto" onClick={open}>{currentProject}</Button>
    </>);
}

export default ProjectsList;