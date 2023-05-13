import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useFiles } from "../FilesContext/FilesContext";
import { downloadZip } from "../../utils/downloadZip";
import { useProjects } from "../ProjectsContext/ProjectsContext";

const StyledControls = styled.div`

    position: absolute;
    bottom: 10px;
    left: 10px;

    display: flex;
    justify-content: start;
    flex-wrap: wrap-reverse;
    
    & > * {
        margin: 5px;
    }

    /* smartphones, touchscreens */
    @media (hover: none) and (pointer: coarse) {
        
        & {
            opacity: 1;
        }
    }

    /* mouse, touch pad */
    @media (hover: hover) and (pointer: fine) {

        & {
            opacity: 0;
        }
        &:hover {
            opacity: 1;
        }
    }

    .btn .bi {

        filter: drop-shadow(1px 1px 1px #b2b2b2d7);
    }
    .btn .bi:hover {

        filter: initial;
    }
`;

function Controls({}) {

    const {files} = useFiles();

    const { currentProject } = useProjects();

    const download = () => {

        downloadZip(currentProject, files)
        .then(() => {

            console.log('Descarga iniciada');
        });
    }

    return (<StyledControls>

        <Button className="border-0 fs-3 py-1" variant="outline-success" onClick={download}>
            <i className="bi bi-download" title="Descargar proyecto"/>
        </Button>

    </StyledControls>);
}

export default Controls;