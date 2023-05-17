import { Editor } from "@monaco-editor/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Nav } from "react-bootstrap";
import styled, { useTheme } from "styled-components";
import { BAR_OPTIONS_HEIGHT } from "../OptionsBar/OptionsBar";
import { Emmet } from "../../utils/monaco/Emmet";
import { reactSnippets } from "../../utils/monaco/ReactSnippets";
import { javascriptSnippets } from "../../utils/monaco/JavascriptSnippets";
import { JSXSyntaxHighlighter } from "../../utils/monaco/JSXHighlight";
import FilesNav from "../FilesNav/FilesNav";
import { useFiles } from "../FilesContext/FilesContext";
import Controls from "./Controls";
import { addCustomShortcuts } from "../../utils/monaco/Shortcuts";
import ShowMarkdown from "../ShowMarkdown/ShowMarkdown";
import { markdownSnippets } from "../../utils/monaco/MarkdownSnippets";
import { reactUtilWords } from "../../utils/monaco/ReactUtilWords";


const StyledEditor = styled.div`

    position: relative;

    height: calc(100svh - ${BAR_OPTIONS_HEIGHT});
    display: flex;
    flex-direction: column;

    section {
        flex-grow: 1;
    }

    
    /* JSX Syntax Highlight */
    .Editor .jsx-tag-angle-bracket {
        color: ${props => props.theme.isDark ? '#808080' : '#03093b'};
    }
    .Editor .jsx-expression-braces {
        color: ${props => props.theme.isDark ? '#ee0a3f' : '#193c27'};
    }
    .Editor .jsx-text {
        color: ${props => props.theme.isDark ? '#ffffff' : '#000000'};
    }
    .Editor .jsx-tag-name {
        color: ${props => props.theme.isDark ? '#569cd6' : '#008031'};
    }
    .Editor .jsx-tag-attribute-key {

        color: ${props => props.theme.isDark ? '#9cdcfe' : '#450303'};
    }
    
`;



function CustomEditor() {

    const { isDark } = useTheme();

    const editorRef = useRef(null);

    const {files, currentFile, updateFile} = useFiles();

    const editorOptions = {
        padding: {
            top: "20px",
            bottom: "10px"
        },
        minimap: {
            enabled: false
        },
        scrollBeyondLastLine: false,
        mouseWheelZoom: true,

        wordWrap: 'wordWrapColumn',
        wordWrapColumn: 200
    }

    const handleEditorWillMount = useCallback((monaco) => {

        //shortcuts
        addCustomShortcuts(monaco);

        //Add Snippets
        javascriptSnippets(monaco);
        reactSnippets(monaco);
        markdownSnippets(monaco);

        //Util words
        reactUtilWords(monaco);

        //Add Emmet
        Emmet(monaco);

    }, []);

    const HighlighterRef = useRef(null);

    const handleEditorDidMount = useCallback((editor, monaco) => {

        editorRef.current = editor;

        HighlighterRef.current = JSXSyntaxHighlighter(monaco, editor);

    }, []);

    useEffect(() => {
        
        return () => {

            HighlighterRef.current?.dispose();
        }

    }, []);

    const handlerChange = () => {

        const value = editorRef.current.getValue();

        const fileName = editorRef.current.getModel().uri.path;

        updateFile(fileName, value);
    }

    return (<StyledEditor className="">

        <FilesNav />

        <Editor id="MainEditor" className="Editor" height="50vh" theme={isDark ? 'vs-dark' : 'vs'}

            language={files[currentFile]?.language}

            value={files[currentFile]?.value}

            path={files[currentFile]?.name}

            options={editorOptions}

        beforeMount={handleEditorWillMount} onMount={handleEditorDidMount} onChange={handlerChange} />

        <Controls />

        { files[currentFile]?.language === 'markdown' && <ShowMarkdown file={files[currentFile]} /> }

    </StyledEditor>);
}

export default CustomEditor;
