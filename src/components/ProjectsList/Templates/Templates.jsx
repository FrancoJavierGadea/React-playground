import { useEffect, useState } from "react";
import { GITHUB } from "../../../utils/github";
import { useFiles } from "../../../context/FilesContext/FilesContext";
import { useProjects } from "../../../context/ProjectsContext/ProjectsContext";
import ListItem from "../ListItem";
import { useTemplates } from "../../../context/TemplatesContext/TemplatesContext";
import { Accordion, Button } from "react-bootstrap";
import styled from "styled-components";
import EditTemplate from "./EditTemplate";
import { downloadProjects } from "../../../utils/downloadZip";


const StyledAccordion = styled(Accordion)`

    --bs-accordion-border-radius: 0;
    --bs-accordion-border-width: 0;
    --bs-accordion-active-bg: transparent;
    --bs-accordion-btn-focus-box-shadow: transparent;
    --bs-accordion-body-padding-x: 10px;
    --bs-accordion-body-padding-y: 0;
    --bs-accordion-btn-padding-x: 10px;
    --bs-accordion-btn-padding-y: 20px;

    .accordion-body {
        padding-bottom: 10px;
    }

    .accordion-header {
        flex-grow: 1;
    }

    .download-btn {
        --bs-btn-border-width: 0;
        --bs-btn-hover-bg: transparent;
        --bs-btn-hover-color: var(--bs-btn-color);
        --bs-btn-active-bg: tranparent;
        --bs-btn-active-color: var(--bs-btn-color);
    }
    .download-btn:hover {
        opacity: .6;
    }
    .download-btn:active {
        opacity: 1;
    }
`;

function Templates({onSelect = () => {}}) {

    const {changeFiles, reset} = useFiles();

    const {setCurrentProject, setIsProject} = useProjects();

    const {templates, getTemplate, removeTemplate, githubTemplates, getTemplates} = useTemplates();

    const [accordionKeys, setAccordionKeys] = useState(['local-templates']);

    useEffect(() => {
        
        if(githubTemplates.length > 0) setAccordionKeys(old => [...old, 'gh-templates']);

    }, [githubTemplates]);

    const selectGithubTemplate = (name) => {

        GITHUB.downloadTemplate(name)
        .then(template => {

            setCurrentProject({name});

            setIsProject(false);

            changeFiles(template);

            onSelect();
        });
    }

    const selectDefault = () => {

        reset();

        setCurrentProject({name: 'default'});

        setIsProject(false);

        onSelect();
    }

    const selectTemplate = (name) => {

        getTemplate(name)
        .then(template => {

            setCurrentProject({name: template.name});

            setIsProject(false);

            changeFiles(template.files);

            onSelect();
        });
    }

    const download = () => {

        getTemplates().then(templates => {

            downloadProjects('templates', templates);
        });
    }

    return (<>


        <StyledAccordion activeKey={accordionKeys} onSelect={(keys) => setAccordionKeys(keys)} alwaysOpen>

            <Accordion.Item eventKey="gh-templates">
                <Accordion.Header>
                    <i className="bi bi-braces fs-5" />
                    <span className="ms-1">Templates</span>
                </Accordion.Header>

                <Accordion.Body>
                    {
                        githubTemplates.map(({name, source}, i) => {
                            
                            return <ListItem name={name} onClick={() => selectGithubTemplate(name)} key={`gh-template-${i}`} github={source}/>
                        })
                    }
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="local-templates">

                <div className="d-flex align-items-center">
                    <Accordion.Header>
                        <i className="bi bi-code-slash fs-5" />
                        <span className="ms-1">Mis Templates</span>
                    </Accordion.Header>

                    <Button className="download-btn" variant="outline-success" onClick={() => download()}>
                        <i className="bi bi-download" title={`Descargar templates`}/>
                    </Button>
                </div>    

                <Accordion.Body>

                    <ListItem name="Default" onClick={selectDefault} />

                    {
                        templates.map((name, i) => {
                            
                            return <ListItem name={name} onClick={() => selectTemplate(name)} key={name}
                            
                                onDelete={() => removeTemplate(name)}
                            >
                                <EditTemplate name={name} />
                            </ListItem>
                        })
                    }
                </Accordion.Body>
            </Accordion.Item>

        </StyledAccordion>

        
    </>);
}

export default Templates;