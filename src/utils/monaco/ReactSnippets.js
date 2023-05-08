

const REACT_SNIPPETS = [

    {
        name: 'ffc',
        description: 'Create a new React Function Component',
        text: `function App(){\n    \n    return (<div>\n\n    </div>);\n}`
    },

    {
        name: 'useState',
        description: 'Declare a new state variable',
        text: `const [state, setState] = useState(null);`
    },

    {
        name: 'useEffect',
        description: 'Declare a new effect',
        text: `useEffect(() => {\n    \n\n    \n    return () => {\n\n    }\n\n}, []);`
    },

    {
        name: 'ims',
        description: 'import useState',
        text: `import { useState } from "react";`
    },

    {
        name: 'ime',
        description: 'import useEffect',
        text: `import { useEffect } from "react";`
    },

    {
        name: 'imse',
        description: 'import useState and useEffect',
        text: `import { useState, useEffect } from "react";`
    },

    {
        name: 'imc',
        description: 'import Component',
        text: `import { Component } from "react";`
    },

    {
        name: 'ccc',
        description: 'Create a new React Class Component',
        text: "class App extends Component {\n\n    constructor(props){\n        super(props);\n\n        this.state = { };\n    }\n\n    render(){\n\n        return (<div>\n\n        </div>);\n    }\n}"
    },

    {
        name: 'className',
        description: 'class attribute',
        text: `className=""`
    },

    {
        name: 'style',
        description: 'style property',
        text: `style={{}}`
    },

    {
        name: 'htmlFor',
        description: 'for attribute',
        text: `htmlFor=""`
    },

    {
        name: 'ref',
        description: 'ref property',
        text: `ref={}`
    },

    {
        name: 'value',
        description: 'value property',
        text: `value={}`
    },

    {
        name: 'defaultValue',
        description: 'defaultValue property',
        text: `defaultValue={}`
    },

    {
        name: 'onChange',
        description: 'React change event',
        text: `onChange={}`
    },

    {
        name: 'onClick',
        description: 'React click event',
        text: `onClick={}`
    },
];




export function reactSnippets(monaco){

    const completionItemProvider = {

        provideCompletionItems: () => {

            return {
                suggestions: REACT_SNIPPETS.map(snippet => {

                    const {name, text, description} = snippet;

                    return {
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        label: name,
                        insertText: text,
                        documentation: `${description}\n\n${text}`,
                        detail: description
                    }
                })
            };
        }
    };

    monaco.languages.registerCompletionItemProvider('javascript', completionItemProvider);
    monaco.languages.registerCompletionItemProvider('typescript', completionItemProvider);
}