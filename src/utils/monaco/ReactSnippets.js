

const REACT_SNIPPETS = [

    {
        name: 'ffc',
        description: 'Create a new React Function Component',
        text: "function ${1:App}(){\n    \n    return (<div>\n\n    </div>);\n}"
    },

    {
        name: 'useState snippet',
        description: 'Declare a new state variable',
        text: "const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState(${2:null});"
    },

    {
        name: 'useEffect snippet',
        description: 'Declare a new effect',
        text: "useEffect(() => {\n    \n\n    \n    return () => {\n\n    }\n\n}, [${1}]);"
    },

    {
        name: 'useCallback snippet',
        description: 'Declare a new memoized function',
        text: "useCallback(() => {\n\n\n\n}, [${1}]);"
    },

    {
        name: 'useMemo snippet',
        description: 'Declare a new memoized value',
        text: "useMemo(() => {\n    \n\n    \n    return ${1:value}\n\n}, [${2}]);"
    },

    {
        name: 'imr',
        description: 'import from React',
        text: 'import { ${1} } from "react";'
    },

    {
        name: 'ims',
        description: 'import useState',
        text: 'import { useState, ${1} } from "react";'
    },

    {
        name: 'ime',
        description: 'import useEffect',
        text: 'import { useEffect, ${1} } from "react";'
    },

    {
        name: 'imse',
        description: 'import useState and useEffect',
        text: 'import { useState, useEffect, ${1} } from "react";'
    },

    {
        name: 'ccc',
        description: 'Create a new React Class Component',
        text: "class ${1:App} extends Component {\n\n    constructor(props){\n        super(props);\n\n        this.state = { };\n    }\n\n    render(){\n\n        return (<div>\n\n        </div>);\n    }\n}"
    },

    {
        name: 'className',
        description: 'class attribute',
        text: 'className="${1}"'
    },

    {
        name: 'style',
        description: 'style property',
        text: 'style={{${1}}}'
    },

    {
        name: 'htmlFor',
        description: 'for attribute',
        text: 'htmlFor="${1}"'
    },

    {
        name: 'ref',
        description: 'ref property',
        text: 'ref={${1}}'
    },

    {
        name: 'value',
        description: 'value property',
        text: 'value={${1}}'
    },

    {
        name: 'defaultValue',
        description: 'defaultValue property',
        text: 'defaultValue={${1}}'
    },

    {
        name: 'onChange',
        description: 'React change event',
        text: 'onChange={${1:(e) => }}'
    },

    {
        name: 'onClick',
        description: 'React click event',
        text: 'onClick={${1:(e) => }}'
    },
];




export function reactSnippets(monaco){

    const completionItemProvider = {

        provideCompletionItems: (model, position) => {

            let word = model.getWordUntilPosition(position);

            let range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn,
            };

            return {
                suggestions: REACT_SNIPPETS.map(snippet => {

                    const {name, text, description} = snippet;

                    return {
                        label: name,
                        insertText: text,
                        documentation: `${description}\n\n${text}`,
                        detail: description,

                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        range
                    }
                })
            };
        }
    };

    monaco.languages.registerCompletionItemProvider('javascript', completionItemProvider);
    monaco.languages.registerCompletionItemProvider('typescript', completionItemProvider);
}