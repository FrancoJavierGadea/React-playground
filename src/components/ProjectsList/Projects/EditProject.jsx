import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useProjects } from "../../../context/ProjectsContext/ProjectsContext";


function EditProject({name, folder}) {

    const [show, setShow] = useState(false);

    const open = () => setShow(true);

    const close = () => setShow(false);

    const {folders, changeProjectName, changeFolder} = useProjects();
    
    const [newName, setNewName] = useState(name);
    
    const [newFolder, setNewFolder] = useState(folder);
    
    const [warning, setWarning] = useState(null);
    
    const reset = () => {
        setShow(false);
        setNewName(name);
        setNewFolder(folder);
        setWarning(null);
    }

    const save = () => {

        try {

            if(name !== newName){

                changeProjectName(name, newName, newFolder);
            }
            else {

                changeFolder(name, newFolder);
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
    
                <Form.Label className="mt-3">Carpeta</Form.Label>

                <Form.Select value={newFolder} onChange={(e) => setNewFolder(e.currentTarget.value)} title="Selecciona una carpeta"> 
                    {   
                        folders.map((f, i) => {

                            return <option value={f} key={`opt-${i}`}>{f}</option>

                        }) 
                    }
                </Form.Select>
        
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={save} disabled={newName === name && newFolder === folder}>Guardar</Button>
            </Modal.Footer>

        </Modal>

        <Button className="edit-btn border-bottom" variant="outline-success" title={`Editar ${name}`} onClick={open}>
            <i className="bi bi-pencil" />
        </Button>
    </>);
}

export default EditProject;

