import { useState } from "react";
import { Alert, Button, ButtonGroup, Form, Modal, Nav, ToggleButton } from "react-bootstrap";
import styled from "styled-components";
import { FILES_ICONS, getFileExtension, getFileLanguage } from "../../utils/files";
import { useFiles } from "../FilesContext/FilesContext";

const StyledModal = styled(Modal)`

    z-index: 5000;

    @media (max-height: 450px) {

        --bs-modal-width: 100vw;
        --bs-modal-margin: 0;
    }

    .btn-group {
        width: 100%;
        max-width: 700px;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .btn-group .btn {
        --bs-btn-active-bg: transparent;
        --bs-btn-border-width: 2px;
        --bs-btn-active-color: ${props => props.theme.isDark ? '#fff' : '#000'};
        
        border-radius: var(--bs-btn-border-radius) !important;
        margin: 10px !important;
        flex-grow: 0;
    }
    .btn-group .btn img {
        width: 25px;
        height: 100%;
    }
`;


const ACCEPTED_FILES = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.md', '.txt'];

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

                <ButtonGroup>
                    {
                        ACCEPTED_FILES.map((ext, i) => {

                            return <ToggleButton key={`ext-${i}`} id={`radio-${i}`} name="radio" type="radio" variant={extension === ext ? 'primary' : ''}
                            
                                value={ext} checked={extension === ext} onChange={(e) => setExtension(e.currentTarget.value)}

                                title={getFileLanguage(ext)}
                            >
                                <img className="mx-1" src={FILES_ICONS[ext]} alt="File language icon" /> {ext}
                            </ToggleButton>
                        })
                    }
                </ButtonGroup>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={save}>Crear</Button>
            </Modal.Footer>

        </StyledModal>
    
        <Button variant="secondary" className="rounded-0 d-flex align-items-center" title="Crear nuevo Archivo" onClick={open}>
            <i className="bi bi-file-plus" />
        </Button>
    </>);
}

export default NewFile;