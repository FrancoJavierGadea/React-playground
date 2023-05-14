
import cssIcon from '../assets/icons/css.svg';
import htmlIcon from '../assets/icons/html.svg';
import jsIcon from '../assets/icons/js.svg';
import tsIcon from '../assets/icons/ts.svg';
import reactIcon from '../assets/icons/react.svg';
import reactIconTs from '../assets/icons/react_ts.svg';
import markdownIcon from '../assets/icons/markdown.svg';
import txtIcon from '../assets/icons/document.svg';

export const FILES_ICONS = {
    '.css': cssIcon,
    '.html': htmlIcon,
    '.js': jsIcon,
    '.ts': tsIcon,
    '.jsx': reactIcon,
    '.tsx': reactIconTs,
    '.md': markdownIcon,
    '.txt': txtIcon
}


export function getFileName(fileName = ''){

    let [name] = fileName.match(/[\w\. ]*\./g);

    return name.replace(/\.$/g, '');
}


export function getFileExtension(fileName = ''){

    const [ext] = fileName.match(/\.[\w]*$/g);

    return ext;
}

export function getFileLanguage(fileName = ''){

    const ext = getFileExtension(fileName);

    const languagesByExtension = {
        '.css': 'css',
        '.html': 'html',
        '.js': 'javascript',
        '.jsx': 'javascript',
        '.ts': 'typescript',
        '.tsx': 'typescript',
        '.md': 'markdown',
        '.txt': 'plaintext'
    }

    return languagesByExtension[ext];
}