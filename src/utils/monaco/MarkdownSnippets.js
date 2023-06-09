
const MARKDOWN_SNIPPETS = [

    {
        name: 'code block',
        description: 'Insert Markdown code block',
        text: "```${1:language}\n\n```"
    },

    {
        name: 'code inline',
        description: 'Insert Markdown inline code',
        text: "`${1:code}`"
    },

    {
        name: 'link',
        description: 'Insert Markdown link',
        text: "[${1:text}](${1:url})"
    },

    {
        name: 'image',
        description: 'Insert Markdown image',
        text: "![${1:alt}](${2:url})"
    },

    {
        name: 'order list',
        description: 'Insert Markdown order list',
        text: "1. ${1:first}\n2. ${2:second}\n3. ${3:third}"
    },

    {
        name: 'unorder list',
        description: 'Insert Markdown unorder list',
        text: "- ${1:first}\n- ${2:second}\n- ${3:third}"
    },

    {
        name: 'bold',
        description: 'Insert Markdown bold',
        text: "**${1:text}**"
    },

    {
        name: 'italic',
        description: 'Insert Markdown italic',
        text: "*${1:text}*"
    },

    {
        name: 'strikethrough',
        description: 'Insert Markdown strike through',
        text: "~~${1:text}~~"
    },

    {
        name: 'quote',
        description: 'Insert Markdown italic',
        text: "> ${1:text}"
    },

    {
        name: 'h1',
        description: 'Insert Markdown h1',
        text: "# ${1:text}"
    },

    {
        name: 'h2',
        description: 'Insert Markdown h2',
        text: "## ${1:text}"
    },

    {
        name: 'h3',
        description: 'Insert Markdown h3',
        text: "### ${1:text}"
    },

    {
        name: 'h4',
        description: 'Insert Markdown h4',
        text: "#### ${1:text}"
    },

    {
        name: 'h5',
        description: 'Insert Markdown h5',
        text: "##### ${1:text}"
    },

    {
        name: 'h6',
        description: 'Insert Markdown h6',
        text: "###### ${1:text}"
    },

    {
        name: 'table',
        description: 'Insert Markdown table',
        text: "| col | col | col |\n|-----|-----|-----|\n|     |     |     |\n|     |     |     |"
    },
];


export function markdownSnippets(monaco){

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
                suggestions: MARKDOWN_SNIPPETS.map(snippet => {

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

    const dispose = monaco.languages.registerCompletionItemProvider('markdown', completionItemProvider);

    return {
        dispose(){

            //console.log('dispose markdown snippets');
            dispose.dispose();
        }
    }
}