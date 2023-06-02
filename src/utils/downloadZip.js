import JSZip from "jszip";


function virtualAnchor({href, download, target} = {}){

    const anchor = document.createElement('a');

    anchor.href = href;
    anchor.download = download;
    //anchor.target = target;

    return anchor;
}


export async function downloadFiles(name = '', files = {}){

    const zip = new JSZip();

    Object.values(files).forEach(file => {

        let {name, value} = file;

        name = name.replace('/', '');

        zip.file(name, value);
    });

    const blob = await zip.generateAsync({ type:"blob" });

    const file = new Blob([blob]);

    const url = URL.createObjectURL(file);



    const anchor = virtualAnchor({href: url, download: `${name}.zip`});


    setTimeout(() => {

        anchor.dispatchEvent(new MouseEvent('click'));

    }, 0);

    setTimeout(() => {

        URL.revokeObjectURL(url);
        console.log('clear url');

    }, 1000 * 60);
};


export async function downloadProjects(name, projects = []){

    const zip = new JSZip();

    console.log(projects);

    projects.forEach(project => {

        const folder = zip.folder(project.name);
        
        Object.values(project.files).forEach(file => {

            let {name, value} = file;

            name = name.replace('/', '');

            folder.file(name, value);
        });
    });

    const blob = await zip.generateAsync({ type:"blob" });

    const file = new Blob([blob]);

    const url = URL.createObjectURL(file);


    const anchor = virtualAnchor({href: url, download: `${name}.zip`});

    setTimeout(() => {

        anchor.dispatchEvent(new MouseEvent('click'));

    }, 0);

    setTimeout(() => {

        URL.revokeObjectURL(url);
        console.log('clear url');

    }, 1000 * 60);
}

