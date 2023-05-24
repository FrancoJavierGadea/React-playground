import { useEffect, useMemo, useState } from "react";
import { Accordion, Button, NavLink, Offcanvas } from "react-bootstrap";
import styled from "styled-components";
import { downloadExample, downloadTemplate, getExamples, getTemplates } from "../../utils/github";
import ListItem from "./ListItem";
import { useProjects } from "../ProjectsContext/ProjectsContext";
import { useFiles } from "../FilesContext/FilesContext";
import Footer from "./Fotter";
import logo from "../../assets/icons/react.svg";


const StyledOffcanvas = styled(Offcanvas)`

    @media (max-width: 576px) {
     
        --bs-offcanvas-width: 100%; 
    }
    
    z-index: 5000;

    .offcanvas-header img {
        width: 50px;
    }

    .offcanvas-body {

        --sb-track-color: ${props => props.theme.isDark ? '#232E33' : '#8e8989'};
        --sb-thumb-color: ${props => props.theme.isDark ? '#6BAF8D' : '#4a4a4b'};
        --sb-size: 10px;
    
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

    .offcanvas-body .accordion {
        --bs-accordion-border-radius: 0;
        --bs-accordion-border-width: 0;
        --bs-accordion-active-bg: transparent;
        --bs-accordion-btn-focus-box-shadow: transparent;
    }
`;



function ProjectsList({}) {

    const {changeFiles} = useFiles();

    const [show, setShow] = useState(false);

    const close = () => setShow(false);

    const open = () => setShow(true);


    const [accordionOpenItems, setAccordionOpenItems] = useState([]);

    const accordionHandlerSelect = (openItems) => {

        setAccordionOpenItems(openItems);
    }

	const {projects, currentProject, setCurrentProject, getProject, removeProject} = useProjects();

    const selectProject = (name) => {

        close();

        getProject(name)
		.then(project => {

            setCurrentProject(name);
            changeFiles(project);
		});
    }


    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        
        getTemplates()
        .then(templates => {

            setTemplates(templates);
            setAccordionOpenItems(old => [...old, 'examples']);
        });

    }, []);

    const selectTemplate = (name) => {

        close();

        downloadTemplate(name)
        .then(template => {

            setCurrentProject(name);
            changeFiles(template);
        });
    }


    const [examples, setExamples] = useState([]);
    
    useEffect(() => {
        
        getExamples()
        .then(examples => {

            setExamples(examples);
            setAccordionOpenItems(old => [...old, 'templates']);
        });

    }, []);

    const selectExample = (name) => {

        close();

        downloadExample(name)
        .then(example => {

            setCurrentProject(name);
            changeFiles(example);
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

            <Offcanvas.Body className="p-0">

                <Accordion activeKey={accordionOpenItems} onSelect={accordionHandlerSelect} alwaysOpen>

                    <Accordion.Item className="mb-2" eventKey="examples">
                        <Accordion.Header className="">Ejemplos</Accordion.Header>
                        <Accordion.Body className="pt-0 pb-3 px-3">
                        {
                            examples.map(({name, source}, i) => {

                                return <ListItem name={name} onClick={() => selectExample(name)} key={`example-${i}`} github={source}/>
                            })
                        }
                        </Accordion.Body>
                    </Accordion.Item>
                    
                    <Accordion.Item className="mb-2" eventKey="templates">
                        <Accordion.Header className="">Templates</Accordion.Header>
                        <Accordion.Body className="pt-0 pb-3 px-3">
                        {
                            templates.map(({name, source}, i) => {

                                return <ListItem name={name} onClick={() => selectTemplate(name)} key={`template-${i}`} github={source}/>
                            })
                        }
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item className="mb-2" eventKey="projects">
                        <Accordion.Header className="">Guardados</Accordion.Header>
                        <Accordion.Body className="pt-0 pb-3 px-3">
                        {
                            projects.map((name, i) => {

                                return <ListItem name={name} onClick={() => selectProject(name)} key={name} 

                                    del onDelete={() => removeProject(name)}
                                />
                            })
                        }
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>

            </Offcanvas.Body>

            <Footer />

        </StyledOffcanvas>
    
        <Button className="border-0 rounded-0" size="sm" variant="outline-light" title="Cambiar de proyecto" onClick={open}>{currentProject}</Button>
    </>);
}

export default ProjectsList;