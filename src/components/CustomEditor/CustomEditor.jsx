import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import { BAR_OPTIONS_HEIGHT } from "../OptionsBar/OptionsBar";
import { Emmet } from "../../utils/monaco/Emmet";
import { reactSnippets } from "../../utils/monaco/ReactSnippets";
import { javascriptSnippets } from "../../utils/monaco/JavascriptSnippets";
import { JSXSyntaxHighlighter } from "../../utils/monaco/JSXHighlight";


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
        flex-wrap: nowrap;
        overflow-y: hidden;
        overflow-x: auto;

        --sb-track-color: #232E33;
        --sb-thumb-color: #6BAF8D;
        --sb-size: 5px;
    
        scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
    }
    .nav::-webkit-scrollbar {
        height: var(--sb-size) 
    }
    .nav::-webkit-scrollbar-track {
        background: var(--sb-track-color);
        border-radius: 1px;
    }
    .nav::-webkit-scrollbar-thumb {
        background: var(--sb-thumb-color);
        border-radius: 1px;   
    }

    .nav-tabs {
        --bs-nav-tabs-link-active-color: var(--bs-info);
    }

    /* JSX Syntax Highlight */
    .Editor .jsx-tag-angle-bracket { color: #808080; }
    .Editor .jsx-expression-braces { color: #ee0a3f; }
    .Editor .jsx-text { color: #ffffff; }
    .Editor .jsx-tag-name { color: #569cd6; }
    .Editor .jsx-tag-attribute-key { color: #9cdcfe; }
    
`;



function CustomEditor({defaultState = {}, defaultFile, onChange = () => {}}) {

    const editorRef = useRef(null);

    const [file, setFile] = useState(defaultFile || Object.keys(defaultState)[0]);

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

        //Add Snippets
        javascriptSnippets(monaco);
        reactSnippets(monaco);

        //Add Emmet
        Emmet(monaco);

        //Add JSX Highlight
        JSXSyntaxHighlighter(monaco, editor)
        .catch(err => {

            console.log('no funciona: ', err);
        });
    }


    //* Nav Horizontal Scroll
    const navRef = useRef();

    useEffect(() => {

        if(!navRef.current) return;

        const horizontalScroll = (e) => {

            e.preventDefault();

            navRef.current.scrollBy({

                left: e.deltaY < 0 ? -30 : 30,
            });
        }

        navRef.current.addEventListener('wheel', horizontalScroll, { passive: false });

        return () => {

            navRef.current.removeEventListener('wheel', horizontalScroll, { passive: false });
        }
         
    }, []);




    return (<StyledEditor className="">

        <Nav variant="tabs" activeKey={file} onSelect={handlerNavOnSelect} ref={navRef}>
            {
                Object.values(defaultState).map(({name}, i) => {

                    return <Nav.Item key={`file-${i}`}>
                        <Nav.Link eventKey={name}>{name}</Nav.Link>
                    </Nav.Item>
                })
            } 
        </Nav>

        <Editor className="Editor" height="50vh" theme="vs-dark"

            language={defaultState[file]?.language}

            value={defaultState[file]?.value}

            path={defaultState[file]?.name}

            options={editorOptions}

        onMount={handleEditorDidMount} onChange={handlerChange} />

    </StyledEditor>);
}

export default CustomEditor;
