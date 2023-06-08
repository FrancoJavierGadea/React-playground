import { useEffect, useRef } from "react";

const WIDTH = 540;
const HEIGHT = 480;

function App(){
    
    const canvasRef = useRef();

    const stats = useStats();

    useEffect(() => {

        let ID = null;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const animation = Animation(canvas);



        const draw = () => {

            stats.begin();

            animation.draw();
            
            stats.end();

            ID = requestAnimationFrame(draw);
        }

        draw();//<-----
    
        return () => {

            if(ID) cancelAnimationFrame(ID);
        }
    
    }, [stats]);


    return (<div>

        <canvas className="main-canvas" width={WIDTH} height={HEIGHT} ref={canvasRef} />

    </div>);
}