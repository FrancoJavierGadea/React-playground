import { useState, useEffect, useRef, useMemo } from "react";

function App(){

    const canvasRef = useRef(null); 

    const [width, setWidth] = useState(0);

    const [height, setHeight] = useState(0);

    const stats = useStats();

    useEffect(() => {
        
        const listener = (e) => {

            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }

        listener();

        window.addEventListener('resize', listener);
        
        return () => {
            window.removeEventListener('resize', listener);
        }
    
    }, []);


    const animation = useMemo(() => {

        return MatrixAnimation(width, 16);

    }, [width]);


    useEffect(() => {

        if(!canvasRef.current) return;
        
        let ID = null;

        const canvas = canvasRef.current;

        const draw = () => {

            stats.begin();


            animation.draw(canvas, '#0f0');


            stats.end();

            ID = requestAnimationFrame(draw);
        }

        draw();//<---------
        
        return () => {
    
            cancelAnimationFrame(ID);
        }
    
    }, [animation]);
    
    return (<div>

        <canvas width={width} height={height} ref={canvasRef} />

    </div>);
}