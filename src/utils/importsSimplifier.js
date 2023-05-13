export function getImports(js = ''){

    return js.match(/import .* from .*/g) || [];
}

export function removeImports(js = ''){

    return js.replaceAll(/import .* from .*/g, '');
}


// `import React, { useEffect, useMemo } from "react";` ==> 'react'
function getSource(imp = ''){

    const source = imp.match(/from ["'].*["']/g);

    if(source){
      
      let [library] = source;

      library = library.replaceAll('from', '').replaceAll(/["']*/g, '').trim();
       
      return library;
    }
  
    return null;
}

// `import React, { useEffect, useMemo } from "react";` ==> ['useEffect', 'useMemo']
function getDestructedDeps(imp = ''){

    const source = imp.match(/[{].*[}]/g);

    if(source){

        let [deps] = source;

        deps = deps.replaceAll(/[{}]/g, '')
          .split(',')
          .map(d => d.trim())
          .filter(d => d);
      
        return deps;
    }

    return [];
}

// `import React, { useEffect, useMemo } from "react";` ==> 'React'
function getDefaultImport(imp = ''){

    const source = imp.match(/import [\w]*/g);
  

    if(source){

        let [defaultImport] = source;

        defaultImport = defaultImport.replaceAll('import', '').trim();

        if(defaultImport) return [defaultImport];
    }

    return [];
}

// `import React, * as Another from "react";` ==> '* as Another'
function getImportAlias(imp = '') {

    const source = imp.match(/\* [\w ]*/g);

    if(source){

        let [importAlias] = source;

        importAlias = importAlias.replaceAll('from', '').trim();

        if(importAlias) return [importAlias];
    }
    
    return [];
}



export function generateImportsMap(imports = []){

    const map = new Map();

    imports.forEach((imp) => {

        const source = getSource(imp);

        if(!source) return;

        const destructedDeps = getDestructedDeps(imp);
    
        const defaultImport = getDefaultImport(imp);
    
        const importAlias = getImportAlias(imp);

        if(map.has(source)){
    
            const value = map.get(source);

            destructedDeps?.forEach(dep => value.destructedDeps.add(dep));

            defaultImport?.forEach(def => value.defaultImport.add(def));

            importAlias?.forEach(alias => value.importAlias.add(alias));
        }
        else {
    
            map.set(source, {

                destructedDeps: new Set(destructedDeps),

                defaultImport: new Set(defaultImport),

                importAlias: new Set(importAlias)
            });
        }
    });

    return map;
}

export function simplifyImports(imports = []) {

    const map = generateImportsMap(imports);

    let text = '';

    for (const item of map.entries()) {

        const [key, value] = item;

        const destructedDeps = [...value.destructedDeps];

        const defaultImport = [...value.defaultImport];

        const importAlias = [...value.importAlias];
    
        if(destructedDeps.length > 0){

            text += `import { ${destructedDeps.join(', ')} } from "${key}";\n`;
        }

        if(defaultImport.length > 0){
            
            defaultImport.forEach(imp => {

                text += `import ${imp} from "${key}";\n`;
            });
        }

        if(importAlias.length > 0){
            
            importAlias.forEach(imp => {

                text += `import ${imp} from "${key}";\n`;
            });
        }
    }
    
    return text;
}