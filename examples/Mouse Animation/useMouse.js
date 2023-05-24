import { useRef } from "react";

const MOUSE_BUTTONS = {
    LEFT: 1,
    RIGTH: 2,
    BOTH: 3,
    WHEEL: 4,
}

const initialMouse = { x: undefined, y: undefined, press: false };

export function useMouse(){

    const mouseRef = useRef(initialMouse);

    const handleMouseMove = ({nativeEvent}) => {

        const {offsetX, offsetY, buttons} = nativeEvent;

        mouseRef.current = {
            ...initialMouse, 
            x: offsetX, 
            y: offsetY,
            press: buttons === MOUSE_BUTTONS.LEFT
        };
    }
        
    const handleMouseLeave = () => {
        
        mouseRef.current = initialMouse;
    }

    return { mouseRef, handleMouseMove, handleMouseLeave };
}