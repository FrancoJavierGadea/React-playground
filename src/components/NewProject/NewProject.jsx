import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import { useProjects } from "../ProjectsContext/ProjectsContext";


const StyledModal = styled(Modal)`

    z-index: 5000;
`;

function NewProject({onSave = () => {}}) {

    const {projects} = useProjects();

    const [show, setShow] = useState(false);

    const [name, setName] = useState('');

    const [warning, setWarning] = useState(null);

    const open = () => setShow(true);

    const close = () => setShow(false);

    const reset = () => {
        setShow(false);
        setName('');
        setWarning(null);
    }

    const save = () => {

        if(projects.includes(name)){

            setWarning('Ya existe un proyecto con ese nombre');
        }
        else {

            onSave(name);
            reset();
        }

    }

    return (<>
        <StyledModal show={show} onHide={close}>

            <Modal.Header closeButton>
                <Modal.Title>Nuevo Proyecto</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                { warning && <Alert variant="warning">{warning}</Alert> }

                <Form.Label>Ingresa un nombre</Form.Label>
                <Form.Control type="text" value={name} onChange={({target}) => setName(target.value)} />

            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={save}>Guardar</Button>
            </Modal.Footer>

        </StyledModal>
    
        <Button className="border-0 rounded-0" size="sm" variant="outline-light" position="left" title="Nuevo proyecto" onClick={open}>Nuevo proyecto</Button>
    </>);
}

export default NewProject;