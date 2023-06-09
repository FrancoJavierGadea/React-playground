import { emmetHTML, emmetCSS, emmetJSX, expandAbbreviation, registerCustomSnippets } from 'emmet-monaco-es';


export function Emmet(monaco){

    const disposeHTML = emmetHTML(monaco, ['html']);
    const disposeCSS = emmetCSS(monaco, ['css']);
    const disposeJSX = emmetJSX(monaco, ['javascript', 'typescript']);


    return {

        dispose(){

            //console.log('dispose emmet');
            disposeHTML();
            disposeCSS();
            disposeJSX();
        }
    }
}

