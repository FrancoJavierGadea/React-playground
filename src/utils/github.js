import { getFileLanguage } from "./files";

export const USER = 'FrancoJavierGadea';

export const REPO = 'React-playground';

export const REPO_URL = 'https://github.com/FrancoJavierGadea/React-playground';

export const EXAMPLES = `https://api.github.com/repos/${USER}/${REPO}/contents/examples`;

export const TEMPLATES = `https://api.github.com/repos/${USER}/${REPO}/contents/templates`;




async function getList(URL){

    try {
        
        const response = await fetch(URL);
    
        const value = await response.json();
    
        const folders = value
            .filter(({type}) => type === 'dir')
            .map(({name, html_url}) => ({name, source: html_url}));
        
        return folders;   
    }
    catch (error) {
        
    }

    return Promise.reject();
}

async function download(URL, name){

    try {
        
        const response = await fetch(`${URL}/${name}`);
    
        const value = await response.json();
    
        const files = value.filter(({type}) => type === 'file');
    
        const project = await Promise.all(files.map(async file => {
    
            const {name, download_url} = file;
    
            const value = await (await fetch(download_url)).text();
    
            return {
                name: `/${name}`,
                language: getFileLanguage(name),
                value
            }
        }));
    
        return project.reduce((acc, value) => {
    
            acc[value.name] = value;
    
            return acc;
        }, {});
    }
    catch (error) {

    }

    return Promise.reject();
}



export const GITHUB = {

    getTemplates: () => getList(TEMPLATES),

    downloadTemplate: (name) => download(TEMPLATES, name),
    
    getExamples: () => getList(EXAMPLES),

    downloadExample: (name) => download(EXAMPLES, name)
}