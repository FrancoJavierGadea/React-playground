import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import { useFiles } from "../FilesContext/FilesContext";
import { getFileExtension, getFileName } from "../../utils/files";


const StyledDiv = styled.div`

    .btn {
        --bs-btn-bg: transparent;
        --bs-btn-hover-bg: transparent;
        --bs-btn-active-bg: transparent;
        --bs-btn-border-radius: 0;
        --bs-btn-border-width: 0;
        --bs-btn-color: var(--bs-secondary-color);
        --bs-btn-hover-color: var(--bs-info);
        --bs-btn-active-color: var(--bs-danger);
    }
`;

function EditFile({fileName, className}) {

    const {updateFileName} = useFiles();

    const [show, setShow] = useState(false);

    const [name, setName] = useState( getFileName(fileName) );

    const [warning, setWarning] = useState(null);

    const open = () => setShow(true);

    const close = () => setShow(false);

    const reset = () => {
        setShow(false);
        setName('');
        setWarning(null);
    }

    const save = () => {

        const newName = `/${name}${getFileExtension(fileName)}`;

        updateFileName(fileName, newName);

        reset();
    }

    return (<StyledDiv className={className}>

        <Modal show={show} onHide={close} style={{zIndex: 5000}}>

            <Modal.Header closeButton>
                <Modal.Title>Cambiar nombre</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                { warning && <Alert variant="warning">{warning}</Alert> }

                <Form.Label>Ingresa un nombre</Form.Label>
                <Form.Control type="text" value={name} onChange={({target}) => setName(target.value)} />

            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={save}>Guardar</Button>
            </Modal.Footer>

        </Modal>

        <Button className="m-0 p-0" onClick={open} title={`Cambiar nombre de ${fileName}`}><i className="bi bi-pencil" /></Button>

    </StyledDiv>);
}

export default EditFile;