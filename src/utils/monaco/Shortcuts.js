

export function addCustomShortcuts(monaco){

    const dispose = monaco.editor.addKeybindingRules([

        {
            keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.NumpadMultiply,//ctrl + *
            command: "editor.action.blockComment", // ID
            when: "editorTextFocus && !editorReadonly", // When
        },

        {
            keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.NumpadDivide,//ctrl + /
            command: "editor.action.commentLine",
            when: "editorTextFocus && !editorReadonly",
        },
    ]);

    return {

        dispose(){

            //console.log('dispose shortcuts');

            dispose.dispose();
        }
    }
}