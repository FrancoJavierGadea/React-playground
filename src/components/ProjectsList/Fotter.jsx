import { Button } from "react-bootstrap";
import styled from "styled-components";
import { REPO_URL } from "../../utils/github";


const StyledFooter = styled.footer`
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: end;

    .btn {
        --bs-btn-border-width: 0;
        --bs-btn-hover-bg: transparent;
        --bs-btn-active-bg: transparent;
    }
`;

function Footer() {

    return (<StyledFooter className="p-1">

        <Button variant="outline-secondary" href={REPO_URL} target="_blank">
            <i className="bi bi-github" /> Github
        </Button>

    </StyledFooter>);
}

export default Footer;