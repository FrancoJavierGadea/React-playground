import { transform } from "@babel/standalone";


export function getImports(js = ''){

    const result = [];
    
    const imports = js.matchAll(/import .* from .*/g);

    for (const value of imports ) {

        
        result.push(value[0]);
    }

    return result;
}

export function removeImports(js = ''){


    return js.replaceAll(/import .* from .*/g, '');
}


export function transformJS(files = []){

    let code = '';

    const imports = new Set();

    for (const js of files) {

        for (const imp of getImports(js)) {
            
            imports.add(imp);
        }

        code += `${removeImports(js)}\n\n`;
    }

    code = [...imports].join('\n') + `\n${code}` ;

    return transform(code, {presets: ['react']}).code;
}



export function createDocument(files = {}){

    const html = files["/index.html"] || {value: ''};

    const css = files["/style.css"] || {value: ''};

    const mainjs = files["/main.js"] || files["/main.jsx"] || files["/main.ts"] || files["/main.tsx"] || {value: ''};

    const appjs = files["/App.js"] || files["/App.jsx"] || files["/App.ts"] || files["/App.tsx"] || {value: ''};


    //Create HTML document
    const parser = new DOMParser();

    const doc = parser.parseFromString(html.value, "text/html");


    //Add css
    const styles = doc.createElement('style');

    styles.innerHTML = css.value;

    doc.head.appendChild(styles);


    //Add JS
    let tranformCode = null;

    try {
        const script = doc.createElement('script');

        script.setAttribute('type', 'module');


        const filesJS = [appjs, mainjs].map(file => file.value);

        tranformCode = transformJS(filesJS);

        script.innerHTML = tranformCode;

        doc.body.appendChild(script);
    }
    catch (error) {
        
    }

    return {
        document: doc.documentElement.outerHTML,
        javascript: tranformCode
    }
}