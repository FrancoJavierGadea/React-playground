import { useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import { useProjects } from "../../context/ProjectsContext/ProjectsContext";
import { useFiles } from "../../context/FilesContext/FilesContext";
import useBreakPoints, { MAX_WIDTH } from "../../hooks/useBreakpoints";


const StyledModal = styled(Modal)`

    z-index: 5000;
`;

function NewProject({}) {

    const {addProject} = useProjects();

    const {files} = useFiles();

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

        try {
            
            addProject(name, files);

            reset();
        }
        catch (error) {

            setWarning(error.message);
        }
    }

    const handlerKeyUp = ({key}) => {

        if(key === 'Enter'){

            save();
        }
    }

    const [isMD] = useBreakPoints(MAX_WIDTH.md);

    return (<>
        <StyledModal show={show} onHide={reset}>

            <Modal.Header closeButton>
                <Modal.Title>Nuevo Proyecto</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                { warning && <Alert variant="warning">{warning}</Alert> }

                <Form.Label>Ingresa un nombre</Form.Label>
                <Form.Control type="text" value={name} onChange={({target}) => setName(target.value)} onKeyUp={handlerKeyUp} />

            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={save}>Guardar</Button>
            </Modal.Footer>

        </StyledModal>
    
        <Button className="border-0 rounded-0" size="sm" variant="outline-light" title="Nuevo proyecto" onClick={open}>

            <i className="bi bi-folder-plus mx-1" /> { !isMD && 'Nuevo proyecto' }
        </Button>
    </>);
}

export default NewProject;