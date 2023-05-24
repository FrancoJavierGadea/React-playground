import { useState, useEffect, useRef } from "react";

const WIDTH = 500;
const HEIGHT = 480;

function App(){

    const canvasRef = useRef();

    const [resolution, setResolution] = useState(5);

    const [image, setImage] = useState(null);

    useEffect(() => {
        
        const image = new Image();

        image.crossOrigin = "anonymous";

        image.src = IMAGES.React;

        image.onload = () => {

            setImage(image);
        }
    
    }, []);

    const [animation, setAnimation] = useState(null);

    useEffect(() => {
        
        if(!image) return;
    
        let ID = setTimeout(() => {
            
            setAnimation(Animation(WIDTH, HEIGHT, image, {

                width: 400, height: 400,

                height: HEIGHT,

                center: true

            }, resolution));
            
        }, 200);
        
        return () => {

            clearTimeout(ID);
        };
    
    }, [WIDTH, HEIGHT, image, resolution]);


    useEffect(() => {

        if(!animation) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        animation.draw(ctx, {

            //showImage: true,

            //drawParticles: true,

            //drawAscii: false
        });

    
    }, [WIDTH, HEIGHT, animation]);
    
    return (<div>

        <canvas className="main-canvas" width={WIDTH} height={HEIGHT} ref={canvasRef} />

        <div className="controls">

            <label>Resolution {resolution}px</label>

            <input type="range" value={resolution} onChange={(e) => setResolution(+e.target.value)} min="2" max="20" />
        </div>

    </div>);
}