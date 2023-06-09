import { useEffect, useState } from "react";
import confetti from 'canvas-confetti';

const lanchConfetti = () => {

    confetti({
        origin: {x: 0, y: 1},
        angle: 60
    });

    confetti({
        origin: {x: 1, y: 1},
        angle: 180 - 60
    });
}

function App(){

    const [count, setCount] = useState(0);

    useEffect(() => {

        lanchConfetti();
        
        const ID = setInterval(() => {
        
            lanchConfetti();

        }, 5000);
        
        return () => {

            clearInterval(ID);
        }
    
    }, []);
    
    return (<div>

        <h1>Hello React</h1>

        <a href="https://es.react.dev" target="_blank" rel="noopener noreferrer">
        
            <img className="react-logo"
                src="https://francojaviergadea.github.io/React-playground/assets/react-1e2e4368.svg" 
                alt="React logo"
            />

        </a>

        <button className="count-btn" onClick={() => setCount(v => ++v)}>Count is {count}</button>

    </div>);
}