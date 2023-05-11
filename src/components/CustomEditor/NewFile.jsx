import { useState } from "react";
import { Alert, Button, Form, Modal, Nav } from "react-bootstrap";
import styled from "styled-components";
import { getFileLanguage } from "../../utils/files";
import { useFiles } from "../FilesContext/FilesContext";

const StyledModal = styled(Modal)`

    z-index: 5000;
`;


const ACCEPTED_FILES = ['.js', '.jsx', '.ts', '.tsx', '.md', '.txt'];

function NewFile({}) {

    const {addFile} = useFiles();

    const [show, setShow] = useState(false);

    const [name, setName] = useState('');

    const [extension, setExtension] = useState('.js');

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

            const fileName = `/${name}${extension}`;

            addFile(fileName, {

                name: fileName,

                language: getFileLanguage(fileName),

                value: ''
            });

            reset();
        }
        catch (error) {

            setWarning(error.message);
        }
    }

    return (<>

        <StyledModal show={show} onHide={close}>

            <Modal.Header closeButton>
                <Modal.Title>Nuevo Archivo</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                { warning && <Alert variant="warning">{warning}</Alert> }

                <Form.Label className="">Ingresa un nombre</Form.Label>

                <Form.Control extension="text" value={name} onChange={({target}) => setName(target.value)} />


                <Form.Label className="mt-3">Eligue el tipo de archivo</Form.Label>

                <Nav fill variant="pills" activeKey={extension} onSelect={(ext) => setExtension(ext)}>
                    {
                        ACCEPTED_FILES.map((ext, i) => {

                            return <Nav.Item key={`ext-${i}`}>
                                <Nav.Link as="button" eventKey={ext}>{ext}</Nav.Link>
                            </Nav.Item>
                        })
                    }
                </Nav>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={save}>Guardar</Button>
            </Modal.Footer>

        </StyledModal>
    
        <Button variant="secondary" className="rounded-0 d-flex align-items-center" title="Crear nuevo Archivo" onClick={open}>
            <i className="bi bi-file-plus" />
        </Button>
    </>);
}

export default NewFile;