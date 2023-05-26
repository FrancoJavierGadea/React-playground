import { Button, ToggleButton } from "react-bootstrap";
import { useFiles } from "../../context/FilesContext/FilesContext";
import { useProjects } from "../../context/ProjectsContext/ProjectsContext";
import { useEffect, useRef, useState } from "react";
import useBreakPoints, { MAX_WIDTH } from "../../hooks/useBreakpoints";


function SaveProject({}) {

    const {files, filesRef} = useFiles();

    const {currentProject, updateProject, isProject} = useProjects();

    const [autoSave, setAutoSave] = useState(false);

    const [saved, setSaved] = useState(false);


    useEffect(() => {

        if(!autoSave) return;

        const intervalId = setInterval(() => {

            console.log('Auto Guardado');

            updateProject(currentProject, filesRef.current)
            .then(() => {

                setSaved(true);
    
                setTimeout(() => setSaved(false), 1000);
            });;

        }, 1000*60);

        return () => {

            if(intervalId) clearInterval(intervalId);
        }

    }, [autoSave, currentProject]);


    const save = () => {

        updateProject(currentProject, files)
        .then(() => {

            setSaved(true);

            setTimeout(() => setSaved(false), 1000);
        });
    }

    const [isMD] = useBreakPoints(MAX_WIDTH.md);

    return (<>

        {
            isProject && <>
            
                <Button className="border-0 rounded-0" size="sm" variant="outline-light" title="Guardar" onClick={save}>

                    {!saved ?
                        <>
                            <i className="bi bi-archive mx-1" /> {!isMD && 'Guardar'}
                        </>
                    : 
                        <>
                            <i className="bi bi-check2" /> {!isMD && 'Guardado'}
                        </>
                    }  

                </Button>
        
                <Button className="border-0 rounded-0" size="sm" 
        
                    variant={autoSave ? 'light' : 'outline-light'} title={autoSave ? 'Desactivar guardado automatico' : 'Activar guardado automatico'}
        
                    onClick={() => setAutoSave(old => !old)}
        
                >
                    <i className="bi bi-stopwatch mx-1" /> {!isMD && 'Auto guardado'}
                </Button>
            </>
        }

    </>);
}

export default SaveProject;