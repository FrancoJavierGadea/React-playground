
export async function JSXSyntaxHighlighter(monaco, editor){

    const { default: traverse } = await import("@babel/traverse");

    const { parse } = await import("@babel/parser");

    const { default: MonacoJSXHighlighter, JSXTypes } = await import("monaco-jsx-highlighter");


    const monacoJSXHighlighter = new MonacoJSXHighlighter(monaco, parse, traverse, editor);


    let disposeJSXHighlighting = monacoJSXHighlighter.highlightOnDidChangeModelContent();


    let disposeJSXCommenting = monacoJSXHighlighter.addJSXCommentCommand();


    //* Custom Highlight colors 
    JSXTypes.JSXText.options.inlineClassName = "JSXElement.JSXText.JSX-text";
    JSXTypes.JSXBracket.options.inlineClassName = "JSXElement.JSXBracket.JSX-bracket";
    JSXTypes.JSXIdentifier.options.inlineClassName = ".JSXElement.JSXIdentifier.JSX-indentifier";
    JSXTypes.JSXAttribute.options.inlineClassName = ".JSXElement.JSXAttribute.JSX-indentifier";

    //console.log(JSXTypes);

    return () => {

        disposeJSXHighlighting();
        disposeJSXCommenting();
    }
}