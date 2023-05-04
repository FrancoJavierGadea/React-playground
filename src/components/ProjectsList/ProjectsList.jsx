import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import styled from "styled-components";
import logo from "../../assets/react.svg";

const StyledOffcanvas = styled(Offcanvas)`

    z-index: 5000;

    .btn {
        width: 100%;
        text-align: left;
        margin-top: 10px;
        --bs-btn-border-radius: 0;
        --bs-btn-border-width: 0;
    }
`;



function ProjectsList({projects = [], currentProject = 'default', onSelect = () => {}}) {

    const [show, setShow] = useState(false);

    const close = () => setShow(false);

    const open = () => setShow(true);

    const select = (name) => {

        close();
        onSelect(name);
    }

    return (<>
    
        <StyledOffcanvas placement="end" show={show} onHide={close}>

            <Offcanvas.Header closeButton>

                <Offcanvas.Title>
                    <img src={logo} /> React playground
                </Offcanvas.Title>

            </Offcanvas.Header>

            <Offcanvas.Body>
                {/* <Offcanvas.Title>Ejemplos</Offcanvas.Title> */}

                <Offcanvas.Title>Guardados</Offcanvas.Title>

                {
                    projects.map((name, i) => {

                        return <Button className="border-bottom" variant="outline-light" title={`Cambiar a ${name}`} 
    
                            key={`project-${i}`} onClick={() => select(name)}>{name}

                        </Button>
                    })
                }

            </Offcanvas.Body>
        </StyledOffcanvas>
    
        <Button className="border-0 rounded-0" size="sm" variant="outline-light" title="Cambiar de proyecto" onClick={open}>{currentProject}</Button>
    </>);
}

export default ProjectsList;