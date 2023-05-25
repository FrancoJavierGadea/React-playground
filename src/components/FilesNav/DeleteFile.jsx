
import { Alert, Button, Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import { useFiles } from "../../context/FilesContext/FilesContext";
import { useState } from "react";


const StyledDiv = styled.div`

    .btn {
        --bs-btn-bg: transparent;
        --bs-btn-hover-bg: transparent;
        --bs-btn-active-bg: transparent;
        --bs-btn-border-radius: 0;
        --bs-btn-border-width: 0;
        --bs-btn-color: var(--bs-secondary-color);
        --bs-btn-hover-color: var(--bs-danger);
        --bs-btn-active-color: var(--bs-danger);
    }
`;


function DeleteFile({fileName, className}) {

    const {removeFile} = useFiles();

    const remove = () => {

        removeFile(fileName);
    }

    return (<StyledDiv className={className}>

        <Button className="m-0 p-0" onClick={remove} title={`Borrar ${fileName}`}><i className="bi bi-trash"/></Button>

    </StyledDiv>);
}

export default DeleteFile;