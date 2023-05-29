import { useEffect, useState } from "react";
import { downloadTemplate, getTemplates } from "../../utils/github";
import { useFiles } from "../../context/FilesContext/FilesContext";
import { useProjects } from "../../context/ProjectsContext/ProjectsContext";
import ListItem from "./ListItem";
import { useTemplates } from "../../context/TemplatesContext/TemplatesContext";
import { Accordion } from "react-bootstrap";
import styled from "styled-components";


const StyledAccordion = styled(Accordion)`

    --bs-accordion-border-radius: 0;
    --bs-accordion-border-width: 0;
    --bs-accordion-active-bg: transparent;
    --bs-accordion-btn-focus-box-shadow: transparent;
    --bs-accordion-body-padding-x: 0;
    --bs-accordion-body-padding-y: 0;
    --bs-accordion-btn-padding-x: 0;
    --bs-accordion-btn-padding-y: 20px;

    .accordion-body {
        padding-bottom: 10px;
    }
`;

function Templates({onSelect = () => {}}) {

    const {changeFiles, reset} = useFiles();

    const {setCurrentProject, setIsProject} = useProjects();

    const {templates, getTemplate, removeTemplate, githubTemplates} = useTemplates();

    const [accordionKeys, setAccordionKeys] = useState(['local-templates']);

    useEffect(() => {
        
        if(githubTemplates.length > 0) setAccordionKeys(old => [...old, 'gh-templates']);

    }, [githubTemplates]);

    const selectGithubTemplate = (name) => {

        downloadTemplate(name)
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

    return (<>


        <StyledAccordion activeKey={accordionKeys} onSelect={(keys) => setAccordionKeys(keys)} alwaysOpen>

            <Accordion.Item eventKey="gh-templates">
                <Accordion.Header>Templates</Accordion.Header>

                <Accordion.Body>
                    {
                        githubTemplates.map(({name, source}, i) => {
                            
                            return <ListItem name={name} onClick={() => selectGithubTemplate(name)} key={`gh-template-${i}`} github={source}/>
                        })
                    }
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="local-templates">
                <Accordion.Header>Mis Templates</Accordion.Header>

                <Accordion.Body>

                    <ListItem name="Default" onClick={selectDefault} />

                    {
                        templates.map((name, i) => {
                            
                            return <ListItem name={name} onClick={() => selectTemplate(name)} key={`template-${i}`}
                            
                            del onDelete={() => removeTemplate(name)}
                            />
                        })
                    }
                </Accordion.Body>
            </Accordion.Item>

        </StyledAccordion>

        
    </>);
}

export default Templates;