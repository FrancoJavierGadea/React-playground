
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { createDocument } from "../../utils/transfromJS";
import { Editor } from "@monaco-editor/react";
import { Alert } from "react-bootstrap";
import { useFiles } from "../FilesContext/FilesContext";
import Controls from "./Controls";
import { BAR_OPTIONS_HEIGHT } from "../OptionsBar/OptionsBar";

export const MODES = {
    RENDER: 'render',
    HTML: 'html',
    CSS: 'css',
    JS: 'javascript',
}

const StyledPlaygroundRender = styled.div`

    height: calc(100svh - ${BAR_OPTIONS_HEIGHT});
    height: 100%svh;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    z-index: 1500;
    overflow: auto;
    
    
    .alert {
        width: fit-content;
    }

    iframe {
        width: 100%;
        height: 100%;
        display: ${props => props.mode === MODES.RENDER ? 'flow-root' : 'none'};
    }

    section {
        flex-grow: 1;
        display: ${props => props.mode !== MODES.RENDER ? 'flex' : 'none'} !important;
    }
`;


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

    //Reload iframe
    const iframeRef = useRef();

    const reload = () => {

        iframeRef.current?.contentWindow.location.reload();
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

    const editorCode = useMemo(() => {

        if(mode === MODES.RENDER || mode === MODES.HTML){

            return { value: renderDocument.html, language: 'html', path: '/html' };
        }

        if(mode === MODES.JS){

            return { value: renderDocument.javascript, language: 'javascript', path: '/javascript' };
        }

        if(mode === MODES.CSS){

            return { value: renderDocument.css, language: 'css', path: '/css' };
        }

    }, [renderDocument, mode]);


    
    return (<StyledPlaygroundRender mode={mode}>

        {
            warning ? 
            
                <Alert variant="warning">{warning}</Alert>
            : 
            <>
                <iframe srcDoc={renderDocument.html} ref={iframeRef} />
                
                <Editor height="100%" theme="vs-dark" 

                    value={editorCode.value} 

                    language={editorCode.language}

                    path={editorCode.path} 
                
                options={editorOptions} />

                <Controls mode={mode} onChangeMode={changeMode} url={url} onReload={reload}/>
            </>
        }


    </StyledPlaygroundRender>);
}

export default PlaygroundRender;