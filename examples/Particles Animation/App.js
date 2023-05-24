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

        return Amination(width, height);

    }, [width, height]);

    useEffect(() => {

        if(!animation) return;
        
        let ID = null;

        const canvas = canvasRef.current;

        const ctx = canvas.getContext('2d');

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.5, 'green');
        gradient.addColorStop(1, 'blue');

        const draw = () => {

            stats.begin();

            ctx.clearRect(0, 0, canvas.width, canvas.height);


            animation.connectParticles(ctx, 150, '#6b6b6b', true);//<---

            let color = true ? '#fff' : gradient;

            animation.draw(ctx, color = undefined);//<---


            stats.end();

            ID = requestAnimationFrame(draw);
        }

        draw();//<---------
        
        return () => {
    
            cancelAnimationFrame(ID);
        }
    
    }, [animation, stats]);
    
    return (<div>

        <canvas className="main-canvas" width={width} height={height} ref={canvasRef} />

    </div>);
}