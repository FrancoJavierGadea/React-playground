
import { useEffect, useState } from "react";
import styled from "styled-components";
import { createDocument, transformJS } from "../../utils/transfromJS";
import { Editor } from "@monaco-editor/react";
import { Button } from "react-bootstrap";
import { useFiles } from "../FilesContext/FilesContext";


const StyledPlaygroundRender = styled.div`

    position: relative;
    display: flex;
    flex-direction: column;   
    z-index: 1500;
    
    .controls {
        position: absolute;
        top: 0;
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
    RENDER: Symbol(),
    HTML: Symbol(),
    JS: Symbol(),
}


function PlaygroundRender({}) {

    const {files} = useFiles();

    const [renderDocument, setRenderDocument] = useState('');

    const [mode, setMode] = useState(MODES.RENDER);

    const [JS, setJS] = useState('');

    const [url, setUrl] = useState('');

    useEffect(() => {
        
        const {document, javascript} = createDocument(files);

        setJS(javascript);

        setRenderDocument(document); 
    
    }, [files]);

    useEffect(() => {

        //console.clear();

        fetch('data:text/html;charset=UTF-8,' + encodeURIComponent(renderDocument))
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

            if(old === MODES.JS) return MODES.RENDER;
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
                { mode === MODES.JS && <i className="bi bi-globe2" title="Ver Render"/> }
            </Button>

            <Button className="border-0 fs-3 py-1" variant="outline-secondary" href={url} target="_blank">
                <i className="bi bi-box-arrow-up-right" title="Abrir en nueva pestaña"/>
            </Button>

            <Button className="border-0 fs-3 py-1" variant="outline-secondary" href={url} download>
                <i className="bi bi-download" title="Descargar"/>
            </Button>
        </div>

        { mode === MODES.RENDER && <iframe srcDoc={renderDocument} /> }

        { mode === MODES.HTML && <Editor height="50vh" theme="vs-dark" value={renderDocument} language="html" options={editorOptions} /> }

        { mode === MODES.JS && <Editor height="50vh" theme="vs-dark" value={JS} language="javascript" options={editorOptions} /> }

    </StyledPlaygroundRender>);
}

export default PlaygroundRender;