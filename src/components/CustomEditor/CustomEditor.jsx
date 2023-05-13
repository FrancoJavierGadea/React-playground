import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import { BAR_OPTIONS_HEIGHT } from "../OptionsBar/OptionsBar";
import { Emmet } from "../../utils/monaco/Emmet";
import { reactSnippets } from "../../utils/monaco/ReactSnippets";
import { javascriptSnippets } from "../../utils/monaco/JavascriptSnippets";
import { JSXSyntaxHighlighter } from "../../utils/monaco/JSXHighlight";
import FilesNav from "./FilesNav";
import { getFileLanguage } from "../../utils/files";
import { useFiles } from "../FilesContext/FilesContext";
import Controls from "./Controls";
import { addCustomShortcuts } from "../../utils/monaco/Shortcuts";


const StyledEditor = styled.div`

    position: relative;

    height: calc(100svh - ${BAR_OPTIONS_HEIGHT});
    display: flex;
    flex-direction: column;

    section {
        flex-grow: 1;
    }

    
    /* JSX Syntax Highlight */
    .Editor .jsx-tag-angle-bracket { color: #808080; }
    .Editor .jsx-expression-braces { color: #ee0a3f; }
    .Editor .jsx-text { color: #ffffff; }
    .Editor .jsx-tag-name { color: #569cd6; }
    .Editor .jsx-tag-attribute-key { color: #9cdcfe; }
    
`;



function CustomEditor() {

    const editorRef = useRef(null);

    const {files, currentFile, setCurrentFile, updateFile} = useFiles();

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

    const handleEditorDidMount = (editor, monaco) => {

        editorRef.current = editor;

        addCustomShortcuts(monaco);

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

    const handlerChange = () => {

        const value = editorRef.current.getValue();

        const fileName = editorRef.current.getModel().uri.path;

        updateFile(fileName, value);
    }

    return (<StyledEditor className="">

        <FilesNav />

        <Editor className="Editor" height="50vh" theme="vs-dark"

            language={files[currentFile]?.language}

            value={files[currentFile]?.value}

            path={files[currentFile]?.name}

            options={editorOptions}

        onMount={handleEditorDidMount} onChange={handlerChange} />

        <Controls />

    </StyledEditor>);
}

export default CustomEditor;
