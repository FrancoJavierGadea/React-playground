import { useState, useEffect, useRef, useMemo } from "react";

function App(){
    
    const canvasRef = useRef(null); 

    const [width, setWidth] = useState(0);

    const [height, setHeight] = useState(0);

    const { mouseRef, handleMouseMove, handleMouseLeave, handleMouseDown, handleMouseUp } = useMouse();

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
  
        return Amination(width, height);

    }, [width, height]);

    useEffect(() => {

        if(!animation) return;
        
        let ID = null;

        const canvas = canvasRef.current;

        const ctx = canvas.getContext('2d');

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

        gradient.addColorStop(0, '#ff0000');
        gradient.addColorStop(0.5, '#00ff00');
        gradient.addColorStop(1, '#0000ff');

        const draw = () => {

            stats.begin();

            const mouse = mouseRef.current;


            ctx.clearRect(0, 0, canvas.width, canvas.height);


            animation?.connectParticles(ctx, 30, '#6b6b6b', false);//<---

            animation?.draw(ctx, mouse, gradient);

            //animation?.drawMouseArea(ctx, mouse, '#8849fc', .5);//<---


            stats.end();

            ID = requestAnimationFrame(draw);
        }

        draw();//<---------
        
        return () => {
    
            cancelAnimationFrame(ID);
        }
    
    }, [animation, stats]);
    
    return (<div>

        <canvas width={width} height={height} ref={canvasRef} 
        
            onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}

            onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}
        />

    </div>);
}