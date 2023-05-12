
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { createDocument, transformJS } from "../../utils/transfromJS";
import { Editor } from "@monaco-editor/react";
import { Alert, Button } from "react-bootstrap";
import { useFiles } from "../FilesContext/FilesContext";


const StyledPlaygroundRender = styled.div`

    width: 100%;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    z-index: 1500;
    overflow: auto;
    
    .controls {
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 2000;
        opacity: 0;
    }
    .controls:hover {
        opacity: 1;
    }
    .controls > * {
        margin: 5px;
    }

    .alert {
        width: fit-content;
    }

    iframe {
        width: 100%;
        height: 100%;
        display: flow-root;
    }

    section {
        flex-grow: 1;
    }
`;


const MODES = {
    RENDER: 'render',
    HTML: 'html',
    CSS: 'css',
    JS: 'javascript',
}


function PlaygroundRender({}) {

    const {files} = useFiles();

    const [renderDocument, setRenderDocument] = useState({html: '', javascript: '', css: ''});

    const [mode, setMode] = useState(MODES.RENDER);

    const [url, setUrl] = useState('');

    const [warning, setWarning] = useState(null);

    useEffect(() => {

        const timeoutID = setTimeout(() => {

            try {
                
                const {html, javascript, css} = createDocument(files);
        
                setRenderDocument({html, javascript, css});

                setWarning(null); 
            }
            catch (error) {
                
                setWarning(error.message);
            }

        }, 300);

        return () => {

            clearTimeout(timeoutID);
        }        
    
    }, [files]);

    useEffect(() => {

        //console.clear();

        fetch('data:text/html;charset=UTF-8,' + encodeURIComponent(renderDocument.html))
        .then(res => res.blob())
        .then(value => {
            
            setUrl(old => {

                if(old) URL.revokeObjectURL(old);

                return URL.createObjectURL(value);
            });
        });
    
    }, [renderDocument]);

    

    const changeMode = () => {

        setMode(old => {
            
            if(old === MODES.RENDER) return MODES.HTML;
            
            if(old === MODES.HTML) return MODES.JS;

            if(old === MODES.JS) return MODES.CSS;

            if(old === MODES.CSS) return MODES.RENDER;
        });
    }


    const editorOptions = {
        padding: {
            top: "20px",
            bottom: "10px"
        },
        minimap: {
            enabled: false
        },
        scrollBeyondLastLine: false,
        readOnly: true
    }

    

    return (<StyledPlaygroundRender>

        <div className="controls p-3">
            <Button className="border-0 fs-3 py-1" variant="outline-secondary" onClick={changeMode}>
                { mode === MODES.RENDER && <i className="bi bi-filetype-html" title="Ver HTML"/> }
                { mode === MODES.HTML && <i className="bi bi-filetype-js" title="Ver JavaScript"/> }
                { mode === MODES.JS && <i className="bi bi-filetype-css" title="Ver CSS"/> }
                { mode === MODES.CSS && <i className="bi bi-globe2" title="Ver Render"/> }
            </Button>

            <Button className="border-0 fs-3 py-1" variant="outline-secondary" href={url} target="_blank">
                <i className="bi bi-box-arrow-up-right" title="Abrir en nueva pestaña"/>
            </Button>

            <Button className="border-0 fs-3 py-1" variant="outline-secondary" href={url} download>
                <i className="bi bi-download" title="Descargar"/>
            </Button>
        </div>

        {
            warning ? 
                <Alert variant="warning">{warning}</Alert>
            : <>
                { mode === MODES.RENDER ? 
                
                    <iframe srcDoc={renderDocument.html} />

                    :

                    <Editor height="50vh" theme="vs-dark" value={renderDocument[mode]} language={mode} path={`/${mode}`} options={editorOptions} />
                }    
            </>    
        }

    </StyledPlaygroundRender>);
}

export default PlaygroundRender;