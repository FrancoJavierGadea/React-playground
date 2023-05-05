
const USER = 'FrancoJavierGadea';

const REPO = 'React-playground';

const EXAMPLES = `https://api.github.com/repos/${USER}/${REPO}/contents/examples`;

const TEMPLATES = `https://api.github.com/repos/${USER}/${REPO}/contents/templates`;


function getLanguage(fileName = ''){

    const [ext] = fileName.match(/\.[\w]*$/g);

    const languagesByExtension = {
        '.css': 'css',
        '.html': 'html',
        '.js': 'javascript',
        '.jsx': 'javascript',
        '.md': 'markdown'
    }

    return languagesByExtension[ext];
}


async function getList(URL){

    const response = await fetch(URL);

    const value = await response.json();

    console.log(value);

    const folders = value
        .filter(({type}) => type === 'dir')
        .map(({name, html_url}) => ({name, source: html_url}));

    return folders;   
}

async function download(URL, name = 'default'){

    const response = await fetch(`${URL}/${name}`);

    const value = await response.json();

    const files = value.filter(({type}) => type === 'file');


    const project = await Promise.all(files.map(async file => {

        const {name, download_url} = file;

        const value = await (await fetch(download_url)).text();

        return {
            name: `/${name}`,
            language: getLanguage(name),
            value
        }
    }));

    return project.reduce((acc, value) => {

        acc[value.name] = value;

        return acc;
    }, {});
}


export const getTemplates = () => getList(TEMPLATES);

export const downloadTemplate = (name) => download(TEMPLATES, name);


export const getExamples = () => getList(EXAMPLES);

export const downloadExample = (name) => download(EXAMPLES, name);
