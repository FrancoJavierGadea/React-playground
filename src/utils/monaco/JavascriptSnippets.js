

const JAVASCRIPT_SNIPPETS = [

    {
        name: 'console log',
        description: 'console.log()',
        text: 'console.log(${1});'
    },

    {
        name: 'for',
        description: 'For Loop',
        text: "for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\n    const ${3:value} = ${2:array}[${1:i}];\n    \n    \n}"
    },

    {
        name: 'for of',
        description: 'For-Of Loop',
        text: "for (const ${1:value} of ${2:Iterable}) {\n    \n\n}"
    },

    {
        name: 'for in',
        description: 'For-In Loop',
        text: "for (const ${1:key} in ${2:object}) {\n\n    const ${3:value} = ${2:object}[${1:key}];\n        \n\n}"
    },

    {
        name: 'for each',
        description: 'array.forEach()',
        text: "${1:array}.forEach((${2:value}, ${3:index}) => {\n\n    \n});"
    },

    {
        name: 'map',
        description: 'array.map()',
        text: "${1:array}.map((${2:value}, ${3:index}) => {\n\n    return ${2:value}\n});"
    },

    {
        name: 'filter',
        description: 'array.filter()',
        text: "${1:array}.filter((${2:value}, ${3:index}) => {\n\n    return ${2:value}\n});"
    },

    {
        name: 'promise',
        description: 'Create a new Promise',
        text: "new Promise((resolve, reject) => {\n\n    \n});"
    },

    {
        name: 'setinterval',
        description: 'Set Interval Function',
        text: "setInterval(() => {\n\n    \n}, ${1:milliseconds});"
    },

    {
        name: 'settimeout',
        description: 'Set Timeout Function',
        text: "setTimeout(() => {\n\n    \n}, ${1:milliseconds});"
    },
];




export function javascriptSnippets(monaco){

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
                suggestions: JAVASCRIPT_SNIPPETS.map(snippet => {

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