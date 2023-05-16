import { Editor } from "@monaco-editor/react";


const LANGUAGES = {
    'js': 'javascript',
    'ts': 'typescript',
    'jsx': 'javascript',
    'tsx': 'typescript',
    'html': 'html',
    'css': 'css',
}


function CodeBlockEditor({value, lang}) {

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

    return (<Editor theme="vs-dark" height="300px" 

        value={value} language={LANGUAGES[lang]} path={`/code-block.${lang}`}
        
        options={editorOptions}
    />);
}

export default CodeBlockEditor;