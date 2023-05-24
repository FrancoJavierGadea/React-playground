import { useEffect, useMemo, useRef } from "react";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import NewFile from "./NewFile";
import { useFiles } from "../FilesContext/FilesContext";
import FilesNavItem from "./FilesNavItem";

const StyledNav = styled.div`

    display: flex;
    background-color: ${props => props.theme.isDark ? '#1a1919' : '#c9c9c9'};

    .nav {
        --bs-nav-link-color: ${props => props.theme.isDark ? '#fff' : '#000'};
        --bs-nav-link-hover-color: #777;

        flex-wrap: nowrap;
        flex-grow: 1;
        overflow-y: hidden;
        overflow-x: auto;

        --sb-track-color: ${props => props.theme.isDark ? '#232E33' : '#8e8989'};
        --sb-thumb-color: ${props => props.theme.isDark ? '#6BAF8D' : '#4a4a4b'};
        --sb-size: 5px;
    
        scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
    }
    .nav::-webkit-scrollbar {
        height: var(--sb-size) 
    }
    .nav::-webkit-scrollbar-track {
        background: var(--sb-track-color);
        border-radius: 1px;
    }
    .nav::-webkit-scrollbar-thumb {
        background: var(--sb-thumb-color);
        border-radius: 1px;   
    }

    .nav-tabs {
        --bs-nav-tabs-link-active-color: ${props => props.theme.isDark ? 'var(--bs-info)' : 'var(--bs-primary)'};
        --bs-nav-tabs-border-radius: 0;

	    user-select: none;
    }


    .disable-over {
        --bs-nav-link-hover-color: var(--bs-nav-link-color);
        --bs-nav-tabs-link-hover-border-color: transparent;
    }
    .drag-over {
        opacity: 0.5;
        background-color: #777;
    }
    .disable-over .controls {

        visibility: hidden !important; 
    }
`;


function FilesNav({}) {

    const {files, currentFile, setCurrentFile, changeFileOrder} = useFiles();

    const navRef = useRef(null);

    const items = useMemo(() => {

        return Object.values(files);

    }, [files]);

    //? Nav Horizontal Scroll
    useEffect(() => {

        const horizontalScroll = (e) => {

            e.preventDefault();

            navRef.current.scrollBy({

                left: e.deltaY < 0 ? -40 : 40,
            });
        }

        navRef.current?.addEventListener('wheel', horizontalScroll, { passive: false });

        return () => {

            navRef.current?.removeEventListener('wheel', horizontalScroll, { passive: false });
        }
         
    }, []);


    //? Change Order of items
    const hoverItemRef = useRef(null);

    const dragStart = (e) => {

        //Disable drag image
        const img = document.createElement('img');

        e.dataTransfer.setDragImage(img, 0, 0);
    }

    const dragEnd = (e) => {

        const item = e.currentTarget;

        const hoverItem = hoverItemRef.current;

        const fileA = {
            name: item.getAttribute('data-file-name'),
            index: +item.getAttribute('data-file-index'),
            order: +item.style.order
        };

        const fileB = {
            name: hoverItem.getAttribute('data-file-name'),
            index: +hoverItem.getAttribute('data-file-index'),
            order: +hoverItem.style.order
        }

               
        if(fileA.name !== fileB.name){
            
            changeFileOrder(fileA, fileB);  
        }
        
        //quit focus
        item.querySelector('button').blur();

        //Solucion trucha para :hover involuntarios
        document.body.style.pointerEvents = 'none';

        setTimeout(() => document.body.style.pointerEvents = '', 70);

        //Remove css class
        for (const item of navRef.current.children) {
            
            item.classList.remove('disable-over');
            item.classList.remove('drag-over');
        }
    }

    const dragEnter = (e) => {

        const item = e.currentTarget;

        hoverItemRef.current = item;

        item.classList.add('disable-over');
        item.classList.add('drag-over');
    }

    const dragOver = (e) => {
        
        e.preventDefault();
    }

    const dragLeave = (e) => {
        
        const item = e.currentTarget;

        item.classList.remove('drag-over');
    }


    //? Change file
    const handlerSelect = (value) => { setCurrentFile(value); }

    return (<StyledNav>

        <NewFile /> 

        <Nav fill={true} variant="tabs" activeKey={currentFile} onSelect={handlerSelect} ref={navRef}>
            {
                items.map(({name, order}, i) => {

                    return <FilesNavItem name={name} key={name}
                    
                        data-file-name={name} data-file-index={i + 1} 
                        
                        style={{order: order || i + 1}} 
                
                        onDragStart={dragStart} onDragEnd={dragEnd}

                        onDragEnter={dragEnter} onDragLeave={dragLeave} onDragOver={dragOver}

                        title={name}
                    />
                })
            } 
        </Nav>
        
    </StyledNav>);
}

export default FilesNav;