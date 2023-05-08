

const JAVASCRIPT_SNIPPETS = [

    {
        name: 'consolelog',
        description: 'console.log()',
        text: `console.log('');`
    },

    {
        name: 'for',
        description: 'For Loop',
        text: "for (let i = 0; i < array.length; i++) {\n\n    const value = array[i];\n    \n    \n}"
    },

    {
        name: 'forof',
        description: 'For-Of Loop',
        text: "for (const value of Iterable) {\n    \n\n}"
    },

    {
        name: 'forin',
        description: 'For-In Loop',
        text: "for (const key in object) {\n\n    const value = object[key];\n        \n\n}"
    },

    {
        name: 'foreach',
        description: 'For-Each Loop',
        text: "array.forEach((value, index) => {\n\n    \n});"
    },

    {
        name: 'promise',
        description: 'Create a new Promise',
        text: "new Promise((resolve, reject) => {\n\n    \n});"
    },

    {
        name: 'setinterval',
        description: 'Set Interval Function',
        text: "setInterval(() => {\n\n    \n}, 1000);"
    },

    {
        name: 'settimeout',
        description: 'Set Timeout Function',
        text: "setTimeout(() => {\n\n    \n}, 1000);"
    },
];




export function javascriptSnippets(monaco){

    const completionItemProvider = {

        provideCompletionItems: () => {

            return {
                suggestions: JAVASCRIPT_SNIPPETS.map(snippet => {

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