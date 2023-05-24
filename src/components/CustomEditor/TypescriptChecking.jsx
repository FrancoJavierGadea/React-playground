import { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";


const StyledButton = styled(Button)`

    position: absolute;
    top: 50px;
    right: 15px;
    --bs-btn-hover-bg: transparent;
    --bs-btn-active-bg: transparent;
    --bs-btn-border-width: 0;

    --bs-btn-hover-color: ${props => props.theme.isDark ? '#fff' : '#000'};
    --bs-btn-active-color: ${props => props.theme.isDark ? '#fff' : '#000'};
`;

function TypescriptChecking({check, onClick}){

    return (<StyledButton className="border-0 fs-3 py-1" variant="outline-secondary" onClick={onClick}>

        { check ? 
            <i className="bi bi-shield-check" title="Desactivar diagnostico de typescript"/> 
            :
            <i className="bi bi-shield-slash" title="Activar diagnostico de typescript" />
        }

    </StyledButton>);
}

export default TypescriptChecking;