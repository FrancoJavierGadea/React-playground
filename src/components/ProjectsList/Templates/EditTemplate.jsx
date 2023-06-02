import { useState } from "react";
import { useTemplates } from "../../../context/TemplatesContext/TemplatesContext";
import { Alert, Button, Form, Modal } from "react-bootstrap";

function EditTemplate({name}) {
    
    const [show, setShow] = useState(false);

    const open = () => setShow(true);

    const close = () => setShow(false);

    const {changeTemplateName} = useTemplates();

    const [newName, setNewName] = useState(name);

    const [warning, setWarning] = useState(null);
    
    const reset = () => {
        setShow(false);
        setNewName(name);
        setWarning(null);
    }

    const save = () => {

        try {

            if(name !== newName){

                changeTemplateName(name, newName);
            }
            
            reset();

        } catch (error) {
            
            setWarning(error.message);
        }
    }

    return (<>
        <Modal show={show} onHide={reset} style={{zIndex: 5000}}>

            <Modal.Header closeButton>
                <Modal.Title>Editar {name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                { warning && <Alert variant="warning">{warning}</Alert> }

                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" value={newName} onChange={(e) => setNewName(e.currentTarget.value)} />

            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={save} disabled={newName === name}>Guardar</Button>
            </Modal.Footer>

        </Modal>

        <Button className="edit-btn border-bottom" variant="outline-success" title={`Editar ${name}`} onClick={open}>
            <i className="bi bi-pencil" />
        </Button>
    </>);
}

export default EditTemplate;