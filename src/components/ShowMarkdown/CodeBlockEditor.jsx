import { Editor } from "@monaco-editor/react";
import { useMemo } from "react";


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
        scrollbar: {
            handleMouseWheel: false
        }
    }

    const height = useMemo(() => {

        const height = value.split('\n').length * 21;

        return height < 450 ? height : 450;

    }, []);

    return (<Editor theme="vs-dark" height={`${height}px`} 

        value={value} language={LANGUAGES[lang]}
        
        options={editorOptions}
    />);
}

export default CodeBlockEditor;