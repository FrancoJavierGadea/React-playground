import styled from "styled-components";
import { MODES } from "./PlaygrounRender";
import { Button } from "react-bootstrap";

const StyledControls = styled.div`

    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 2000;

    display: flex;
    justify-content: end;
    flex-wrap: wrap-reverse;
    
    & > * {
        margin: 5px;
    }

    /* smartphones, touchscreens */
    @media (hover: none) and (pointer: coarse) {
        
        & {
            opacity: 1;
        }
    }

    /* mouse, touch pad */
    @media (hover: hover) and (pointer: fine) {

        & {
            opacity: 0;
        }
        &:hover {
            opacity: 1;
        }
    }

    .btn .bi {

        filter: drop-shadow(1px 1px .7px #b2b2b2d7);
    }
    .btn .bi:hover {

        filter: initial;
    }
`;

function Controls({mode, onChangeMode, url}) {

    return (<StyledControls>

        <Button className="border-0 fs-3 py-1" variant="outline-primary" onClick={onChangeMode}>

            { mode === MODES.RENDER && <i className="bi bi-filetype-html" title="Ver HTML"/> }
            { mode === MODES.HTML && <i className="bi bi-filetype-js" title="Ver JavaScript"/> }
            { mode === MODES.JS && <i className="bi bi-filetype-css" title="Ver CSS"/> }
            { mode === MODES.CSS && <i className="bi bi-globe2" title="Ver Render"/> }

        </Button>

        <Button className="border-0 fs-3 py-1" variant="outline-secondary" href={url} target="_blank">
            <i className="bi bi-box-arrow-up-right" title="Abrir en nueva pestaña"/>
        </Button>

        <Button className="border-0 fs-3 py-1" variant="outline-success" href={url} download>
            <i className="bi bi-download" title="Descargar"/>
        </Button>

    </StyledControls>);
}

export default Controls;