import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import { BAR_OPTIONS_HEIGHT } from "../OptionsBar/OptionsBar";


const StyledEditor = styled.div`

    height: calc(100vh - ${BAR_OPTIONS_HEIGHT});
    display: flex;
    flex-direction: column;

    section {
        flex-grow: 1;
    }

    .nav {
        --bs-nav-link-color: #fff;
        --bs-nav-link-hover-color: #777;
    }
    .nav-tabs {
        --bs-nav-tabs-link-active-color: var(--bs-info);
    }
`;




function CustomEditor({defaultState = {}, defaultFile = '/index.html', onChange = () => {}}) {

    const editorRef = useRef(null);

    const [file, setFile] = useState(defaultFile);

    const handlerNavOnSelect = (value) => {

        setFile(value);
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
    }

    const handlerChange = () => {

        const value = editorRef.current.getValue();

        const file = editorRef.current.getModel().uri.path;

        //console.log(value, file)

        onChange(value, file);
    }

    const handleEditorDidMount = (editor, monaco) => {

        editorRef.current = editor;

        //editorRef.current.onKeyUp(handlerChange);
        //editorRef.current.onMouseDown(handlerChange);
    }

    return (<StyledEditor className="">

        <Nav variant="tabs" activeKey={file} onSelect={handlerNavOnSelect}>

            {

                Object.values(defaultState).map(({name}, i) => {

                    return <Nav.Item key={`file-${i}`}>
                        <Nav.Link eventKey={name}>{name}</Nav.Link>
                    </Nav.Item>
                })
            }
           
        </Nav>

        <Editor height="50vh" theme="vs-dark"

            language={defaultState[file]?.language}

            value={defaultState[file]?.value}

            path={defaultState[file]?.name}

            options={editorOptions}

        onMount={handleEditorDidMount} onChange={handlerChange} />

    </StyledEditor>);
}

export default CustomEditor;

