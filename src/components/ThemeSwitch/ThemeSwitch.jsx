import { Form } from "react-bootstrap";
import styled, { useTheme } from "styled-components";


const StyledSwitch = styled.div`


    .form-switch {
        padding-left: 0;
    }
    .form-switch .form-check-input {
        --bs-border-width: 0;
        --size: 25px;
        width: calc(2 * var(--size));
        height: var(--size);
        margin: 0 5px;
        position: relative;
    }
    .form-switch .form-check-input:focus {

        box-shadow: none;
    }
    .form-switch .form-check-input:checked {
        background-color: #69a6ff;
    }

    /*dark theme icon*/
    .form-switch .form-check-input::before {
        content: "\f1D1";
        color: #f6fb00;
        font-family: 'bootstrap-icons';
        display: none;
        position: absolute;
        left: 5px;
        top: 0;
    }
    .form-switch .form-check-input:checked::before {
        
        display: inline-block;
    }
    
    /*light theme icon*/
    .form-switch .form-check-input::after {
        content: "\f495";
        color: white;
        font-family: 'bootstrap-icons';
        display: inline-block;
        position: absolute;
        right: 5px;
        top: 0;
    }
    .form-switch .form-check-input:checked::after {
        display: none;
    }
`;

function ThemeSwitch({}) {

    const { isLight, changeTheme } = useTheme();
    

    return (<StyledSwitch title={isLight ? 'Activar modo oscuro' : 'Activar modo claro'}>

        <Form.Switch onChange={changeTheme} checked={isLight} />

    </StyledSwitch>);
}

export default ThemeSwitch;