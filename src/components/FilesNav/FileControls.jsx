import styled from "styled-components";
import EditFile from "./EditFile";
import DeleteFile from "./DeleteFile";

const StyledDiv = styled.div`

    width: 20px;
    height: 100%;
    position: absolute;
    right: 5px;

    .Edit-file-btn .btn {
        font-size: 12px;
        position: absolute;
        top: 0;
        right: 0;
    }

    .Delete-file-btn .btn {
        font-size: 12px;
        position: absolute;
        bottom: 0;
        right: 0;
    }
`;

function FileControls({fileName, className}) {

    return (<StyledDiv className={className}>

        <EditFile className="Edit-file-btn" fileName={fileName} />

        <DeleteFile className="Delete-file-btn" fileName={fileName} />

    </StyledDiv>);
}

export default FileControls;