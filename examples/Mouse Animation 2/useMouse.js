import { useRef } from "react";

const MOUSE_BUTTONS = {
    LEFT: 1,
    RIGTH: 2,
    BOTH: 3,
    WHEEL: 4,
}

const initialMouse = { x: undefined, y: undefined, press: false };

function useMouse(){

    const mouseRef = useRef(initialMouse);

    const handleMouseDown = ({buttons}) => {

        mouseRef.current.press = buttons === MOUSE_BUTTONS.LEFT;
    }

    const handleMouseUp = (e) => {

        mouseRef.current.press = false;
    }

    const handleMouseMove = ({nativeEvent}) => {

        const {offsetX, offsetY, buttons} = nativeEvent;

        mouseRef.current.x = offsetX;

        mouseRef.current.y = offsetY;
    }
        
    const handleMouseLeave = () => {
        
        mouseRef.current = initialMouse;
    }

    return { mouseRef, handleMouseMove, handleMouseLeave, handleMouseDown, handleMouseUp };
}