import { Children } from "react";
import styled from "styled-components";

export const BAR_OPTIONS_HEIGHT = '30px';

const StyledBar = styled.div`

    background-color: #007ACC;
    display: flex;
    justify-content: space-between;

    height: ${BAR_OPTIONS_HEIGHT};
    padding: 0 10px;
`;

function OptionsBar({children}) {

    const left = Children.toArray(children).filter(value => {

        return value.props?.position === 'left';
    });

    const center = Children.toArray(children).filter(value => {

        return value.props?.position === 'center';
    });

    const right = Children.toArray(children).filter(value => {

        return value.props?.position === 'right';
    });

    return (<StyledBar>

        <div className="d-flex justify-content-start align-items-center">
            {left}
        </div>

        <div className="d-flex justify-content-center align-items-center">
            {center}
        </div>

        <div className="d-flex justify-content-end align-items-center">
            {right}
        </div>

    </StyledBar>);
}

export default OptionsBar;