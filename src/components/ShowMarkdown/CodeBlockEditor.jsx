import { Editor } from "@monaco-editor/react";
import { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { JSXSyntaxHighlighter } from "../../utils/monaco/JSXHighlight";


const LANGUAGES = {
    'js': 'javascript',
    'ts': 'typescript',
    'jsx': 'javascript',
    'tsx': 'typescript',
    'html': 'html',
    'css': 'css',
}

const StyledEditor = styled(Editor)`

    /* JSX Syntax Highlight */
    .jsx-tag-angle-bracket { color: #808080; }
    .jsx-expression-braces { color: #ee0a3f; }
    .jsx-text { color: #ffffff; }
    .jsx-tag-name { color: #569cd6; }
    .jsx-tag-attribute-key { color: #9cdcfe; }
`;

function CodeBlockEditor({value, lang}) {

    console.log(lang, value);

    const editorOptions = {
        padding: {
            top: "20px",
            bottom: "10px"
        },
        minimap: {
            enabled: false
        },
        scrollBeyondLastLine: false,
        readOnly: true,
        contextmenu: false,
    }

    //JSX Highlighter
    const JSXHighlighterRef = useRef(null);
    
    const handleEditorDidMount = useCallback((editor, monaco) => {

        //const { dispose } = JSXSyntaxHighlighter(monaco, editor);

        //JSXHighlighterRef.current = { dispose };

    }, []);

    useEffect(() => {

        return () => {

            JSXHighlighterRef.current?.dispose();
        }
        
    }, []);

    return (<StyledEditor theme="vs-dark" height="300px" 

        value={value} language={LANGUAGES[lang]} path={`/code-block.${lang}`}
        
        options={editorOptions} onMount={handleEditorDidMount}
    />);
}

export default CodeBlockEditor;