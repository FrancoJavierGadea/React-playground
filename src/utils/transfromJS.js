import { transform, } from "@babel/standalone";
import { getFileExtension, getFileName } from "./files";
import { generateImportsMap, getImports, removeImports, simplifyImports } from "./importsSimplifier";



export function transformJS(filesJS = []){

    const files =  filesJS.map(file => file.value);
    
    let code = '';
    
    const imports = [];
    
    for (const js of files) {
        
        imports.push(...getImports(js));
        
        code += `${removeImports(js)}\n\n`;
    }
    
    code = `${ simplifyImports(imports) }\n\n${code}`;

    
    const isTS = filesJS.some(file => file.language === 'typescript');

    if(isTS){

        return transform(code, {filename: 'bundle.tsx', presets: ['react', 'typescript']}).code;
    }
    else {

        return transform(code, {filename: 'bundle.jsx', presets: ['react']}).code;
    }
}


function getJsFiles(files = {}){

    const mainjs = files["/main.js"] || files["/main.jsx"] || files["/main.ts"] || files["/main.tsx"] || {value: ''};

    const appjs = files["/App.js"] || files["/App.jsx"] || files["/App.ts"] || files["/App.tsx"] || {value: ''};


    const JSFiles = Object.values(files).filter(file => {

        const acceptLanguages = ['javascript', 'typescript'];

        const omitFileNames = ['App', 'main'];

        return acceptLanguages.includes(file.language) && !omitFileNames.includes(getFileName(file.name));
    });

    return [...JSFiles, appjs, mainjs];
}

function getCssFiles(files = {}){

    const CSSFiles = Object.values(files).filter(file => {

        return file.language === 'css';
    });

    return CSSFiles;
}

export function createDocument(files = {}){

    const html = files["/index.html"];

    if(!html) throw new Error('No existe /index.html');


    //Create HTML document
    const parser = new DOMParser();

    const doc = parser.parseFromString(html.value, "text/html");


    //Add css
    const styles = doc.createElement('style');

    let css = '';

    getCssFiles(files).forEach(file => {

        css += `${file.value}\n\n`
    });

    styles.innerHTML = css;

    doc.head.appendChild(styles);


    //Add JS
    let tranformCode = '';

    try {
        const script = doc.createElement('script');

        script.setAttribute('type', 'module');


        const filesJS = getJsFiles(files);

        tranformCode = transformJS(filesJS);


        script.innerHTML = tranformCode;

        doc.body.appendChild(script);
    }
    catch (error) {
        
        //console.log(error);
    }

    return {
        html: doc.documentElement.outerHTML,
        javascript: tranformCode,
        css
    }
}