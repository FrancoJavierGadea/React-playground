import { useEffect, useState } from "react";
import styled from "styled-components";


const StyledPlaygroundRender = styled.div`

    
    iframe {
        width: 100%;
        height: 100%;
        display: flow-root;
    }
`;


function PlaygroundRender({files = {}}) {

    const [renderDocument, setRenderDocument] = useState('');

    useEffect(() => {
        
        const { "/index.html": html, "/style.css": css } = files;

        const parser = new DOMParser();

        const doc = parser.parseFromString(html?.value || '', "text/html");

        //Add css
        const styles = doc.createElement('style');

        styles.innerHTML = css?.value || '';

        doc.head.appendChild(styles);
        

        setRenderDocument(doc.documentElement.outerHTML);
    


    }, [files]);


    return (<StyledPlaygroundRender>

        <iframe srcDoc={renderDocument} />

    </StyledPlaygroundRender>);
}

export default PlaygroundRender;