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