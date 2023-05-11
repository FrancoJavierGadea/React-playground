
import { Alert, Button, Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import { useFiles } from "../FilesContext/FilesContext";
import { useState } from "react";


const StyledDiv = styled.div`

    .btn {
        font-size: 12px;
        position: absolute;
        bottom: 0;
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


function DeleteFile({fileName}) {

    const {files} = useFiles();

    const remove = () => {


    }

    return (<StyledDiv>

        
        <Button className="m-0 p-0" onClick={remove} title={`Borrar ${fileName}`}><i className="bi bi-trash"/></Button>

    </StyledDiv>);
}

export default DeleteFile;