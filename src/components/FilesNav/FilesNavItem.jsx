import { Button, Nav } from "react-bootstrap";
import FileControls from "./FileControls";
import { FILES_ICONS, getFileExtension } from "../../utils/files";
import styled from "styled-components";
import { useState } from "react";
import { getFileName } from "../../utils/files";
import { useFiles } from "../../context/FilesContext/FilesContext";


const StyledNavItem = styled(Nav.Item)`

    position: relative;

    .nav-link {
        --bs-nav-link-padding-x: 1.4rem;
        white-space: nowrap;
    }
      
    img {
        width: 25px;
        height: 100%;
        pointer-events: none;
    }
    span {
        pointer-events: none;
    }
    .change-name-input {
        appearance: none;
        outline: none;
        border: none;
        background-color: #acacac45;
        padding: 0 4px;
        border-radius: 4px;
    }

    .hide-name-btn {
        visibility: hidden;
        position: absolute;
        left: 0;
        height: 100%;
        z-index: 100;
        padding: 0;
        --bs-btn-bg: transparent;
        --bs-btn-hover-bg: transparent;
        --bs-btn-active-bg: transparent;
        --bs-btn-border-radius: 0;
        --bs-btn-border-width: 0;
        --bs-btn-color: var(--bs-secondary-color);
        --bs-btn-hover-color: var(--bs-primary);
        --bs-btn-active-color: var(--bs-primary);
    }
    &:hover .hide-name-btn {
        visibility: visible;
    }

    .file-controls {
        visibility: hidden;
    }
    &:hover .file-controls {

        visibility: visible;
    }

`;

function FilesNavItem({name, ...props}) {

    const [show, setShow] = useState(true);

    const {updateFileName} = useFiles();

    const [changeName, setChangeName] = useState(false);

    const [newName, setNewName] = useState( getFileName(name) );

    const handleDoubleClick = () => {

        setChangeName(true);
    }

    const handleBlur = (e) => {

        if(newName !== getFileName(name)){
            
            //console.log('change name', `/${newName}${getFileExtension(name)}`);
            
            updateFileName(name, `/${newName}${getFileExtension(name)}`);
        }

        setChangeName(false);
    }

    return (<StyledNavItem className="d-flex" draggable="true" {...props}>

        <Button className="controls hide-name-btn" onClick={() => setShow(old => !old)} title={show ? 'Ocultar nombre' : 'Mostrar nombre'}>
            { show ? <i className="bi bi-chevron-compact-left" /> : <i className="bi bi-chevron-compact-right" /> }
        </Button>

        <Nav.Link className="d-flex justify-content-center align-items-center" as="button" eventKey={name} onDoubleClick={handleDoubleClick}>

            <img className="mx-2" src={FILES_ICONS[getFileExtension(name)]} alt="File language icon" />

            { show && <>
            
                { !changeName ? <span>{name}</span> :
                
                    <input className="change-name-input" type="text" size={newName.length} spellCheck={false}
                    
                        value={newName} onChange={(e) => setNewName(e.currentTarget.value)} 
                    
                        autoFocus onBlur={handleBlur} 
                    />
                } 

            </> }
        </Nav.Link>

        <FileControls className="controls file-controls" fileName={name} />

    </StyledNavItem>);
}

export default FilesNavItem;