import { useState } from "react";
import { Button, Offcanvas, Tab, Tabs } from "react-bootstrap";
import styled from "styled-components";
import { useProjects } from "../../context/ProjectsContext/ProjectsContext";
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

    .tab-content {

        padding: 0 10px;
        overflow-x: hidden;
        overflow-y: auto;
        max-height: 90%;

        --sb-track-color: ${props => props.theme.isDark ? '#232E33' : '#8e8989'};
        --sb-thumb-color: ${props => props.theme.isDark ? '#6BAF8D' : '#4a4a4b'};
        --sb-size: 10px;
    
        scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
    }
    
    .tab-content::-webkit-scrollbar {
        width: var(--sb-size) 
    }

    .tab-content::-webkit-scrollbar-track {
        background: var(--sb-track-color);
        border-radius: 1px;
    }

    .tab-content::-webkit-scrollbar-thumb {
        background: var(--sb-thumb-color);
        border-radius: 1px;   
    }
`;



function ProjectsList({}) {

    const [show, setShow] = useState(true);

    const close = () => setShow(false);

    const open = () => setShow(true);

    const [tabSelected, settabSelected] = useState('examples');

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

                <Tabs className="mb-1" activeKey={tabSelected} onSelect={(key) => settabSelected(key)} fill>

                    <Tab eventKey="examples" title="Ejemplos">

                        <Examples onSelect={close} />
                    </Tab>

                    <Tab eventKey="template" title="Templates">

                        <Templates onSelect={close} />
                    </Tab>

                    <Tab eventKey="projects" title="Proyectos">

                        <Projects onSelect={close} />
                    </Tab>

                </Tabs>

            </Offcanvas.Body>

            <Footer />

        </StyledOffcanvas>
    
        <Button className="border-0 rounded-0" size="sm" variant="outline-light" title="Cambiar de proyecto" onClick={open}>{currentProject}</Button>
    </>);
}

export default ProjectsList;