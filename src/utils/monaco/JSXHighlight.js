
import { MonacoJsxSyntaxHighlight, getWorker } from 'monaco-jsx-syntax-highlight'


export async function JSXSyntaxHighlighter(monaco, editor){

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({

        jsx: monaco.languages.typescript.JsxEmit.Preserve,

        target: monaco.languages.typescript.ScriptTarget.ES2020,
        
        esModuleInterop: true,
    });
    
    const controller = new MonacoJsxSyntaxHighlight(getWorker(), monaco);

    const { highlighter, dispose } = controller.highlighterBuilder({editor});

    highlighter();

    editor.onDidChangeModelContent(() => {

        // content change, highlight
        highlighter();
    })

    editor.onDidChangeModel(() => {

        // content change, highlight
        highlighter();
    })
}