import { useState, useEffect, useRef, useMemo } from "react";

function App(){
    
    const canvasRef = useRef(null); 

    const [width, setWidth] = useState(0);

    const [height, setHeight] = useState(0);

    const { mouseRef, handleMouseMove, handleMouseLeave } = useMouse();

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

        return Amination(width, height, '#c8c8d5');

    }, [width, height]);

    useEffect(() => {

        if(!animation) return;
        
        let ID = null;

        const canvas = canvasRef.current;

        const ctx = canvas.getContext('2d');

        const draw = () => {

            stats.begin();

            const mouse = mouseRef.current;


            ctx.clearRect(0, 0, canvas.width, canvas.height);


            animation.connectParticles(ctx, 30, '#6b6b6b', false);//<---

            animation.draw(ctx, mouse);

            animation.drawMouseArea(ctx, mouse, '#8849fc', .5);//<---


            stats.end();

            ID = requestAnimationFrame(draw);
        }

        draw();//<---------
        
        return () => {
    
            cancelAnimationFrame(ID);
        }
    
    }, [animation, stats]);
    
    return (<div>

        <canvas className="main-canvas" width={width} height={height} ref={canvasRef} 
        
            onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        />

    </div>);
}