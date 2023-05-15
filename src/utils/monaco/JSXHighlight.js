
import { MonacoJsxSyntaxHighlight, getWorker } from 'monaco-jsx-syntax-highlight'

function getHighlighter(monaco) {

    if(typeof getHighlighter.instance === 'object'){

        return getHighlighter.instance;
    }

    console.log('Esto se ejecuta 1 vez');


    //typescript config
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({

        jsx: monaco.languages.typescript.JsxEmit.React,

        target: monaco.languages.typescript.ScriptTarget.ES2020,
        
        esModuleInterop: true,
    });


    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({

        noSemanticValidation: true,
        
        noSyntaxValidation: true,
    });
    


    const highlighter = new MonacoJsxSyntaxHighlight(getWorker(), monaco);

    getHighlighter.instance = highlighter;

    return highlighter;
}



/* export function JSXSyntaxHighlighter(monaco, editor){

    const controller = getHighlighter(monaco);

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

    return { highlighter, dispose };
} */



export function JSXSyntaxHighlighter(monaco, editor){

    //typescript config
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({

        jsx: monaco.languages.typescript.JsxEmit.React,

        target: monaco.languages.typescript.ScriptTarget.ES2020,
        
        esModuleInterop: true,
    });


    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({

        noSemanticValidation: true,
        
        noSyntaxValidation: true,
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

    return { highlighter, dispose };
}