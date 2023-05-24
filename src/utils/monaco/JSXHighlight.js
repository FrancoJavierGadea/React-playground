
import { MonacoJsxSyntaxHighlight, getWorker } from 'monaco-jsx-syntax-highlight'


export function JSXSyntaxHighlighter(monaco, editor){

    //typescript config
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({

        jsx: monaco.languages.typescript.JsxEmit.React,

        target: monaco.languages.typescript.ScriptTarget.ES2020,
        
        esModuleInterop: true,
    });


    const controller = new MonacoJsxSyntaxHighlight(getWorker(), monaco);

    const { highlighter, dispose } = controller.highlighterBuilder({editor});



    const highlight = () => {

        const lang = editor.getModel().getLanguageId();

        if(lang === 'javascript' || lang === 'typescript'){

            //console.log('highlight');
            highlighter();
        }
    }

    highlight();


    editor.onDidChangeModelContent((e) => {

        highlight();
    })

    editor.onDidChangeModel((e) => {

        highlight();
    })

    return { highlighter, dispose };
}

/*//! Issues

    Si el archivo por defecto no es .js .jsx .tsx no funciona
*/