import { useRef, useState } from "react";
import { Alert, Button, ButtonGroup, Form, Modal, ToggleButton } from "react-bootstrap";
import styled from "styled-components";
import { useProjects } from "../../context/ProjectsContext/ProjectsContext";
import { useFiles } from "../../context/FilesContext/FilesContext";
import useBreakPoints, { MAX_WIDTH } from "../../hooks/useBreakpoints";
import { useTemplates } from "../../context/TemplatesContext/TemplatesContext";
import SelectFolder from "./SelectFolder";


const StyledModal = styled(Modal)`

    z-index: 5000;
`;

const MODE = {
    PROJECT: 'project',
    TEMPLATE: 'template'
}

function NewProject({}) {

    const {addProject} = useProjects();

    const {addTemplate} = useTemplates();

    const {files} = useFiles();

    const [show, setShow] = useState(false);

    const open = () => setShow(true);

    const close = () => setShow(false);

    const [mode, setMode] = useState(MODE.PROJECT);

    const [name, setName] = useState('');

    const [folder, setFolder] = useState(undefined);

    const [warning, setWarning] = useState(null);

    const reset = () => {
        setShow(false);
        setName('');
        setWarning(null);
        setMode(MODE.PROJECT);
        setFolder(undefined);
    }

    const save = () => {

        try {

            if(mode === MODE.PROJECT){

                addProject(name, files, folder);
            }
            else {

                addTemplate(name, files);
            }
            
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

    const handleChangeFolder = (value) => {

        console.log(value);

        setFolder(value);
    }

    return (<>
        <StyledModal show={show} onHide={reset}>

            <Modal.Header closeButton>
                <Modal.Title>Nuevo</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                { warning && <Alert variant="warning">{warning}</Alert> }

                <ButtonGroup className="mb-3 d-flex">
                    <ToggleButton id="project-radio" name="save-mode" type="radio"

                        value={MODE.PROJECT} checked= {mode === MODE.PROJECT} onChange={(e) => setMode(e.currentTarget.value)}

                        variant={mode === MODE.PROJECT ? 'secondary' : 'outline-secondary'} title="Guardar como Proyecto"
                    >
                        Proyecto
                    </ToggleButton>

                    <ToggleButton id="template-radio" name="save-mode" type="radio"

                        value={MODE.TEMPLATE} checked= {mode === MODE.TEMPLATE} onChange={(e) => setMode(e.currentTarget.value)}

                        variant={mode === MODE.TEMPLATE ?  'secondary' : 'outline-secondary'} title="Guardar como Template"
                    >
                        Template
                    </ToggleButton>
                </ButtonGroup>

                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" value={name} onChange={({target}) => setName(target.value)} onKeyUp={handlerKeyUp} />

                { mode === MODE.PROJECT && <SelectFolder value={folder} onChange={handleChangeFolder}/> }

            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={save}>Guardar</Button>
            </Modal.Footer>

        </StyledModal>
    
        <Button className="border-0 rounded-0" size="sm" variant="outline-light" title="Nuevo proyecto o template" onClick={open}>

            <i className="bi bi-folder-plus mx-1" /> { !isMD && 'Nuevo' }
        </Button>
    </>);
}

export default NewProject;