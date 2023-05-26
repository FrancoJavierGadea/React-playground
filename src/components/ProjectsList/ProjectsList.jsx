import { useEffect, useMemo, useState } from "react";
import { Accordion, Button, NavLink, Offcanvas } from "react-bootstrap";
import styled from "styled-components";
import { downloadExample, downloadTemplate, getExamples, getTemplates } from "../../utils/github";
import ListItem from "./ListItem";
import { useProjects } from "../../context/ProjectsContext/ProjectsContext";
import { useFiles } from "../../context/FilesContext/FilesContext";
import Footer from "./Fotter";
import logo from "../../assets/icons/react.svg";
import Projects from "./Projects";
import Examples from "./Examples";
import Templates from "./Templates";


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

    const [show, setShow] = useState(true);

    const close = () => setShow(false);

    const open = () => setShow(true);


    const [accordionOpenItems, setAccordionOpenItems] = useState([]);

    const accordionHandlerSelect = (openItems) => {

        setAccordionOpenItems(openItems);
    }

	const { currentProject } = useProjects();



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
                        
                            <Examples onSelect={close} onLoad={() => setAccordionOpenItems(old => [...old, 'examples'])} />

                        </Accordion.Body>
                    </Accordion.Item>
                    
                    <Accordion.Item className="mb-2" eventKey="templates">
                        <Accordion.Header className="">Templates</Accordion.Header>
                        <Accordion.Body className="pt-0 pb-3 px-3">

                            <Templates onSelect={close} />

                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item className="mb-2" eventKey="projects">
                        <Accordion.Header className="">Guardados</Accordion.Header>
                        <Accordion.Body className="pt-0 pb-3 px-3">

                            <Projects onSelect={close} />

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