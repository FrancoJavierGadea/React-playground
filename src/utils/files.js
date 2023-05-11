



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
        '.md': 'markdown',
        '.txt': 'plaintext'
    }

    return languagesByExtension[ext];
}