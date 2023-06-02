import { Button } from "react-bootstrap";
import styled, { useTheme } from "styled-components";


const StyledListItem = styled.div`

    display: flex;

    .btn {
        text-align: left;
        margin-top: 10px;
        --bs-btn-border-radius: 0;
        --bs-btn-border-width: 0;
    }

    .main-btn {
        flex-grow: 1;
    }
`;

function ListItem({name, folder, onClick, onDelete, github, children}) {

    const {isDark} = useTheme();

    return (<StyledListItem className="List-item">

        <Button className="main-btn border-bottom" variant={isDark ? 'outline-light' : 'outline-dark'} 
        
            title={`Cambiar a ${name}`} onClick={onClick}
            
        >{name}</Button>

        {
            children
        }

        {
            onDelete &&
            <Button className="del-btn border-bottom" variant="outline-danger" title={`Borrar ${name}`} onClick={onDelete}>
                <i className="bi bi-trash-fill"></i>
            </Button>
        }

        {
            github && 
            <Button className="gh-btn border-bottom" variant="outline-secondary" title={`Ver ${name}`} href={github} target="_blank">
                <i className="bi bi-github"></i>
            </Button>
        }
    </StyledListItem>);
}

export default ListItem;