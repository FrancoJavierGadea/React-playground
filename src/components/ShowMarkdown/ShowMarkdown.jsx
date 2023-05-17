import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styled from "styled-components";
import CustomCodeBlock from "./CustomCodeBlock";
import remarkGfm from 'remark-gfm';
import "./github-markdown.css";

const StyledDiv = styled.div`

    .btn {
        position: absolute;
        top: 50px;
        right: 15px;
        --bs-btn-hover-bg: transparent;
        --bs-btn-active-bg: transparent;
        --bs-btn-border-width: 0;

        --bs-btn-hover-color: ${props => props.theme.isDark ? '#fff' : '#000'};
        --bs-btn-active-color: ${props => props.theme.isDark ? '#fff' : '#000'};
    }
`;

function ShowMarkdown({file = {}}) {

    const [show, setShow] = useState(false);

    const open = () => setShow(true);

    const close = () => setShow(false);


    return (<StyledDiv>
    
        <Modal className="Markdown-modal" show={show} onHide={close} size="xl" fullscreen="xl-down" scrollable style={{zIndex: 5000, '--bs-modal-margin': '20px'}}>

            <Modal.Header closeButton>
                <Modal.Title>{file?.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="py-3 px-5">

                <ReactMarkdown remarkPlugins={[remarkGfm]} components={{code: CustomCodeBlock}}>
                    {file?.value}
                </ReactMarkdown>
                
            </Modal.Body>
        </Modal>
    
        <Button className="border-0 fs-3 py-1" variant="outline-secondary" onClick={open}>
            <i className="bi bi-eye" title="Ver Markdown"/>
        </Button>

    </StyledDiv>);
}

export default ShowMarkdown;