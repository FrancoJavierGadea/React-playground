import { getFileLanguage } from "./files";

const USER = 'FrancoJavierGadea';

const REPO = 'React-playground';

const EXAMPLES = `https://api.github.com/repos/${USER}/${REPO}/contents/examples`;

const TEMPLATES = `https://api.github.com/repos/${USER}/${REPO}/contents/templates`;

const token = import.meta.env['VITE_GITHUB_TOKEN'];






async function getList(URL){

    try {
        
        const response = await fetch(URL, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    
        const value = await response.json();
    
        const folders = value
            .filter(({type}) => type === 'dir')
            .map(({name, html_url}) => ({name, source: html_url}));
        
        return folders;   
    }
    catch (error) {
        
    }

    return [];
}

async function download(URL, name = 'default'){

    try {
        
        const response = await fetch(`${URL}/${name}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    
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

    return {};
}


export const getTemplates = () => getList(TEMPLATES);

export const downloadTemplate = (name) => download(TEMPLATES, name);


export const getExamples = () => getList(EXAMPLES);

export const downloadExample = (name) => download(EXAMPLES, name);
