import { Button, ToggleButton } from "react-bootstrap";
import { useFiles } from "../FilesContext/FilesContext";
import { useProjects } from "../ProjectsContext/ProjectsContext";
import { useEffect, useRef, useState } from "react";


function SaveProject({}) {

    const {files, filesRef} = useFiles();

    const {currentProject, updateProject, isProject} = useProjects();

    const [autoSave, setAutoSave] = useState(false);


    useEffect(() => {

        if(!autoSave) return;

        const intervalId = setInterval(() => {

            console.log('Auto Guardado');

            updateProject(currentProject, filesRef.current);

        }, 1000*60);

        return () => {

            if(intervalId) clearInterval(intervalId);
        }

    }, [autoSave]);


    const save = () => {

        updateProject(currentProject, files);
    }

    return (<>

        {
            isProject && <>
            
                <Button className="border-0 rounded-0" size="sm" variant="outline-light" title="Guardar" onClick={save}>Guardar</Button>
        
                <Button className="border-0 rounded-0" size="sm" 
        
                    variant={autoSave ? 'light' : 'outline-light'} title={autoSave ? 'Desactivar guardado automatico' : 'Activar guardado automatico'}
        
                    onClick={() => setAutoSave(old => !old)}
        
                >Auto guardado</Button>
            </>
        }

    </>);
}

export default SaveProject;