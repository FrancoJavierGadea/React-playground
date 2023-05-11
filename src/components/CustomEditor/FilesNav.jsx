import { useEffect, useMemo, useRef } from "react";
import { Button, Nav } from "react-bootstrap";
import styled from "styled-components";
import NewFile from "./NewFile";
import { getFileName } from "../../utils/files";
import { useFiles } from "../FilesContext/FilesContext";
import DeleteFile from "./DeleteFile";
import EditFile from "./EditFile";

const StyledNav = styled.div`

    display: flex;

    .nav {
        --bs-nav-link-color: #fff;
        --bs-nav-link-hover-color: #777;

        flex-wrap: nowrap;
        flex-grow: 1;
        overflow-y: hidden;
        overflow-x: auto;

        --sb-track-color: #232E33;
        --sb-thumb-color: #6BAF8D;
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
        --bs-nav-tabs-link-active-color: var(--bs-info);
        --bs-nav-tabs-border-radius: 0;

	    user-select: none;
    }

    .nav-link {
        --bs-nav-link-padding-x: 1.4rem;
        white-space: nowrap;
    }

    .disable-over {
        --bs-nav-link-hover-color: var(--bs-nav-link-color);
        --bs-nav-tabs-link-hover-border-color: transparent;
    }
    .drag-over {
        opacity: 0.5;
        background-color: #777;
    }

    
    /*Controls*/
    .nav-item {
        position: relative;
    }
    .file-controls {
        width: 20px;
        height: 100%;
        position: absolute;
        right: 7px;
        visibility: hidden;
    }
    .nav-item:hover .file-controls {
        visibility: visible;
    } 
`;


function FilesNav({}) {

    const {files, currentFile, setCurrentFile} = useFiles();

    const navRef = useRef(null);

    const items = useMemo(() => {

        return Object.values(files);

    }, [files]);

    //? Nav Horizontal Scroll
    useEffect(() => {

        if(!navRef.current) return;

        const horizontalScroll = (e) => {

            e.preventDefault();

            navRef.current.scrollBy({

                left: e.deltaY < 0 ? -30 : 30,
            });
        }

        navRef.current.addEventListener('wheel', horizontalScroll, { passive: false });

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

        const item = e.target;

        const hoverItem = hoverItemRef.current;

        //Change order items
        const itemPosition = item.style.order;

        item.style.order = hoverItem.style.order;

        hoverItem.style.order = itemPosition;

        //quit focus
        item.querySelector('button').blur();

        //Remove css class
        for (const item of navRef.current.children) {
            
            item.classList.remove('disable-over');
            item.classList.remove('drag-over');
        }
    }

    const dragEnter = (e) => {

        const item = e.target.parentElement;

        hoverItemRef.current = item;

        item.classList.add('disable-over');
        item.classList.add('drag-over');
    }

    const dragOver = (e) => {
        
        e.preventDefault();
    }

    const dragLeave = (e) => {
        
        const item = e.target.parentElement;

        item.classList.remove('drag-over');
    }


    //!
    const handlerSelect = (value) => {

        setCurrentFile(value);
    }


    return (<StyledNav>

        <Nav fill variant="tabs" activeKey={currentFile} onSelect={handlerSelect} ref={navRef}>

            {
                items.map(({name}, i) => {

                    return <Nav.Item className="d-flex" key={`file-${i}`} style={{order: i}}
                    
                        draggable="true" onDragStart={dragStart} onDragEnd={dragEnd}

                        onDragEnter={dragEnter} onDragLeave={dragLeave} onDragOver={dragOver}
                    >

                        <Nav.Link as="button" eventKey={name}>{name}</Nav.Link>

                        <div className="file-controls">

                            <EditFile fileName={name} />

                            <DeleteFile fileName={name} />
                        </div>

                    </Nav.Item>
                })
            } 

        </Nav>

        <NewFile />    
        
    </StyledNav>);
}

export default FilesNav;